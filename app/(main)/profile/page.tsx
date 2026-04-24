import Image from "next/image";
import AstronoutGundam from "@/public/astronout-gundam.webp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProfilePage = () => {
  return (
    <main className="mx-auto mt-8 xl:w-11/12 2xl:max-w-7xl">
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
          <div className="flex-1 text-center">
            <p className="text-lg font-semibold">120</p>
            <p className="text-muted-foreground text-xs">transactions</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="destructive">
            logout
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default ProfilePage;
