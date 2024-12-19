"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ReactMarkdown from "react-markdown";
import "../../markdown-styles.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { ConversationDropdown } from "@/components/conversations-dropdown";

interface Message {
  role: string;
  content: string;
  id: number;
}

const Page = () => {
  const session = supabase.auth.getSession();
  const router = useRouter();

  if (!session) {
    router.push("/auth/login");
  }

  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      // Add user message to the conversation
      const userMessage = { role: "user", content: input, id: Date.now() };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      // Prepare request body using FormData
      const formData = new FormData();
      formData.append("query", input);

      console.log("Sending form data with query:", input);

      // Send message to API
      const url = `https://ebb6-103-177-203-130.ngrok-free.app`;
      const response = await fetch(`${url}/chat`, {
        method: "POST",
        body: formData, // Send as FormData
      });

      // Log the raw response
      const responseText = await response.json();
      const responseTextString = JSON.parse(responseText)["answer"];
      console.log("Raw response:", responseTextString);

      if (!response.ok) {
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          body: responseText,
        });
        throw new Error(`Failed to get response: ${responseText}`);
      }

      // Parse the response text
      const data = responseTextString;

      // Add AI response to the conversation
      const aiMessage = {
        role: "assistant",
        content: data,
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Update conversation in Supabase if there's a current conversation
      if (currentConversationId) {
        await supabase
          .from("conversations")
          .update({ conversation: [...messages, userMessage, aiMessage] })
          .eq("id", currentConversationId);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get response from AI");
    } finally {
      setIsLoading(false);
    }
  };

  // const loadConversation = async (conversationId: string) => {
  //   const { data, error } = await supabase
  //     .from("conversations")
  //     .select("conversation")
  //     .eq("id", conversationId)
  //     .single();

  //   if (error) {
  //     console.error("Error loading conversation:", error);
  //     return;
  //   }

  //   if (data && data.conversation) {
  //     setMessages(data.conversation);
  //     setCurrentConversationId(conversationId);
  //   }
  // };

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
            {/* <ConversationDropdown onSelect={loadConversation} /> */}
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
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </ContentLayout>
  );
};

export default Page;
