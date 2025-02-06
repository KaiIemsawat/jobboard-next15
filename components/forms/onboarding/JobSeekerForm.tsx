import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { jobSeekerSchema } from "@/app/utils/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { useState } from "react";
import { createJobSeeker } from "@/app/actions";

import PdfImage from "@/public/pdf.png";

export function JobSeekerForm() {
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      about: "",
      name: "",
      resume: "",
    },
  });

  const [pending, setPending] = useState(false);

  async function onSubmit(data: z.infer<typeof jobSeekerSchema>) {
    try {
      setPending(true);
      await createJobSeeker(data);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.log("Something went wrong");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Full Name Here"
                  {...field}
                  className="bg-secondary/30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Discription</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself..."
                  {...field}
                  className="bg-secondary/30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Resume <span className="text-muted-foreground">(.pdf)</span>
              </FormLabel>
              <FormControl>
                <div className="">
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src={PdfImage}
                        alt="pdf Logo"
                        width={100}
                        height={100}
                        className="rounded-l"
                      />
                      <Button
                        className="absolute -top-1 -right-1 bg-transparent/60 rounded-full max-w-4 max-h-4 p-3 text-red-200 hover:text-white hover:bg-red-800 duration-300"
                        type="button"
                        size="icon"
                        onClick={() => field.onChange("")}
                      >
                        <XIcon className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="resumeUploader"
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                      }}
                      onUploadError={() => {
                        console.log("Something went wrong");
                      }}
                      className="bg-secondary/30 ut-button:bg-primary ut-button:text-white ut-button:hover:ring-2 ut-button:hover:ring-offset-2 ut-button:hover:ring-primary ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary/50 ut-button:duration-300"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full hover:ring-2 hover:ring-primary-foreground hover:ring-offset-2"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
}
