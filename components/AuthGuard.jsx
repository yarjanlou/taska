"use client";

import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.replace("/login");
    }
  }, []);

  return <>{pb.authStore.isValid && children}</>;
}
