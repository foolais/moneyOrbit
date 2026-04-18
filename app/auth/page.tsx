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

const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative">
      <div className="w-xs flex flex-col gap-2 relative">
        <h1 className="text-3xl font-extrabold text-accent stroke-text tracking-widest ml-4">
          Money Orbit
        </h1>
        <Card>
          <div className="flex items-center gap-2 px-4">
            <Button
              size="icon"
              className="cursor-pointer group"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              <ArrowLeftRight
                size="5"
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </Button>
            <CardTitle className="font-bold mx-auto text-secondary flex items-center gap-2 ml-8">
              Welcome back <Sparkles className="size-5" />
            </CardTitle>
          </div>
          <CardContent>
            {isLoginForm ? <FormLogin /> : <FormRegister />}
          </CardContent>
          <CardFooter className="w-full p-2 mb-2">
            <Button
              form={isLoginForm ? "login-form" : "register-form"}
              variant="secondary"
              className="rounded-full w-1/2 mx-auto px-4 py-2 cursor-pointer hover:bg-accent/90 hover:scale-105"
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
          className="absolute -top-24 -right-12 object-cover"
          loading="eager"
        />
      </div>
      <Image
        src={AstronoutMoon}
        alt="Astronout on Moon"
        width={150}
        height={150}
        className="absolute top-0 sm:top-5 md:top-10 left-0 sm:left-5 md:left-10 object-cover"
        loading="eager"
      />
      <Image
        src={AstronoutRocket}
        alt="Astronout on Rocket"
        width={150}
        height={150}
        className="absolute bottom-0 sm:bottom-5 md:bottom-10 right-0 sm:right-5 md:right-10 object-cover"
        loading="eager"
      />
    </div>
  );
};

export default AuthPage;
