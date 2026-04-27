import Image from "next/image";
import AstronoutGundam from "@/public/astronout-gundam.webp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { randomInt } from "crypto";

const ProfilePage = () => {
  return (
    <main className="mx-auto mt-4 md:mt-8 xl:w-11/12 2xl:max-w-7xl">
      <Card className="mx-auto w-full max-w-md">
        <CardContent className="flex flex-col gap-4">
          <div className="border-accent relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 shadow">
            <Image
              src={AstronoutGundam}
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-muted-foreground text-center font-semibold">
            wahyu.tesa@gmail.com
          </p>
          <div className="flex-1 border-t-2 pt-4 text-center">
            <p className="text-center text-sm font-semibold">transactions</p>
            <div className="text-center">
              <p className="text-2xl font-bold">120</p>
              <p className="text-muted-foreground text-xs">
                total transactions
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t-2 pt-4">
            <div className="text-center">
              <p className="text-muted-foreground text-xs">net balance</p>
              <p className="text-secondary text-xl font-bold">
                {formatPrice(randomInt(1000000, 10000000))}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-green-100 p-3 text-center">
                <p className="text-muted-foreground text-xs">income</p>
                <p className="font-semibold text-green-600">
                  {formatPrice(randomInt(1000000, 10000000))}
                </p>
              </div>
              <div className="rounded-xl bg-red-100 p-3 text-center">
                <p className="text-muted-foreground text-xs">expense</p>
                <p className="font-semibold text-red-600">
                  {formatPrice(randomInt(1000000, 10000000))}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full cursor-pointer" variant="destructive">
            logout
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default ProfilePage;
