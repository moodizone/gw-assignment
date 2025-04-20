import { Skeleton } from "@/components/ui/skeleton";

function Fallback() {
  return (
    <div className="p-4 pb-0 flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[240px] rounded-xl mb-4" />
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[180px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[180px]" />
      </div>
    </div>
  );
}

export default Fallback;
