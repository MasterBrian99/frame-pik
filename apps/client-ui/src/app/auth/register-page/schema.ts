import { z } from "zod";

const schema = z.object({
  email: z
    .string({
      required_error: "Please enter an email",
    })
    .email({
      message: "Please enter a valid email",
    })
    .max(255, {
      message: "Email must be less than 255 characters",
    }),
  name: z
    .string({
      required_error: "Please enter a name",
    })
    .max(255, {
      message: "Name must be less than 255 characters",
    }),
  password: z
    .string({
      required_error: "Please enter a password",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(32, {
      message: "Password must be less than 32 characters",
    }),
});

export default schema;
