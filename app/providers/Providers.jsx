import { ThemeProvider } from "@mui/material";
import AuthProvider from "./AuthProvider";
import QueryProvider from "./QueryProvider";
import { theme } from "./ThemeProvider";

export default function Providers({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
