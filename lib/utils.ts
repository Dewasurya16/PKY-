import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format angka ke format Indonesia, mis. 12453 -> "12.453" */
export function formatNumberID(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}
