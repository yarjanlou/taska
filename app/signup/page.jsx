"use client";

import PasswordInput from "@/components/ui/PasswordInput";
import { signup } from "@/lib/services/auth";
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

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // validation
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "email is required.";
    if (!name.trim()) newErrors.name = "name is required.";
    if (!password.trim()) newErrors.password = "password is required.";
    else if (password.length < 8)
      newErrors.password = "password must be at least 8 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //

  const { mutate, isPending, data } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutate({ email, password, name });
  };

  return (
    <div className="relative flex size-full items-center justify-center pt-25 md:pt-40">
      <Card className="w-full max-w-[500px] px-4 shadow-none! md:rounded-xl! md:border md:border-gray-200 md:p-8 md:shadow-md!">
        <Typography
          sx={{ fontWeight: "bold", fontSize: "20px", mb: "8px" }}
          component="h1"
          align="center"
        >
          Sign up
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                label="Email"
                size="small"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => {
                    return { ...prev, email: "" };
                  });
                }}
                error={!!errors?.email}
                helperText={errors?.email}
                sx={{
                  "& .MuiFormHelperText-root": { mx: "1px" },
                  "& .MuiInputBase-input": {
                    fontSize: { sm: "14px", md: "15px" },
                  },
                }}
                inputProps={{ "data-testid": "email-input" }}
                FormHelperTextProps={{ "data-testid": "email-error" }}
              />

              <TextField
                variant="outlined"
                label="Name"
                size="small"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => {
                    return { ...prev, name: "" };
                  });
                }}
                error={!!errors?.name}
                helperText={errors?.name}
                sx={{
                  "& .MuiFormHelperText-root": { mx: "1px" },
                  "& .MuiInputBase-input": {
                    fontSize: { sm: "14px", md: "15px" },
                  },
                }}
                inputProps={{ "data-testid": "name-input" }}
                FormHelperTextProps={{ "data-testid": "name-error" }}
              />

              <PasswordInput
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => {
                    return {
                      ...prev,
                      password: e.target.value.length >= 8 ? "" : prev.password,
                    };
                  });
                }}
                error={!!errors?.password}
                helperText={errors?.password}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ fontWeight: "bold", py: "8px" }}
                disabled={isPending}
              >
                {isPending ? "Signing up..." : "Sign up"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
