import { Card, CardContent } from "./ui/card";

const ProfileSkeleton = () => {
  return (
    <Card className="mx-auto w-full max-w-md animate-pulse">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="bg-muted mx-auto h-32 w-32 rounded-full" />
        <div className="bg-muted mx-auto h-4 w-3/4 rounded" />
        <div className="space-y-3 pt-4">
          <div className="bg-muted h-10 rounded-xl" />
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted h-16 rounded-xl" />
            <div className="bg-muted h-16 rounded-xl" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSkeleton;
