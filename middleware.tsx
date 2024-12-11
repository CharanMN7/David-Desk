// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Get user role from profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_role")
    .eq("id", session.user.id)
    .single();

  // Role-based route protection
  const path = req.nextUrl.pathname;
  const role = profile?.user_role;

  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  // if (path.startsWith("/teacher") && role !== "teacher") {
  //   return NextResponse.redirect(new URL("/unauthorized", req.url));
  // }
  // if (path.startsWith("/student") && role !== "student") {
  //   return NextResponse.redirect(new URL("/unauthorized", req.url));
  // }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*"],
};
