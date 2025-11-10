import AuthGuard from "@/components/AuthGuard";
import UserDashboard from "./sections/UserDashboard";

export default function DashboardPage() {
  return (
    <div>
      <AuthGuard>
        <UserDashboard />
      </AuthGuard>
    </div>
  );
}
