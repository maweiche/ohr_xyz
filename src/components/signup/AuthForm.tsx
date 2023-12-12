"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  createClientComponentClient,
  createPagesBrowserClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/database.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const AuthForm = () => {
  // const supabaseClient = createPagesBrowserClient<Database>();
  const supabaseClient = useSupabaseClient<Database>();
  return (
    <Auth
      supabaseClient={supabaseClient}
      // view=""
      // view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      // showLinks={false}
      providers={["google"]}
      redirectTo="http://localhost:3000/api/auth/callback"
    />
  );
};
