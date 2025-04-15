"use client"
import { useForm, FormProvider as RhfFormProvider } from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';
import { BattleCreateFormData, battleCreateSchema } from "@/schema/battle/schema";

interface FormProviderProps {
  children: React.ReactNode
  defaultValues: BattleCreateFormData
}

const FormProvider = ({children, defaultValues}: FormProviderProps) => {
  const methods = useForm<BattleCreateFormData>({
    defaultValues,
    mode: 'onSubmit',
    resolver: zodResolver(battleCreateSchema),
  })
  return (
    <RhfFormProvider {...methods}>
      {children}
    </RhfFormProvider>
  )
}

export default FormProvider
