import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  show: boolean;
  blur?: boolean;
  transparent?: boolean;
};

export function Mask({
  show,
  blur = false,
  transparent = false,
}: Props) {
  if (!show) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center",
        blur ? "backdrop-blur-[2px]" : "",
        transparent ? "bg-black/30" : "bg-background/80"
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}
