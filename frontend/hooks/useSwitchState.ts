import { useState } from "react";
import { toast } from "sonner";

interface AsyncFunc {
  (battleId: string): Promise<{ success: boolean; message: string }>;
}

export const useSwitchState = (
  battleId: string,
  isState: boolean,
  createFunc: AsyncFunc,
  deleteFunc: AsyncFunc,
  isSuccessToast: boolean = false,
) => {
  const [isSwitchState, setIsSwitchState] = useState(isState);

  const handleCreate = createFunc.bind(null, battleId);
  const handleDelete = deleteFunc.bind(null, battleId);

  const handleSwitchState = async () => {
    if (isSwitchState) {
      const response = await handleDelete();

      if(response?.success !== undefined && !response.success) {
        toast.error(response.message, { style: { background: "#dc2626", color: "#fff" }});
      } else {
        if(isSuccessToast) {
          toast.success(response.message, { style: { background: "#4ade80", color: "#fff" }});
        }
        setIsSwitchState(false);
      }
    } else {
      const response = await handleCreate();
      
      if(response?.success !== undefined && !response.success) {
        toast.error(response.message, { style: { background: "#dc2626", color: "#fff" }});
      } else {
        if(isSuccessToast) {
          toast.success(response.message, { style: { background: "#4ade80", color: "#fff" }});
        }
        setIsSwitchState(true);
      }
    }
  }

  return {
    isSwitchState,
    setIsSwitchState,
    handleSwitchState,
  }
}