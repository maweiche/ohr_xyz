import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/database.types";
import Cookies from "js-cookie";
import AccountForm from "@components/account/AccountForm";

export default async function Account() {
  const supabase = createServerComponentClient<Database>({
    cookies: () => Cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AccountForm session={session} />;
}
