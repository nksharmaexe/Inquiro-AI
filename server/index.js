import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.use("/api",chatRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database✅");
    }catch(err){
        console.log("Faild to connect with Database❌", err);
    }
}

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// async function run() {
//   const result = await model.generateContent("Diffeerences between SQL and MongoDB?");
//   console.log(result.response.text());
// }

// run();

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: "Hello!" }],
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
//       options
//     );

//     const data = await response.json();
//     console.log(data);

//     // Gemini response text is nested deeper than OpenAI
//     // const output =
//     //   data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
//     // res.send({ reply: output });
//     res.send(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error calling Gemini API");
//   }
// });

// app.post("/test", async (req, res) => {
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: "user",
//               parts: [{ text:req.body.message }],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();
//     // console.log(data);

//     const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
//     const role = data.candidates?.[0]?.content?.role || "No role";
//     res.send({ reply: output,role });
//     // res.send(data);
//   } catch (err) {

//     console.error(err);
//     res.status(500).send("Error calling Gemini API");
//   }
// });

