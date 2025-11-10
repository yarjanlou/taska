export default function Loading({ alinment = "center", size = "size-2.5" }) {
  return (
    <div
      className={`flex w-full items-center justify-center space-x-2 py-1.5 ${alinment === "start" ? "justify-start" : ""}`}
    >
      <span
        className={`animate-first-dot bg-primary size-2.5 rounded-full ${size}`}
      />
      <span
        className={`animate-second-dot bg-primary size-2.5 rounded-full ${size}`}
      />
      <span
        className={`animate-third-dot bg-primary size-2.5 rounded-full ${size}`}
      />
    </div>
  );
}
