import Header from "@/components/header";
import MobileHeader from "@/components/mobile-header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
