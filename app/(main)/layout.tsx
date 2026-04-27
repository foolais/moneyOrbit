import Header from "@/components/header";
import MobileHeader from "@/components/mobile-header";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="grid p-4 md:p-6">
      <MobileHeader />
      <Header />
      <div className="md:mt-10">{children}</div>
      <div className="py-6" />
    </div>
  );
};

export default MainLayout;
