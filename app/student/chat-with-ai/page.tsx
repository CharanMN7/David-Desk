"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ReactMarkdown from "react-markdown";
import "./markdown-styles.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  const session = supabase.auth.getSession();
  const router = useRouter();

  if (!session) {
    router.push("/auth/login");
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      alert("Please sign in to use the chatbot");
      return;
    }
    handleSubmit(e);
  };

  return (
    <ContentLayout title="Chat with AI">
      <Card className="w-full mx-auto mt-8 text-xs lg:text-base">
        {/* <CardHeader>
          <CardTitle>Gemini AI Chatbot</CardTitle>
        </CardHeader> */}

        <CardContent className="h-[70vh] overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-blue-500 text-white" : "bg-muted-background text-black"}`}
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
        {/* <CardContent>
            <p className="mb-4">Please sign in to use the chatbot</p>
            <AuthButton />
          </CardContent> */}
      </Card>
    </ContentLayout>
  );
};

export default Page;
