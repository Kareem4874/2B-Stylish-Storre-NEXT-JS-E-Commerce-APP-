import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ToastPayload = {
  title?: string;
  description?: string;
  type?: "success" | "error" | "info";
  durationMs?: number;
}

export function toast(messageOrOptions: string | ToastPayload, type?: "success" | "error" | "info"){
  if (typeof window === "undefined") return;
  let detail: ToastPayload;
  if (typeof messageOrOptions === "string") {
    detail = { title: messageOrOptions, type };
  } else {
    detail = messageOrOptions;
  }
  const event = new CustomEvent("app:toast", { detail });
  window.dispatchEvent(event);
}
