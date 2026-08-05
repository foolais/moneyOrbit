import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabse = await createClient();
  const {
    data: { user },
  } = await supabse.auth.getUser();

  if (user) redirect("/home");

  return <div>{children}</div>;
};

export default AuthLayout;
