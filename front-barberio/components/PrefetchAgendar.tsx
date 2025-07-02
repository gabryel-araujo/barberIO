"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PrefetchAgendar() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/agendar");
  }, [router]);
  return null;
}
