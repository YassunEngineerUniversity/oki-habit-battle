"use server"

import { SignupState } from "@/types/signup/types";
import { redirect } from "next/navigation";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().trim().min(1, {message: "ユーザ名は必須です"}).max(255, {message: "ユーザ名は255文字以内で入力してください"}),
  email: z.string().email({message: "メールアドレスの形式が正しくありません"}),
  password: z.string().trim().min(6, {message: "6字以上で入力してください"}).max(78, {message: "78字以内で入力してください"}),
})

export const signup = async (prevState: any, formData: FormData): Promise<SignupState> => {
  const signupFormData = Object.fromEntries(formData);
  const validatedSignupFormData = signupSchema.safeParse(signupFormData);
  
  if(!validatedSignupFormData.success) {
    const formFieldErrors = validatedSignupFormData.error.flatten().fieldErrors
    return {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      errors: {
        name: formFieldErrors?.name,
        email: formFieldErrors?.email,
        password: formFieldErrors?.password,
      },
      message: "入力内容にエラーがあります",
    };
  }

  const payload = {
    name: validatedSignupFormData.data?.name,
    email: validatedSignupFormData.data?.email,
    password: validatedSignupFormData.data?.password,
  }

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/users';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  console.log(response, "レスポンスサインアップ");

  if(!response.ok) {
    const data = await response.json();
    return {
      ...payload,
      message: Array.isArray(data.errors) ? data.errors[0] : data.errors,
      success: false,
    }
  }

  redirect("/");
}