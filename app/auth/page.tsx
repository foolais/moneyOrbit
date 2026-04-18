import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const AuthPage = () => {
  return (
    <div className="mx-auto w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Welcome Back</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default AuthPage;
