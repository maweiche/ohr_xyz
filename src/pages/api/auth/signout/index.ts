import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import Cookies from "js-cookie";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies: () => Cookies });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/", req.url), {
    status: 302,
  });
}
