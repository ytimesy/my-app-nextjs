export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { message } = req.body;

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model : "gpt-3.5-turbo",
    prompt: `ChatGPT, help the user relax by having a soothing conversation with them.\n\nUser: ${message}\nChatGPT:`,
    max_tokens: 150,
    n: 1,
    temperature: 0.7,
  });

  const reply = response.choices[0].text.trim();
  res.status(200).json({ reply });
  
}
