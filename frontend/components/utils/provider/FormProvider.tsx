"use client"
import { useForm, FormProvider as RhfFormProvider } from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';
import { BattleFormData, battleCreateSchema } from "@/schema/battle/schema";

interface FormProviderProps {
  children: React.ReactNode
  defaultValues: BattleFormData | any
}

const FormProvider = ({children, defaultValues}: FormProviderProps) => {
  const methods = useForm<BattleFormData | any>({
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
