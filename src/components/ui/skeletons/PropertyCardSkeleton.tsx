import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export default function PropertyCardSkeleton({
	isLoaded,
}: {
	isLoaded: boolean;
}) {
	return (
		<Card className="w-full space-y-5 rounded-lg">
			<Skeleton isLoaded={isLoaded} className="rounded-lg">
				<div className="h-[240px] rounded-lg bg-default-100"></div>
			</Skeleton>
			<div className="space-y-2 p-3 sm:p-4">
				<Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
					<div className="h-3 w-3/5 rounded-lg bg-default-100"></div>
				</Skeleton>
				<Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
					<div className="h-3 w-4/5 rounded-lg bg-default-100" />
				</Skeleton>
				<Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
					<div className="h-3 w-4/5 rounded-lg bg-default-100" />
				</Skeleton>
				<Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
					<div className="h-3 w-1/5 rounded-lg bg-default-100"></div>
				</Skeleton>
			</div>
		</Card>
	);
}
