import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing text input" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a medical notes assistant." },
        { role: "user", content: text }
      ]
    });

    const result = response.choices[0].message.content;
    res.status(200).json({ result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
