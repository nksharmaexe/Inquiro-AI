import "./App.css";

import { MyContext } from "./MyContext";
import { useState } from "react";
import ChatWindow from "./pages/ChatWindow";
import { v1 as uuidv1 } from "uuid";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [model, setModel] = useState("");
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    model,
    setModel,
    allThreads,
    setAllThreads,
  };

  return (
    <MyContext.Provider value={providerValues}>
      <ChatWindow />
    </MyContext.Provider>
  );
}
