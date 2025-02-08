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
  password: z.string({
    required_error: "Please enter a password",
  }),
});

export default schema;
