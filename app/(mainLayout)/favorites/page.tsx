import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { EmptyState } from "@/components/general/EmptyState";
import { JobCard } from "@/components/general/JobCard";

type FavoriteJob = {
  JobPost: {
    id: string;
    jobTitle: string;
    salaryFrom: number;
    salaryTo: number;
    location: string;
    employmentType: string;
    createdAt: Date;
    company: {
      name: string;
      logo: string;
      location: string;
      about: string;
    };
  };
};

async function getFavorites(userId: string): Promise<FavoriteJob[]> {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      JobPost: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          location: true,
          employmentType: true,
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
      },
    },
  });

  return data;
}

export default async function FavoritePage() {
  const session = await requireUser();

  const data = await getFavorites(session?.id as string);

  if (data.length === 0) {
    return (
      <EmptyState
        title="No Favorite Found"
        description="You don&apts;t have any favorite yet"
        buttonText="Find a job"
        href="/"
      />
    );
  }
  return (
    <div className="grid grid-cols-1 mt-5 gap-4">
      {data.map((favorite: FavoriteJob) => (
        <JobCard key={favorite.JobPost?.id} job={favorite.JobPost} />
      ))}
    </div>
  );
}
