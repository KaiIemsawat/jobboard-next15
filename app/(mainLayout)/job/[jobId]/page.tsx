import { notFound } from "next/navigation";
import Image from "next/image";
import { Bookmark } from "lucide-react";

import arcjet, { detectBot, tokenBucket } from "@/app/utils/arcjet";
import { getFlagEmoji } from "@/app/utils/countriesList";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/listOfBenefit";
import { JsonToHtml } from "@/components/general/JsonToHtml";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { request } from "@arcjet/next";
import { auth } from "@/app/utils/auth";
import Link from "next/link";
import { SaveJobButton } from "@/components/general/SubmitButtons";
import { saveJobPost, unSaveJobPost } from "@/app/actions";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  }),
);

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 100,
        interval: 60,
        refillRate: 30,
      }),
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 100,
        interval: 60,
        refillRate: 10,
      }),
    );
  }
}

async function getJob(jobId: string, userId?: string) {
  const [jobData, savedJob] = await Promise.all([
    await prisma.jobPost.findUnique({
      where: {
        status: "ACTIVE",
        id: jobId,
      },
      select: {
        jobTitle: true,
        jobDescription: true,
        location: true,
        employmentType: true,
        benefits: true,
        createdAt: true,
        listingDuration: true,
        company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
    }),

    userId
      ? prisma.savedJobPost.findUnique({
          where: {
            userId_jobPostId: {
              userId: userId,
              jobPostId: jobId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);

  if (!jobData) return notFound();

  return {
    jobData,
    savedJob,
  };
}

type Params = Promise<{ jobId: string }>; // 'jobId' needs to be matched with folder name

export default async function JobIdPage({ params }: { params: Params }) {
  const { jobId } = await params;

  const session = await auth();

  const req = await request();
  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("forbidden");
  }

  const { jobData: data, savedJob } = await getJob(jobId, session?.user?.id);

  const locationFlag = getFlagEmoji(data.location);

  return (
    <div className="grid lg:grid-cols-3 gap-8 mb-8">
      <div className="space-y-8 col-span-2">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-3xl font-bold">{data.jobTitle}</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">{data.company.name}</p>
              <div className="h-4 hidden md:inline border-secondary border-l-2" />
              <Badge className="rounded-full" variant="secondary">
                {data.employmentType}
              </Badge>
              <div className="h-4 hidden md:inline border-secondary border-l-2" />
              <Badge className="rounded-full bg-secondary text-primary/80 hover:bg-secondary">
                {locationFlag && <span className="mr-1">{locationFlag}</span>}
                {data.location}
              </Badge>
            </div>
          </div>

          {/*  */}
          {session?.user ? (
            <form
              action={
                savedJob
                  ? unSaveJobPost.bind(null, savedJob.id)
                  : saveJobPost.bind(null, jobId)
              }
            >
              <SaveJobButton savedJob={!!savedJob} />
            </form>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              <Bookmark className="size-4" />
              Save Job
            </Link>
          )}
        </div>

        <section>
          <JsonToHtml json={JSON.parse(data.jobDescription)} />
        </section>

        <section>
          <h3 className="font-semibold mb-4">
            Benefits
            <span className="text-sm text-muted-foreground font-normal ml-2">
              (offered benefits are highlighted)
            </span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOffered = data.benefits.includes(benefit.id);

              return (
                <Badge
                  className={cn(
                    isOffered ? "" : "opacity-75",
                    "text-sm px-4 py-1.5 cursor-not-allowed",
                  )}
                  key={benefit.id}
                  variant={isOffered ? "default" : "secondary"}
                >
                  <span className="flex items-center gap-2">
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="">
              <h3 className="font-semibold">Apply Now</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please let {data.company.name} know you found this job on
                JobZukkii. This will help us grow
              </p>
            </div>
            <Button className="w-full">Apply Now</Button>
          </div>
        </Card>

        {/* JOB DETAILS */}
        <Card className="p-6">
          <h3 className="font-semibold mb-2">About the job</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-primary/75">Apply before</span>
              <span className="text-sm">
                {new Date(
                  data.createdAt.getTime() +
                    data.listingDuration * 24 * 60 * 60 * 1000,
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-primary/75">Posted on</span>
              <span className="text-sm">
                {data.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-primary/75">Employment Type</span>
              <span className="text-sm">{data.employmentType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-primary/75">Location</span>
              <span className="text-sm">
                <span className="me-1">
                  {locationFlag && <span className="mr-1">{locationFlag}</span>}
                </span>
                {data.location}
              </span>
            </div>
          </div>
        </Card>

        {/* COMPANY CARD */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={data.company.logo}
                alt={"Company Logo"}
                width={48}
                height={48}
                className="rounded-full size-12"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold">{data.company.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {data.company.about}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
