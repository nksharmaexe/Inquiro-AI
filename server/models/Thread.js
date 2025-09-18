import mongoose from "mongoose";

const searchResultSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  url: {
    type: String,
  },
  date: {
    type: Date,
  },
  last_updated: {
    type: Date,
  },
  snippet: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MessageSchema = new mongoose.Schema({
    role:{
        type: String,
        enum: ['user', 'model'],
        required: true
    },
    model:{
        type: String,
        enum: ['gemini', 'perplexity'],
    },
    content:{
        type: String,
        required: true
    },
    search_results:[searchResultSchema],
    timestamp:{
        type: Date,
        default: Date.now
    }
});



const ThreadSchema = new mongoose.Schema({
    threadId:{
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        default: "New Chat"
    },
    messages:[MessageSchema],
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

const Thread = mongoose.model('Thread', ThreadSchema);

export default Thread;