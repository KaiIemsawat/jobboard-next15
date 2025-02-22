import { formatCurrency } from "@/app/utils/formatCurrency";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardHeader } from "../ui/card";
import { formatRelativeTime } from "@/app/utils/formatRelativeTime";

interface iAppProps {
  job: {
    id: string;
    createdAt: Date;
    company: {
      about: string;
      name: string;
      location: string;
      logo: string;
    };
    location: string;
    jobTitle: string;
    employmentType: string;
    salaryFrom: number;
    salaryTo: number;
  };
}

export function JobCard({ job }: iAppProps) {
  return (
    <Link href={`/job/${job.id}`} className="">
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={job.company.logo}
              alt={job.company.name}
              width={48}
              height={48}
              className="size-12 rounded-lg"
            />

            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-bold">{job.jobTitle}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {job.company.name}
                </p>
                <div className="h-4 border-secondary border-l-2" />
                <Badge className="rounded-full" variant="secondary">
                  {job.employmentType}
                </Badge>
                <div className="h-4 border-secondary border-l-2" />
                <Badge className="rounded-full bg-secondary text-primary/80 hover:bg-secondary">
                  {job.location}
                </Badge>
                <div className="h-4 border-secondary border-l-2" />
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(job.salaryFrom)} -{" "}
                  {formatCurrency(job.salaryTo)}
                </p>
              </div>
            </div>
            <div className="md:ml-auto text-right">
              <div className="flex items-center gap-2 justify-end">
                <MapPin className="size-4" />
                <h2>{job.location}</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatRelativeTime(job.createdAt)}
              </p>
            </div>
          </div>

          <div className="">
            <p className="text-base text-muted-foreground line-clamp-2 !mt-5">
              {job.company.about}
            </p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
