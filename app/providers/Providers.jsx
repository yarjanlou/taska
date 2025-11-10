import AuthProvider from "./AuthProvider";
import QueryProvider from "./QueryProvider";

export default function Providres({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
