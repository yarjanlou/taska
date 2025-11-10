"use client";

import PasswordInput from "@/components/ui/PasswordInput";
import { login } from "@/lib/services/auth";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // validation
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "email is required.";
    if (!password.trim()) newErrors.password = "password is required.";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //

  const { mutate, isPending, data } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/dashboard");
    },
    // onError: (error) => {
    //   console.error("Signup error:", error);
    // },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutate({ email, password });
  };

  return (
    <div className="relative flex size-full items-center justify-center pt-25 md:pt-30">
      <Card className="w-full max-w-[500px] px-4 shadow-none! md:rounded-xl! md:border md:border-gray-200 md:p-8 md:shadow-md!">
        <Typography
          sx={{ fontWeight: "bold", fontSize: "20px", mb: "8px" }}
          component="h1"
          align="center"
        >
          Login
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                label="Email*"
                id="email"
                valuse={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                size="small"
                error={!!errors?.email}
                helperText={errors?.email}
                sx={{ "& .MuiFormHelperText-root": { mx: "1px" } }}
              />

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors?.password}
                helperText={errors?.password}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ fontWeight: "bold", py: "8px" }}
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Log in"}
              </Button>
            </Stack>
          </form>
          <Stack mt={3} alignItems="center">
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary font-medium">
                Sign up
              </a>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
