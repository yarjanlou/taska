import { pb } from "@/lib/pocketbase";
import StringAvatar from "./StringAvatar";

export default function UserInfo() {
  const userName = pb.authStore?.record.name;
  return (
    <div className="flex items-center gap-2 lg:mb-0">
      <StringAvatar name={userName} />
      <span className="text-xs font-medium capitalize lg:text-[13px]">
        {userName}
      </span>
    </div>
  );
}
