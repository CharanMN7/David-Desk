"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";

interface Conversation {
  id: string;
  title: string;
}

interface ConversationDropdownProps {
  onSelect: (conversationId: string) => void;
}

export function ConversationDropdown({ onSelect }: ConversationDropdownProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("conversations")
          .select("id, title")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching conversations:", error);
        } else {
          setConversations(data);
        }
      }
    };

    fetchConversations();
  }, []);

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[50%]">
        <SelectValue placeholder="Select a conversation" />
      </SelectTrigger>
      <SelectContent>
        {conversations.map((conversation) => (
          <SelectItem key={conversation.id} value={conversation.id}>
            {conversation.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
