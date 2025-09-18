import { Badge } from "@/components/ui/badge";
import { MyContext } from "@/MyContext";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const Chat = () => {
  const { newChat, prevChats, reply, model } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }
    if (!prevChats?.length) return;

    const content = reply?.split(" ");

    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content?.slice(0, idx + 1).join(" "));
      idx++;
      if (idx === content?.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  return (
    <>
      {newChat && (
        <div className=" w-[100%] h-[100%] my-auto  flex items-center justify-center text-xl font-bold ">
          <h1 className="text-2xl">How I can help you today? 😊</h1>
        </div>
      )}

      {!newChat && (
        <div className="h-[100%]  md:w-[100%] md:px-15  lg:px-50 px-5 flex flex-col  gap-4  overflow-y-auto scroll-container">
        {prevChats?.slice(0, -1).map((chat, idx) =>
          chat.role === "user" ? (
            <div key={idx} className="text-right ">
              <Badge
                variant="secondary"
                className="bg-[#134b80ce] text-[1rem]  px-3  rounded-3xl py-2"
              >
                {chat.content}
              </Badge>
            </div>
          ) : (
            <div key={idx} className="text-left flex gap-2">
              <img
                className="w-8 h-8"
                src={chat?.model == "gemini" ? "gemini.png" : "perplexity2.png"}
                alt="perplexity"
              />

              <div className=" model max-w-[100%]">
                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {chat?.content}
                </ReactMarkdown>
              </div>
            </div>
          )
        )}

        {prevChats?.length > 0 && latestReply !== null && (
          <div className="text-left flex gap-2" key={"typing"}>
            <img
              className="w-8 h-8"
              src={model == "gemini" ? "gemini.png" : "perplexity2.png"}
              alt="perplexity"
            />

            <div className=" model max-w-[100%]">
              <ReactMarkdown rehypePlugins={rehypeHighlight}>
                {latestReply}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {prevChats?.length > 0 && latestReply === null && (
          <div className="text-left flex gap-2" key={"typing"}>
            <img
              className="w-8 h-8"
              src={model == "gemini" ? "gemini.png" : "perplexity2.png"}
              alt="perplexity"
            />

            <div className=" model max-w-[100%]">
              <ReactMarkdown rehypePlugins={rehypeHighlight}>
                {prevChats[prevChats.length - 1]?.content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
      )}
    </>
  );
};

export default Chat;
