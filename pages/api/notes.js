import OpenAI from 'openai'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'})
  const { history, plan } = req.body || {}

  // Simple templating if no OPENAI_API_KEY provided
  if(!process.env.OPENAI_API_KEY){
    const note = `Visit note:\n\nHPI: ${history || 'Not provided'}\n\nPlan: ${plan || 'Not provided'}\n\nAdvice: Patient advised to follow up as needed and seek emergency care for worsening symptoms.`
    return res.json({note})
  }

  try{
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const prompt = `You are a clinical documentation assistant. Create a concise, professional visit note from the information below.\n\nHPI: ${history || 'Not provided'}\nPlan: ${plan || 'Not provided'}\n\nReturn only the note. Include a single-line follow-up and an emergency warning to seek immediate care for worsening symptoms.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {role:'system', content: 'You are a clinical documentation assistant. Do not provide medical advice or instructions beyond suggesting to see a licensed provider. Keep notes concise.'},
        {role:'user', content: prompt}
      ],
      max_tokens: 400
    })

    const noteText = completion.choices && completion.choices[0] && completion.choices[0].message && completion.choices[0].message.content ? completion.choices[0].message.content.trim() : null
    if(!noteText){
      const note = `Visit note:\n\nHPI: ${history || 'Not provided'}\n\nPlan: ${plan || 'Not provided'}\n\nAdvice: Patient advised to follow up as needed and seek emergency care for worsening symptoms.`
      return res.json({note})
    }

    return res.json({note: noteText})

  }catch(e){
    console.error(e)
    const note = `Visit note:\n\nHPI: ${history || 'Not provided'}\n\nPlan: ${plan || 'Not provided'}\n\nAdvice: Patient advised to follow up and seek emergency care for worsening symptoms.`
    return res.json({note})
  }
}
