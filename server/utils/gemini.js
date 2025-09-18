import dotenv from "dotenv";
dotenv.config();

const getGeminiResponse = async (prompt) => {
    try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text:prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    // console.log(data);

    const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    const role = data.candidates?.[0]?.content?.role || "No role";
    return ({ reply: output,role });
    // res.send(data);
  } catch (err) {

    console.error(err);
    res.status(500).send("Error calling Gemini API");
  }
}

export default getGeminiResponse;