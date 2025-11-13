"use client";

import { pb } from "@/lib/pocketbase";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
  // useEffect(() => {
  //   const validateAuth = async () => {
  //     if (pb.authStore.isValid) {
  //       try {
  //         await pb.collection("users").authRefresh();
  //       } catch (err) {
  //         pb.authStore.clear();
  //       }
  //     }
  //   };
  //   validateAuth();
  // }, []);

  return <>{children}</>;
}
