import StringAvatar from "@/components/ui/StringAvatar";
import { pb } from "@/lib/pocketbase";

export default function Header() {
  const userName = pb.authStore?.record.name;

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex size-full items-center justify-end px-6">
        <div className="flex items-center gap-2">
          <StringAvatar name={userName} />
          <span className="text-[13px] font-medium capitalize">{userName}</span>
        </div>
      </div>
    </div>
  );
}
