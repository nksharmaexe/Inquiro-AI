
import dotenv from "dotenv";
dotenv.config();

const PPLX_API_URL = "https://api.perplexity.ai/chat/completions";

const getPerplexityResponse = async (prompt) => {
  try {
    const response = await fetch(PPLX_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PPLX_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
 // or pplx-7b-online
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    // res.json({ answer: data.choices[0].message.content });
    return data;
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Something went wrong" });
  }
};

export default getPerplexityResponse;