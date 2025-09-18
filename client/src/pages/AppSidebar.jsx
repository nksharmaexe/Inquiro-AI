import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useContext, useEffect, useState } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Bot,
  SquarePen,
  Star,
  History,
  ChevronRight,
  User,
  Trash,
} from "lucide-react";
import { MyContext } from "@/MyContext";
import {v1 as uuidv1} from "uuid";

export function AppSidebar() {
  const { allThreads, setAllThreads, currThreadId ,setPrevChats, setNewChat, setPrompt, setReply, setCurrThreadId} = useContext(MyContext);
  
  const getAllThreads = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/threads`);
      const res = await response.json();
      const filterData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filterData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = ()=>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  const changeThread = async(threadId)=>{
    setCurrThreadId(threadId);  
    
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/thread/${threadId}`);
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReply(null)
    }catch(err){
      console.log(err);
    }

  }

  const deleteThread = async(threadId)=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/thread/${threadId}`,{method:"DELETE"});
      const res = await response.json();
      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));
    }catch(err){
      console.log(err);
    }
  }


  const Collapsible = ({ children, defaultOpen = false, className = "" }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
      <div
        className={`group/collapsible ${className}`}
        data-state={isOpen ? "open" : "closed"}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { isOpen, setIsOpen });
          }
          return child;
        })}
      </div>
    );
  };

  const CollapsibleTrigger = ({ children, asChild, isOpen, setIsOpen }) => {
    if (asChild) {
      return React.cloneElement(children, {
        onClick: () => setIsOpen(!isOpen),
        "data-state": isOpen ? "open" : "closed",
      });
    }

    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </button>
    );
  };

  // Updated CollapsibleContent with proper scrolling
  const CollapsibleContent = ({ children, isOpen }) => {
    return (
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen
            ? "max-h-95 overflow-y-auto scroll-container opacity-100"
            : "max-h-0 opacity-0"
        }`}
        data-state={isOpen ? "open" : "closed"}
      >
        <ScrollArea className="h-full">{children}</ScrollArea>
      </div>
    );
  };
  const starredThreads = [];

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="group "
    >
      <SidebarHeader className="bg-[#0A0A0A]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="group-data-[collapsible=icon]:justify-center"
            >
              <a href="#" className="flex items-center gap-2">
                <img
                  src="function-process.png"
                  alt="Logo"
                  className="size-6 shrink-0"
                />
                <span className="text-lg font-semibold group-data-[collapsible=icon]:sr-only">
                  Inquiro AI
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-[#0A0A0A] scroll-container">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="group-data-[collapsible=icon]:justify-center"
                >
                  <a onClick={createNewChat} >
                    <SquarePen className="size-4" />
                    <span className="group-data-[collapsible=icon]:sr-only">
                      New Chat
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Collapsible className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="group-data-[collapsible=icon]:justify-center">
                      <Star className="size-4" />
                      <span className="group-data-[collapsible=icon]:sr-only">
                        Starred
                      </span>
                      <ChevronRight className="size-4  group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:sr-only" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {starredThreads?.map((item) => (
                        <SidebarMenuSubItem key={item.id}>
                          <SidebarMenuSubButton asChild>
                            <a className="cursor-pointer">
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* History Section with Scrollable Content */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Collapsible defaultOpen={true} className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="group-data-[collapsible=icon]:justify-center">
                      <History className="size-4" />
                      <span className="group-data-[collapsible=icon]:sr-only">
                        History
                      </span>
                      <ChevronRight className="size-4 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:sr-only" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub  >
                      {allThreads?.map((thread, index) => (
                        <SidebarMenuSubItem key={index}>
                          <SidebarMenuSubButton asChild>
                            <a   className=" flex  justify-between" >
                              <div className="max-w-[90%]  cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap  " onClick={()=>changeThread(thread.threadId)} >{thread.title}</div>
                              <Trash onClick={()=>deleteThread(thread.threadId)}  className="  cursor-pointer   hover:text-red-500" />
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[#0A0A0A]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:justify-center"
            >
              <a href="#">
                <User className="size-4" />
                <span className="group-data-[collapsible=icon]:sr-only">
                  Profile
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
