import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

export default function PasswordInput({
  value,
  onChange,
  error = null,
  helperText = "",
}) {
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

  return (
    <FormControl
      variant="outlined"
      size="small"
      required
      fullWidth
      sx={{
        "& .MuiInputLabel-root": {
          fontSize: "14px",
        },
        "& .MuiOutlinedInput-input": {
          fontSize: { sm: "14px", md: "15px" },
        },
        "& .MuiFormHelperText-root": {
          mx: "1px",
        },
      }}
      error={error}
    >
      <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput
        id="password"
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
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
      {error && (
        <FormHelperText sx={{ mx: "1px" }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
