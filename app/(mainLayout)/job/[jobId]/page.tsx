import { getFlagEmoji } from "@/app/utils/countriesList";
import { prisma } from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { notFound } from "next/navigation";

async function getJob(jobId: string) {
  const jobData = await prisma.jobPost.findUnique({
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
      company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
        },
      },
    },
  });

  if (!jobData) {
    return notFound();
  }

  return jobData;
}

type Params = Promise<{ jobId: string }>; // 'jobId' needs to be matched with folder name

export default async function JobIdPage({ params }: { params: Params }) {
  const { jobId } = await params;

  const data = await getJob(jobId);
  console.log(data);

  const locationFlag = getFlagEmoji(data.location);

  return (
    <div className="grid lg:grid-cols-[1fr, 400px] gap-8">
      <div className="space-y-8">
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

          <Button variant="outline">
            <Bookmark className="size-4" />
            Save Job
          </Button>
        </div>

        <section>
          <p className="">
            description placeholder description placeholderdescription
            placeholder description placeholderdescription placeholder
            description placeholder..
          </p>
        </section>
      </div>
    </div>
  );
}
