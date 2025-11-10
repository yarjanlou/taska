"use client";

import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        if (!pb.authStore.isValid) {
          router.replace("/login");
          return;
        }

        await pb.collection("users").authRefresh();
      } catch (err) {
        pb.authStore.clear();
        router.replace("/login");
      } finally {
        setIsChecking(false);
      }
    };

    validateAuth();
  }, [router]);

  if (isChecking) return null;

  return <>{pb.authStore.isValid && children}</>;
}
