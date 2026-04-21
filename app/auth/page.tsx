"use client";

import FormLogin from "@/components/form-login";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import WorkingLaptop from "@/public/working-laptop.webp";
import AstronoutMoon from "@/public/astronout-moon.webp";
import AstronoutRocket from "@/public/astronout-rocket.webp";
import { ArrowLeftRight, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import FormRegister from "@/components/form-register";
import Title from "@/components/title";

const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="relative flex h-dvh w-screen flex-col items-center justify-center overflow-hidden">
      <div className="relative flex w-xs flex-col gap-2">
        <Title className="ml-4" />
        <Card>
          <div className="flex items-center gap-2 px-4">
            <Button
              size="icon"
              className="group cursor-pointer"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              <ArrowLeftRight
                size="5"
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </Button>
            <CardTitle className="text-secondary mx-auto ml-8 flex items-center gap-2 font-bold">
              Welcome back <Sparkles className="size-5" />
            </CardTitle>
          </div>
          <CardContent>
            {isLoginForm ? <FormLogin /> : <FormRegister />}
          </CardContent>
          <CardFooter className="mb-2 w-full p-2">
            <Button
              form={isLoginForm ? "login-form" : "register-form"}
              variant="secondary"
              className="hover:bg-accent/90 mx-auto w-1/2 cursor-pointer rounded-full px-4 py-2 hover:scale-105"
            >
              {isLoginForm ? "login" : "register"} <Send className="size-5" />
            </Button>
          </CardFooter>
        </Card>
        <Image
          src={WorkingLaptop}
          alt="Working Laptop"
          width={150}
          height={150}
          className="absolute -top-24 -right-8 object-cover"
          loading="eager"
        />
      </div>
      <Image
        src={AstronoutMoon}
        alt="Astronout on Moon"
        width={150}
        height={150}
        className="absolute top-0 left-0 object-cover sm:top-5 sm:left-5 md:top-10 md:left-10"
        loading="eager"
      />
      <Image
        src={AstronoutRocket}
        alt="Astronout on Rocket"
        width={150}
        height={150}
        className="absolute right-0 bottom-0 object-cover sm:right-5 sm:bottom-5 md:right-10 md:bottom-10"
        loading="eager"
      />
    </div>
  );
};

export default AuthPage;
