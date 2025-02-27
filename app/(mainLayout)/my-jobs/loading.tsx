import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LoadingMyJobs() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>My Jobs</CardTitle>
        <CardDescription>
          Manage your job listings and application here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/20">
              <TableHead className="text-primary/75 font-semibold">
                Logo
              </TableHead>
              <TableHead className="text-primary/75 font-semibold">
                Company
              </TableHead>
              <TableHead className="text-primary/75 font-semibold">
                Job Title
              </TableHead>
              <TableHead className="text-primary/75 font-semibold">
                Status
              </TableHead>
              <TableHead className="text-primary/75 font-semibold">
                Created At
              </TableHead>
              <TableHead className="text-right text-primary/75 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="size-10 rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[140px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[180px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[140px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="size-8 rounded-md ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
