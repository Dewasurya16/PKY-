import { toast } from "sonner";

export function showToast(title: string, description?: string, variant: "success" | "error" | "info" = "info") {
  if (variant === "success") {
    toast.success(title, { description });
  } else if (variant === "error") {
    toast.error(title, { description });
  } else {
    toast.info(title, { description });
  }
}
