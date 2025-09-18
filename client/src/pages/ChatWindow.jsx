import React, { useContext, useState, useEffect } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ArrowUpRight, CircleStopIcon} from "lucide-react";
import Chat from "./Chat";
import { MyContext } from "@/MyContext";
import { MoonLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChatWindow = () => {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
    model,
    setModel,
    setNewChat
  } = useContext(MyContext);
  const [loding, setLoding] = useState(false);
    const [selectedOption, setSelectedOption] = useState("gemini");


  const getReply = async () => {
    if (prompt.length === 0) return;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
        model: selectedOption
      }),
    };


    try {
      setLoding(true);
      const result = await fetch(`${import.meta.env.VITE_API_URL}/chat`, options);
      const resnonse = await result.json();
      setLoding(false);
      setNewChat(false);
      setReply(resnonse.reply);
      setModel(resnonse.model)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "model", content: reply, model: model },

      ]);
    }
    setPrompt("");
  }, [reply]);

  return (
    <SidebarProvider  style={{
        "--sidebar-width": "18rem",        
        "--sidebar-width-mobile": "18rem", 
      }} >
      <div className="flex w-[100%] min-h-[100%] bg-[#171717] ">
        <AppSidebar />

        <main className="flex-1  ">
          <div className="p-3 fixed  border-b w-[100%]  flex justify-between  ">
            <SidebarTrigger />
          </div>

          {/* main container */}
          <div className=" h-[75vh] w-[100%] mt-15 py-4">
            <Chat />
          </div>

          <div className="userInput border-2  bg-[#] rounded-4xl sm:w-[85%] lg:w-[50%] w-[90%] flex items-center justify-between mx-auto py-2 px-4">
            <input
              type="text"
              className="outline-0 w-[100%]"
              placeholder="Search anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
            />

            <div className="flex gap-2 items-center"  >
              <Select defaultValue="gemini" onValueChange={(value) => setSelectedOption(value)}>
              <SelectTrigger className="rounded-2xl ">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini">Gemini</SelectItem>
                <SelectItem value="perplexity">Perplexity</SelectItem>
              </SelectContent>
            </Select>

            {prompt.length == "" ? (
              <CircleStopIcon className=" w-7 cursor-not-allowed h-7 text-muted-foreground" />
            ) : loding ? (
              <MoonLoader size={20} color="#fff" speedMultiplier={1.5} />
            ) : (
              <div className="w-9 h-9 bg-[#1169bb] flex items-center justify-center   rounded-full" >
                <ArrowUpRight
                onClick={getReply}
                className="cursor-pointer w-6   hover:text-white  h-6 active:scale-95"
              />
              </div>
            )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ChatWindow;
