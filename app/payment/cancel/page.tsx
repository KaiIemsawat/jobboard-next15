import Link from "next/link";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/app/utils/requireUser";

export default async function PaymentCancel() {
  await requireUser();

  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <XIcon className="size-12 p-2 bg-secondary/30 text-white rounded-full" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment Cancelled</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
              Successfully cancelled for job posting. You will not be charged,
              no worry
            </p>
            <Button
              asChild
              className="w-full mt-5 hover:text-white hover:underline"
            >
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
