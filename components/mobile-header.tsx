import Image from "next/image";
import Title from "./title";
import AstronoutMoon from "@/public/astronout-moon.webp";

const MobileHeader = () => {
  return (
    <header className="flex items-center justify-between sm:hidden">
      <Title />
      <Image
        src={AstronoutMoon}
        alt="Astronout on the moon"
        width={70}
        height={70}
        loading="eager"
      />
    </header>
  );
};

export default MobileHeader;
