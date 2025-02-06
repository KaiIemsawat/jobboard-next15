import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { auth, signIn } from "@/app/utils/auth";
import { GeneralSubmitButtons } from "@/components/general/SubmitButtons";
import { redirect } from "next/navigation";
import Google from "@/public/googleIcon";
import Github from "@/public/github";

export async function LoginForm() {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>
            Login with your Google or GitHub account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* GITHUB */}
            <form
              action={async () => {
                "use server";

                await signIn("github", {
                  redirectTo: "/onboarding",
                });
              }}
            >
              <GeneralSubmitButtons
                width="w-full"
                variant="outline"
                text="Login With GitHub"
                icon={<Github />}
              />
            </form>
            {/* GOOGLE */}
            <form
              action={async () => {
                "use server";

                await signIn("google", {
                  redirectTo: "/onboarding",
                });
              }}
            >
              <GeneralSubmitButtons
                width="w-full"
                variant="outline"
                text="Login With Google"
                icon={<Google />}
              />
            </form>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground text-balance">
        By clicking continue, you agree to our terms and service and privacy
        policies.
      </div>
    </div>
  );
}
