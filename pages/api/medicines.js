// pages/api/medicines.js

function safeJSON(res){
  return res && res.ok ? res.json() : Promise.resolve(null)
}

export default async function handler(req, res){
  if(req.method !== 'GET') return res.status(405).json({error:'Method not allowed'})

  const { q } = req.query
  if(!q) return res.status(400).json({error:'Missing query parameter q'})

  const query = q.trim()
  try{
    // 1) RxNorm: search by name -> get RxCUI
    const rxSearchUrl = `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${encodeURIComponent(query)}`
    const rxSearchRes = await fetch(rxSearchUrl)
    const rxSearch = await safeJSON(rxSearchRes)

    let rxcui = null
    if(rxSearch && rxSearch.idGroup && rxSearch.idGroup.rxnormId && rxSearch.idGroup.rxnormId.length>0){
      rxcui = rxSearch.idGroup.rxnormId[0]
    }

    // 2) RxNorm: interactions
    let interactions = null
    if(rxcui){
      const rxInterUrl = `https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${rxcui}`
      const rxInterRes = await fetch(rxInterUrl)
      const rxInter = await safeJSON(rxInterRes)
      if(rxInter && rxInter.fullInteractionTypeGroup){
        interactions = []
        rxInter.fullInteractionTypeGroup.forEach(group=>{
          const types = group.fullInteractionType || []
          types.forEach(t => {
            const pair = t.interactionPair || []
            pair.forEach(p => {
              const desc = p.description || ''
              const severity = p.severity || ''
              interactions.push({description: desc, severity})
            })
          })
        })
      }
    }

    // 3) openFDA: label data
    const openFdaUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${encodeURIComponent(query)}+OR+openfda.generic_name:${encodeURIComponent(query)}&limit=1`
    let openFdaData = null
    try{
      const ofRes = await fetch(openFdaUrl)
      const ofJson = await safeJSON(ofRes)
      if(ofJson && ofJson.results && ofJson.results.length>0){
        openFdaData = ofJson.results[0]
      }
    }catch(e){
      openFdaData = null
    }

    const result = {
      query,
      rxcui,
      interactions: interactions || [],
      openfda: null
    }

    if(openFdaData){
      const openfda = {
        brand_name: openFdaData.openfda && openFdaData.openfda.brand_name ? openFdaData.openfda.brand_name : null,
        generic_name: openFdaData.openfda && openFdaData.openfda.generic_name ? openFdaData.openfda.generic_name : null,
        indications_and_usage: openFdaData.indications_and_usage || null,
        adverse_reactions: openFdaData.adverse_reactions || null,
        warnings: openFdaData.warnings || null,
        dosage_and_administration: openFdaData.dosage_and_administration || null,
        purpose: openFdaData.purpose || null,
        manufacturer_name: openFdaData.openfda && openFdaData.openfda.manufacturer_name ? openFdaData.openfda.manufacturer_name : null
      }
      result.openfda = openfda
    }

    return res.json(result)

  }catch(e){
    console.error('medicines error', e)
    return res.status(500).json({error: 'Internal error', details: String(e)})
  }
}
