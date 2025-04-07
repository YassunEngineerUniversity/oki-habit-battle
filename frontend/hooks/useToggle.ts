import { useState } from "react";
import { toast } from "sonner";

interface AsyncFunc {
  (): () => Promise<{ success: boolean; message: string }>;
}

interface UseToggleProps {
  state: boolean;
  on: AsyncFunc;
  off: AsyncFunc;
  isSuccessToast?: boolean;
}

export const useToggle = (
  { state: isState, on: createFunc, off: deleteFunc, isSuccessToast = false }: UseToggleProps
) => {
  const [isToggle, setIsToggle] = useState(isState);

  const handleCreate = createFunc()
  const handleDelete = deleteFunc()

  const toggle = async () => {
    if (isToggle) {
      const response = await handleDelete();

      if(response?.success !== undefined && !response.success) {
        toast.error(response.message, { style: { background: "#dc2626", color: "#fff" }});
      } else {
        if(isSuccessToast) {
          toast.success(response.message, { style: { background: "#4ade80", color: "#fff" }});
        }
        setIsToggle(false);
      }
    } else {
      const response = await handleCreate();
      
      if(response?.success !== undefined && !response.success) {
        toast.error(response.message, { style: { background: "#dc2626", color: "#fff" }});
      } else {
        if(isSuccessToast) {
          toast.success(response.message, { style: { background: "#4ade80", color: "#fff" }});
        }
        setIsToggle(true);
      }
    }
  }

  return {
    isToggle,
    toggle,
  }
}