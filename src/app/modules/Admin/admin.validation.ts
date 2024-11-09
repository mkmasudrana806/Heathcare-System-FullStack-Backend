import { z } from "zod";

// --------------- update admin ---------------
const updateAdminSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name is invalid",
      })
      .optional(),
    contactNumber: z
      .string({
        invalid_type_error: "Contact Number is invalid",
      })
      .optional(),
  }),
});

export const AdminValidations = {
  updateAdminSchema,
};
