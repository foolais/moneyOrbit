import Image from "next/image";
import AstronoutGundam from "@/public/astronout-gundam.webp";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase-server";
import LogoutButton from "@/components/logout-button";
import { Suspense } from "react";
import ProfileSkeleton from "@/components/profile-skeleton";

const ProfilePage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count: totalTransactions } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id);

  const { data: transactionData } = await supabase
    .from("transactions")
    .select("amount, type")
    .eq("user_id", user?.id);

  const netWorth = transactionData?.reduce(
    (acc, curr) =>
      curr.type === "income" ? acc + curr.amount : acc - curr.amount,
    0,
  );
  const income = transactionData?.reduce(
    (acc, curr) => (curr.type === "income" ? acc + curr.amount : acc),
    0,
  );
  const expense = transactionData?.reduce(
    (acc, curr) => (curr.type === "expense" ? acc + curr.amount : acc),
    0,
  );

  return (
    <main className="mx-auto mt-4 md:mt-8 xl:w-11/12 2xl:max-w-7xl">
      <Suspense fallback={<ProfileSkeleton />}>
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="flex flex-col gap-4">
            <div className="border-accent relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 shadow">
              <Image
                src={AstronoutGundam}
                alt="Profile"
                fill
                sizes="auto"
                loading="eager"
                className="object-cover"
                priority
              />
            </div>
            <p className="text-muted-foreground text-center font-semibold">
              {user?.email}
            </p>
            <div className="flex-1 border-t-2 pt-4 text-center">
              <div className="text-center">
                <p className="text-muted-foreground text-xs">
                  total transactions
                </p>
                <p className="text-2xl font-bold">{totalTransactions}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t-2 pt-4">
              <div className="text-center">
                <p className="text-muted-foreground text-xs">net balance</p>
                <p className="text-secondary text-xl font-bold">
                  {formatPrice(netWorth || 0)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-green-100 p-3 text-center">
                  <p className="text-muted-foreground text-xs">income</p>
                  <p className="font-semibold text-green-600">
                    {formatPrice(income || 0)}
                  </p>
                </div>
                <div className="rounded-xl bg-red-100 p-3 text-center">
                  <p className="text-muted-foreground text-xs">expense</p>
                  <p className="font-semibold text-red-600">
                    {formatPrice(expense || 0)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <LogoutButton />
          </CardFooter>
        </Card>
      </Suspense>
    </main>
  );
};

export default ProfilePage;
