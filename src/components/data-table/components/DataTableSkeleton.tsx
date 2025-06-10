// src/components/data-table/components/DataTableSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableSkeletonProps {
	columns?: number;
	rows?: number;
	showHeaders?: boolean;
	animate?: boolean;
	className?: string;
	cellClassName?: string;
	headerClassName?: string;
}

export function DataTableSkeleton({
	columns = 5,
	rows = 5,
	showHeaders = true,
	animate = true,
	className,
	cellClassName,
	headerClassName,
}: DataTableSkeletonProps) {
	return (
		<div className={cn("rounded-md border", className)}>
			<Table>
				{showHeaders && (
					<TableHeader>
						<TableRow>
							{Array.from({ length: columns }).map((_, i) => (
								<TableHead key={i} className={headerClassName}>
									<Skeleton
										className={cn(
											"h-6 w-20",
											animate && "animate-pulse"
										)}
									/>
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
				)}
				<TableBody>
					{Array.from({ length: rows }).map((_, i) => (
						<TableRow key={i}>
							{Array.from({ length: columns }).map((_, j) => (
								<TableCell key={j} className={cellClassName}>
									<Skeleton
										className={cn(
											"h-6",
											j === 0 ? "w-32" : "w-full", // First column slightly narrower
											animate && "animate-pulse"
										)}
									/>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

// Alternative skeleton with more customization
export function DataTableSkeletonCard({
	rows = 3,
	animate = true,
	className,
}: {
	rows?: number;
	animate?: boolean;
	className?: string;
}) {
	return (
		<div className={cn("space-y-4", className)}>
			{Array.from({ length: rows }).map((_, i) => (
				<div key={i} className="rounded-lg border p-4 space-y-3">
					<div className="flex items-center justify-between">
						<Skeleton
							className={cn(
								"h-5 w-32",
								animate && "animate-pulse"
							)}
						/>
						<Skeleton
							className={cn(
								"h-8 w-8 rounded",
								animate && "animate-pulse"
							)}
						/>
					</div>
					<div className="space-y-2">
						<Skeleton
							className={cn(
								"h-4 w-full",
								animate && "animate-pulse"
							)}
						/>
						<Skeleton
							className={cn(
								"h-4 w-3/4",
								animate && "animate-pulse"
							)}
						/>
					</div>
				</div>
			))}
		</div>
	);
}

// Skeleton specifically for mobile list view
export function DataTableSkeletonList({
	rows = 5,
	animate = true,
	className,
}: {
	rows?: number;
	animate?: boolean;
	className?: string;
}) {
	return (
		<div className={cn("space-y-2", className)}>
			{Array.from({ length: rows }).map((_, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-4 border rounded-lg"
				>
					<div className="flex-1 space-y-2">
						<Skeleton
							className={cn(
								"h-4 w-24",
								animate && "animate-pulse"
							)}
						/>
						<Skeleton
							className={cn(
								"h-3 w-32",
								animate && "animate-pulse"
							)}
						/>
					</div>
					<Skeleton
						className={cn("h-8 w-16", animate && "animate-pulse")}
					/>
				</div>
			))}
		</div>
	);
}
