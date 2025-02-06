import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "@/app/utils/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { countryList } from "@/app/utils/countriesList";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { createCompany } from "@/app/actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { XIcon } from "lucide-react";

export function CompanyForm() {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      about: "",
      location: "",
      logo: "",
      name: "",
      website: "",
      xAccount: "",
    },
  });

  const [pending, setPending] = useState(false);

  async function onSubmit(data: z.infer<typeof companySchema>) {
    try {
      setPending(true);
      await createCompany(data);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary/30"
                    placeholder="Enter company name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-secondary/30">
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup className="bg-secondary/30">
                      <SelectLabel>Worldwide</SelectLabel>
                      <SelectItem value="worldwide">
                        <span>🌎</span>
                        <span className="pl-2">Worldwide / Remote</span>
                      </SelectItem>
                    </SelectGroup>

                    <SelectGroup className="bg-secondary/30">
                      <SelectLabel>Location</SelectLabel>
                      {countryList.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          <span>{country.flagEmoji}</span>
                          <span className="pl-2">{country.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary/30"
                    placeholder="www.your-company.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="xAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X (Twitter) Account</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary/30"
                    placeholder="@Yourcompany"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-secondary/30"
                  placeholder="Tell us about your company"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company's Logo</FormLabel>
              <FormControl>
                <div className="">
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src={field.value}
                        alt="Company Logo"
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
                      endpoint="imageUploader"
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
          className={`w-full ${pending && "bg-primary/70"}`}
          disabled={pending}
        >
          {pending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
}
