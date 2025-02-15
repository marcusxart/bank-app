const { z } = require("zod");

const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().trim().email({ message: "Invalid email format." }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters long." }),
  gender: z.enum(["male", "female", "others"], {
    message: "Gender must be 'male', 'female', or 'others'.",
  }),
  birthday: z.coerce.date().refine((date) => date <= new Date(), {
    message: "Birthday must be a valid past date.",
  }),
  phoneNo: z
    .string()
    .trim()
    .regex(/^\d{7,15}$/, {
      message: "Phone number must be between 7-15 digits.",
    }),
  dialCode: z.string().trim().min(1, { message: "Dial code is required." }),
});

const addressSchema = z.object({
  country: z.string().trim().min(1, { message: "Country is required." }),
  state: z.string().trim().min(1, { message: "State is required." }),
  city: z.string().trim().min(1, { message: "City is required." }),
  zipcode: z
    .string()
    .trim()
    .regex(/^\d{4,10}$/, {
      message: "ZIP code must be between 4-10 characters.",
    }),
  address: z.string().trim().min(1, { message: "Address is required." }),
});

const accountchema = z.object({
  type: z.enum(["personal", "current", "checking"], {
    message: "Account type must be 'Personal', 'Current', or 'Checking'",
  }),
  currency: z.enum(["usd", "eur", "gbp"], {
    message: "Account currency must be 'USD', 'EUR', or 'GBP'",
  }),
});

const createUserSchema = z.object({
  personal: userSchema,
  contact: addressSchema,
  account: accountchema,
});

const signInSchema = z.object({
  userId: z.string().trim().min(1, { message: "User ID is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

module.exports = {
  userSchema,
  createUserSchema,
  addressSchema,
  accountchema,
  signInSchema,
};
