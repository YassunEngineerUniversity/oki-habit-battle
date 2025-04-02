"use server"

import { LoginState } from "@/types/login/types";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({message: "メールアドレスの形式が正しくありません"}),
  password: z.string().trim().min(6, {message: "6字以上で入力してください"}).max(78, {message: "78字以内で入力してください"}),
})

export const login = async (prevState: any, formData: FormData): Promise<LoginState> => {
  const loginFormData = Object.fromEntries(formData);
  const validatedLoginFormData = loginSchema.safeParse(loginFormData);

  if(!validatedLoginFormData.success) {
    const formFieldErrors = validatedLoginFormData.error.flatten().fieldErrors
    return {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      errors: {
        email: formFieldErrors?.email,
        password: formFieldErrors?.password,
      },
      message: "入力内容にエラーがあります",
    };
  }

  const payload = {
    email: validatedLoginFormData.data?.email,
    password: validatedLoginFormData.data?.password,
  }

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/login';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  console.log(response, "レスポンスログイン");

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