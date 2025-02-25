import { IDGenerator } from "@/components/id-generator";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        "grid grid-rows-[20px_1fr_20px]",
        "items-center justify-items-center font-[family-name:var(--font-geist-sans)]",
        "p-1 pb-2",
        "sm:p-20",
        "lg:min-h-screen lg:pb-20 lg:p-8 lg:gap-16"
      )}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <IDGenerator />
      </main>
    </div>
  );
}
