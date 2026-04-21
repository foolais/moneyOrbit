"use client";

import NightFireflies from "@/public/night-fireflies.gif";
import Image from "next/image";
import Title from "./title";

const FormSearchTransaction = () => {
  return (
    <header>
      <div className="flex items-center justify-center gap-4">
        <div className="relative h-36 w-52 object-cover">
          <Image
            src={NightFireflies}
            alt="Night Fireflies"
            fill
            loading="eager"
            unoptimized
            className="rounded-xl object-cover"
          />
        </div>
        <div className="sm:hidden">
          <Title />
        </div>
      </div>
    </header>
  );
};

export default FormSearchTransaction;
