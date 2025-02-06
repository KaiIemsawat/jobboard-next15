import { z } from "zod";

export const companySchema = z.object({
  name: z
    .string()
    .min(2, "Company name must not be less than 2 characters")
    .max(30, "Company name should not be longer than 30 characters"),
  location: z
    .string()
    .min(2, "Location must not be less than 2 characters")
    .max(100, "Company namlocatione should not be longer than 100 characters"),
  about: z
    .string()
    .min(10, "Please provide some information at least 10 characters long"),
  logo: z.string().min(1, "Please upload your company logo"),
  website: z.string().url("Please enter a valid URL"),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  about: z.string().min(10, "Please provide more information about yourself"),
  resume: z.string().min(1, "Please input your resume"),
});
