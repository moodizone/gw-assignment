import { Skeleton } from "@/components/ui/skeleton";

function Fallback() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="flex flex-nowrap gap-3">
        <Skeleton className="h-12 md:h-20 w-[25%]" />
        <Skeleton className="h-12 md:h-20 w-[25%]" />
        <Skeleton className="h-12 md:h-20 w-[25%]" />
        <Skeleton className="h-12 md:h-20 w-[25%]" />
      </div>
      <div className="flex flex-nowrap gap-3">
        <Skeleton className="h-12 md:h-20 w-[25%]" />
        <Skeleton className="h-12 md:h-20 w-[25%]" />
        <Skeleton className="h-12 md:h-20 w-[25%]" />
        <Skeleton className="h-12 md:h-20 w-[25%]" />
      </div>
      <div className="flex flex-nowrap gap-3">
        <Skeleton className="h-12 md:h-20 w-[25%]" />
        <Skeleton className="h-12 md:h-20 w-[25%]" />
        <Skeleton className="h-12 md:h-20 w-[25%]" />
        <Skeleton className="h-12 md:h-20 w-[25%]" />
      </div>
    </div>
  );
}

export default Fallback;
