import StringAvatar from "@/components/ui/StringAvatar";

export default function Header() {
  return (
    <div className="border-b border-gray-200">
      <div className="flex size-full items-center justify-end px-6">
        <div className="flex items-center gap-2">
          <StringAvatar name="name" />
          <span className="text-sm font-medium">name</span>
        </div>
      </div>
    </div>
  );
}
