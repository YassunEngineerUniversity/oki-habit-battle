import { IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/constants/image";
import { sizeInMB } from "@/lib/sizeInMb";
import { ProfileSettingsState } from "@/types/profile/types";
import { redirect } from "next/navigation";
import { z } from "zod";

const profileSettingsSchema = z.object({
  name: z.string().trim().min(1, { message: "ユーザ名は必須です" }).max(255, { message: "ユーザ名は255文字以内で入力してください" }),
  image: z.custom<File>()
          .refine((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE, { message: 'ファイルサイズは最大2MBです' })
          .refine((file) => IMAGE_TYPES.includes(file.type), {
            message: 'jpg、jpeg, png、webpのいずれかの画像形式にしてください',
          }),
  profile: z.string().trim().max(255, { message: "プロフィールは255文字以内で入力してください" }),
})

export const editProfile = async (prevState: any, formData: FormData): Promise<ProfileSettingsState> => {
  console.log("formData entries:", Array.from(formData.entries()));
  const editProfileFormData = Object.fromEntries(formData);
  const validatedEditProfileFormData = profileSettingsSchema.safeParse(editProfileFormData);

  if(!validatedEditProfileFormData.success) {
    const formFieldErrors = validatedEditProfileFormData.error.flatten().fieldErrors
    return {
      name: formData.get("name") as string,
      image: typeof formData.get("image") === "string" ? formData.get("image") as string : undefined,
      profile: formData.get("profile") as string,
      errors: {
        name: formFieldErrors?.name,
        image: formFieldErrors?.image,
        profile: formFieldErrors?.profile,
      },
      message: "入力内容にエラーがあります",
    };
  }

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/me';
  const response = await fetch(endpoint, {
    method: 'PUT',
    body: formData,
  });

  if(!response.ok) {
    const data = await response.json();
    const errorMessage = Array.isArray(data.errors) ? data.errors[0] : data.errors;
    return {
      name: formData.get("name") as string,
      image:  typeof formData.get("image") === "string" ? formData.get("image") as string : undefined,
      profile: formData.get("profile") as string,
      message: errorMessage? errorMessage : "プロフィールの更新に失敗しました",
      success: false,
    }
  }

  redirect("/profile");
}