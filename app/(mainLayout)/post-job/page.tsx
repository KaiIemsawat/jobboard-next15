import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { CreateJobForm } from "@/components/forms/CreateJobForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ArcJetLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";
import Image from "next/image";
import { redirect } from "next/navigation";

const companies = [
  {
    id: 0,
    name: "ArcJet",
    logo: ArcJetLogo,
  },
  {
    id: 1,
    name: "Inngest",
    logo: InngestLogo,
  },
  {
    id: 2,
    name: "ArcJet",
    logo: ArcJetLogo,
  },
  {
    id: 3,
    name: "Inngest",
    logo: InngestLogo,
  },
  {
    id: 4,
    name: "ArcJet",
    logo: ArcJetLogo,
  },
  {
    id: 5,
    name: "Inngest",
    logo: InngestLogo,
  },
];

const testimonials = [
  {
    qoute:
      "Finding top talent has never been easier. The smart matching feature helps us connect with qualified candidates in no time!",
    author: "Jon Doe",
    company: "TechCorp",
  },
  {
    qoute:
      "I love how easy it is to apply for jobs and connect with recruiters. The AI-powered resume suggestions helped me stand out!",
    author: "Sarah L",
    company: "StartUp Now",
  },
  {
    qoute:
      "We streamlined our hiring process with this app. It’s intuitive, efficient, and helps us get the right people faster.",
    author: "Jane Buck",
    company: "Innovate Solutions",
  },
];

const stats = [
  {
    id: 0,
    value: "10k+",
    label: "Monthly active job seekers",
  },
  {
    id: 1,
    value: "48h",
    label: "Average time to hire",
  },
  {
    id: 2,
    value: "95%",
    label: "Employer satisfaction rate",
  },
  {
    id: 3,
    value: "500+",
    label: "Companies hiring remote position",
  },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) return redirect("/");

  return data;
}

export default async function PostJobPage() {
  const session = await requireUser();
  const data = await getCompany(session.id as string);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyName={data.name}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />
      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Trusted by Industry Leader</CardTitle>
            <CardDescription>
              Join thousands of companies hiring top tatents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Logo */}
            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-75 transition-opacity hover:opacity-100 duration-300"
                  />{" "}
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div
              className="space-y-4"
              // same as className="flex flex-col gap-4"
            >
              {testimonials.map((t, index) => (
                <blockquote
                  key={index}
                  className="border-l-2 border-primary/80 pl-4"
                >
                  <p className="text-sm text-muted-foreground italic">
                    "{t.qoute}"
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    - {t.author}, {t.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            {/* We Will render stats here */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div className="rounded-lg bg-muted p-2" key={s.id}>
                  <h4 className="text-2xl font-bold text-primary/80">
                    {s.value}
                  </h4>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
