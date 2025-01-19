// hooks/useAuthorization.ts
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

interface Profile {
  user_role: "admin" | "teacher" | "student";
  username: string;
  full_name: string;
}

export function useAuthorization() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  async function getProfile() {
    const { data, error } = await supabase
      .from("profiles")
      .select("user_role, username, full_name")
      .eq("id", user?.id)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  }

  const isAdmin = profile?.user_role === "admin";
  const isTeacher = profile?.user_role === "teacher";
  const isStudent = profile?.user_role === "student";

  return { profile, isAdmin, isTeacher, isStudent };
}
