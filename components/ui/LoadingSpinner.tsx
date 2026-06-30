"use client";

import { Loader2 } from "lucide-react";

interface Props {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 24, className = "" }: Props) {
  return (
    <Loader2 
      size={size} 
      className={`animate-spin text-primary ${className}`} 
    />
  );
}
