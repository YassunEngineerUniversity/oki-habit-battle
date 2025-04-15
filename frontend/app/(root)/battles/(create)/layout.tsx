import FormProvider from "@/components/utils/provider/FormProvider";

export default function BattleCreateLayout({ children }: { children: React.ReactNode }) {

  const defaultValues = {
    title: "",
    categories: [{ name: "" }], 
    backgroundImage: null,
    participants: "",
    applyPeriod: "",
    battlePeriod: "",
    achievementRate: "",
    detail: "",
  }

  return (
    <FormProvider defaultValues={defaultValues}>
      {children}
    </FormProvider>
  )
}