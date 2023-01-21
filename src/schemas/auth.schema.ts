import { object, string, TypeOf } from "zod";

export const signUpUserSchema = object({
  body: object({
    password: string({
      required_error: "Password is required"
    })
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character")
      .min(8, "Must be at least 8 characters in length"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required"
    }),
    email: string({
      required_error: "Email is required",
    })
      .email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const loginUserSchema = object({
  body: object({
    password: string({
      required_error: "Password is required"
    }),
    email: string({
      required_error: "Email is required",
    })
      .email("Not a valid email")
  })
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    })
      .email("Not a valid email")
  })
});


export type SignUpUserInput = TypeOf<typeof signUpUserSchema>["body"];

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];