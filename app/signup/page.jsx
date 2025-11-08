"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useActionState, useState } from "react";
import { signupAction } from "../actions/auth";
import { useFormStatus } from "react-dom";

export default function SignupPage() {
  // password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  //

  const [state, formAction] = useActionState(signupAction, {
    success: false,
    errors: null,
    user: null,
    message: "",
  });

  return (
    <div className="relative flex size-full items-center justify-center pt-25 md:pt-30">
      <Card className="w-full max-w-[500px] px-4 shadow-none! md:rounded-xl! md:border md:border-gray-200 md:p-8 md:shadow-md!">
        <Typography
          sx={{ fontWeight: "bold", fontSize: "20px", mb: "8px" }}
          component="h1"
          align="center"
        >
          Sign up
        </Typography>
        <CardContent>
          <form action={formAction} method="POST">
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                label="Email*"
                name="email"
                id="email"
                size="small"
                error={!!state.errors?.email}
                helperText={state.errors?.email}
                sx={{ "& .MuiFormHelperText-root": { mx: "1px" } }}
              />

              <TextField
                variant="outlined"
                label="Name*"
                name="name"
                size="small"
                error={!!state.errors?.name}
                helperText={state.errors?.name}
                sx={{ "& .MuiFormHelperText-root": { mx: "1px" } }}
              />

              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                error={!!state.errors?.password}
              >
                <InputLabel htmlFor="password">Password*</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        sx={{ width: "33px", height: "33px" }}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: "1.3rem" }} />
                        ) : (
                          <Visibility sx={{ fontSize: "1.3rem" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password*"
                />
                {state.errors?.password && (
                  <FormHelperText sx={{ mx: "1px" }}>
                    {state.errors?.password}
                  </FormHelperText>
                )}
              </FormControl>
              <Submit />
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{ fontWeight: "bold", py: "8px" }}
      disabled={pending}
    >
      {pending ? "Signing up..." : "Sign up"}
    </Button>
  );
}
