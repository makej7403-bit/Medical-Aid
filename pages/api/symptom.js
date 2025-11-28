export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'})
  const { symptom } = req.body || {}
  if(!symptom) return res.status(400).json({error:'Missing symptom'})

  const lc = symptom.toLowerCase()

  // Urgent keywords — if matched, strongly advise emergency care
  const urgentKeywords = ['chest pain','shortness of breath','difficulty breathing','severe bleeding','loss of consciousness','unconscious','stroke','fast heart rate','severe allergic reaction','anaphylaxis']
  const urgent = urgentKeywords.some(k => lc.includes(k))
  if(urgent){
    return res.json({ guidance: 'This could be a medical emergency. Seek immediate emergency care or call your local emergency number.' , reason: 'Matched urgent keyword in symptom text.'})
  }

  // Example non-urgent checks
  if(lc.includes('fever')){
    return res.json({ guidance: 'Fever may indicate infection. Rest, stay hydrated, monitor temperature. If temperature ≥39°C (102.2°F) or prolonged, seek care.' , reason: 'Contains "fever"' })
  }

  if(lc.includes('headache')){
    return res.json({ guidance: 'Headaches are common. Use rest, hydration, and OTC analgesics if appropriate. If severe, sudden onset, or with neurologic symptoms, seek care.' , reason: 'Contains "headache"' })
  }

  // Fallback safe guidance
  return res.json({ guidance: 'Symptoms may be mild. Rest, remain hydrated, monitor for worsening. If symptoms escalate or new concerning signs appear, see a healthcare professional.' })
}
