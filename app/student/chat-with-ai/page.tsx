"use client";

import { useState, useEffect } from "react";
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
import { AuthButton } from "@/components/auth-button";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const Page = () => {
  const [user, setUser] = useState<any>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to use the chatbot");
      return;
    }
    handleSubmit(e);
  };

  return (
    <ContentLayout title="Chat with AI">
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Gemini AI Chatbot</CardTitle>
        </CardHeader>
        {user ? (
          <>
            <CardContent className="h-[60vh] overflow-y-auto">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <form onSubmit={onSubmit} className="flex w-full space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-grow"
                />
                <Button type="submit">Send</Button>
              </form>
            </CardFooter>
          </>
        ) : (
          <CardContent>
            <p className="mb-4">Please sign in to use the chatbot</p>
            <AuthButton />
          </CardContent>
        )}
      </Card>
    </ContentLayout>
  );
};

export default Page;
