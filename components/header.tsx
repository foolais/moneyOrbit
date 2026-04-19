import { ChartNoAxesColumnIncreasing, Home, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Title from "./title";

const Header = () => {
  const headerItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
    },
    {
      name: "Analysis",
      href: "/home",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      name: "Profile",
      href: "/home",
      icon: User,
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-8 px-4 sm:absolute sm:top-4 sm:bottom-auto sm:mx-auto sm:max-w-5xl">
      <Title className="hidden sm:block" />
      <div className="bg-card border-secondary mx-auto flex min-w-sm items-center justify-evenly gap-2 rounded-t-xl border-2 px-2 py-0.5 shadow-lg sm:mx-0 sm:rounded-2xl sm:px-3">
        {headerItems.map((item) => {
          return (
            <Link
              href={item.href}
              key={item.name}
              className="group hover:bg-muted flex items-center gap-1 rounded-xl px-2 py-1.5 transition-all"
            >
              <Button
                variant="secondary"
                size="icon"
                className="group-hover:bg-secondary/70 cursor-pointer transition group-hover:scale-105"
              >
                <item.icon className="size-4" />
              </Button>
              <p className="text-sm font-medium">{item.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
