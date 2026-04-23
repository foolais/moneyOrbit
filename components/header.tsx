import {
  ChartNoAxesColumnIncreasing,
  Home,
  PlusIcon,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Title from "./title";
import Image from "next/image";
import AstronoutMoon from "@/public/astronout-moon.webp";
import HeaderButtonAddTransaction from "./header-button-add-transaction";

const Header = () => {
  const headerItems = [
    {
      name: "home",
      href: "/home",
      icon: Home,
    },
    {
      name: "all transactions",
      href: "/all-transactions",
      icon: ShoppingCart,
    },
    {
      name: "add",
      href: "/",
      icon: PlusIcon,
      isCenter: true,
    },
    {
      name: "analytic",
      href: "/analytic",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      name: "profile",
      href: "/home",
      icon: User,
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-8 px-4 sm:absolute sm:top-4 sm:bottom-auto sm:mx-auto sm:max-w-6xl">
      <Title className="hidden sm:block" />
      <div className="bg-card border-secondary relative mx-auto flex min-w-sm items-center justify-evenly gap-2 rounded-t-xl border-2 px-2 py-0.5 shadow-lg sm:mx-0 sm:rounded-2xl sm:px-3">
        {headerItems.map((item) => {
          if (item.isCenter) {
            return (
              <div
                key={item.name}
                className="flex flex-1 justify-center sm:hidden"
              >
                <div className="absolute -top-6 h-10 w-10">
                  <HeaderButtonAddTransaction />
                </div>
              </div>
            );
          }

          return (
            <Link
              href={item.href}
              key={item.name}
              className="group hover:bg-muted flex flex-1 items-center justify-center gap-1 rounded-xl px-2 py-1.5 transition-all sm:flex-none"
            >
              <Button
                variant="secondary"
                size="icon"
                className="group-hover:bg-secondary/70 cursor-pointer transition group-hover:scale-105 sm:hidden"
              >
                <item.icon className="size-4" />
              </Button>
              <p className="bg-secondary hidden rounded-full px-2 py-0.5 text-sm font-semibold transition-all group-hover:scale-105 sm:block">
                {item.name}
              </p>
            </Link>
          );
        })}
      </div>
      <Image
        src={AstronoutMoon}
        alt="Astronout on the moon"
        className="hidden md:block"
        width={70}
        height={70}
        loading="eager"
      />
    </div>
  );
};

export default Header;
