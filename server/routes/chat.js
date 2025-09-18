import express, { response } from "express";
import Thread from "../models/Thread.js";
import getGeminiResponse from "../utils/gemini.js";
import getPerplexityResponse from "../utils/perplexity.js";

const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "test123",
      title: "Testing new Thread",
      model:"gemini"
    });
    const response = await thread.save();
    res.send(response);
  } catch (err) {
    res.status(500).json({ error: "Error creating thread" });
  }
});

// Get all threads
router.get("/threads", async (req, res) => {
  try {
    const threads = await Thread.find().sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching threads" });
  }
});

// Get Specific thread
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// Delete Specific thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOneAndDelete({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json({ message: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message, model } = req.body;

  if (!threadId || !message || !model) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message.substring(0, 50) + (message.length > 50 ? "..." : ""), // Truncate title
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }
    let modelMessage = {
      role: "",
      content: "",
      model: "",
      search_results: [],
    };
    if (model == "gemini") {
      const { reply, role } = await getGeminiResponse(message);
      modelMessage = {
        role: "model",
        content: reply,
        model: model,
      };
    } else {
      const data = await getPerplexityResponse(message);
      modelMessage = {
        role: "model",
        content: data.choices[0].message.content,
        model: model,
        search_results: data.search_results || [],
      };
    }

    thread.messages.push(modelMessage);
    thread.updatedAt = new Date();

    if (thread.messages.length === 2 && thread.title === "New Chat") {
      thread.title =
        message.substring(0, 50) + (message.length > 50 ? "..." : "");
    }

    await thread.save();

    res.json({
      reply: modelMessage.content,
      role: modelMessage.role,
      model: modelMessage.model,
      searchResults: modelMessage.search_results || [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch or create thread" });
  }
});


export default router;
