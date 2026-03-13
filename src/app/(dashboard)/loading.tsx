import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardRootLoading() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-28 w-full rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
