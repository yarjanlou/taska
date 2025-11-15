"use client";

import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-full min-h-screen w-full -translate-y-15 items-center justify-center">
      <div spacing={2} className="flex flex-col items-center gap-2">
        <Typography variant="h1" sx={{ fontWeight: "600" }}>
          Taska
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#858383e3", fontSize: "17px", mb: "20px" }}
        >
          Organize your tasks, boost your productivity
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "black", color: "white", width: "100px" }}
          onClick={handleLogin}
        >
          login
        </Button>
      </div>
    </div>
  );
}
