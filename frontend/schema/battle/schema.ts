import { IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/constants/image";
import { sizeInMB } from "@/lib/sizeInMb";
import { z } from "zod";

export const battleCreateSchema = z.object({
  title: z.string().trim().min(1, { message: "対戦タイトルは必須です" }).max(255, { message: "バトルタイトルは255文字以内で入力してください" }),
  categories: z.array(z.object({
    name: z.string().trim().min(1, { message: "カテゴリ-は必須です" }).max(255, { message: "カテゴリは255文字以内で入力してください" }),
  })).refine((categories) => categories.length > 0, { message: "カテゴリーは必須です" }),
  backgroundImage: z.custom<File>()
    .refine((file) => !file || sizeInMB(file.size) <= MAX_IMAGE_SIZE, { message: 'ファイルサイズは最大2MBです' })
    .refine((file) => !file || IMAGE_TYPES.includes(file.type), {
      message: 'jpg、jpeg, png、webpのいずれかの画像形式にしてください',
    }),
  participants: z.string().transform((value) => Number(value))
    .refine((value) => value > 0, { message: "参加人数は必須です" })
    .refine((value) => value < 6, { message: "参加人数は5人までです" })
    .transform((value) => value.toString()),
  applyPeriod: z.string().trim().min(1, { message: "募集期間は必須です" }),
  battlePeriod: z.string().trim().min(1, { message: "対戦期間は必須です" }),
  achievementRate: z.string().trim().min(1, { message: "対戦期間は必須です" }),
  detail: z.string().trim().min(1, { message: "対戦タイトルは必須です" }),
})

export type BattleFormData = z.infer<typeof battleCreateSchema>;

