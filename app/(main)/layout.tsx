import Header from "@/components/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid p-6">
      <Header />
      <div className="sm:mt-10">{children}</div>
    </div>
  );
};

export default MainLayout;
