"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ReactMarkdown from "react-markdown";
import "../../markdown-styles.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConversationDropdown } from "@/components/conversations-dropdown";

const Page = () => {
  const session = supabase.auth.getSession();
  const router = useRouter();

  if (!session) {
    router.push("/auth/login");
  }

  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/chat",
      onFinish: (message) => {
        // Update the conversation in Supabase after each message
        if (currentConversationId) {
          supabase
            .from("conversations")
            .update({
              conversation: [
                "You are an AI assistant to assist admins of an educational institution help understand their data, take data-driven decisions and make informed decisions. Answer all he questions professionally, and if you encounter any data, analyze it, think about the data mathematically, try to reason, and give your answer.",
                ...messages,
                message,
              ],
            })
            .eq("id", currentConversationId);
        }
      },
    });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      alert("Please sign in to use the chatbot");
      return;
    }
    handleSubmit(e);
  };

  const loadConversation = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("conversations")
      .select("conversation")
      .eq("id", conversationId)
      .single();

    if (error) {
      console.error("Error loading conversation:", error);
      return;
    }

    if (data && data.conversation) {
      setMessages(data.conversation);
      setCurrentConversationId(conversationId);
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setCurrentConversationId(null);
  };

  return (
    <ContentLayout title="Chat with AI">
      <Card className="w-full mx-auto mt-8 text-xs lg:text-base">
        {/* <CardHeader>
          <CardTitle>Gemini AI Chatbot</CardTitle>
        </CardHeader> */}

        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4">
            <ConversationDropdown onSelect={loadConversation} />
            <Button onClick={startNewConversation}>New Conversation</Button>
          </div>
          <div className="h-[60vh] overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  {m.role === "user" ? (
                    m.content
                  ) : (
                    <ReactMarkdown className="markdown-content">
                      {m.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-6">
          <form onSubmit={onSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="ask me anything..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </ContentLayout>
  );
};

export default Page;
