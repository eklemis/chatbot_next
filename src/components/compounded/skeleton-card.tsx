import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-[115px] w-[150px] rounded" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[150px]" />
				<Skeleton className="h-4 w-[100px]" />
			</div>
		</div>
	);
}
