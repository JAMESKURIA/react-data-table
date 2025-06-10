// src/components/data-table/components/DataTableEmpty.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileX2, LucideIcon } from "lucide-react";
import * as React from "react";

interface EmptyStateConfig {
	icon?: LucideIcon;
	title?: string;
	description?: string;
	action?: {
		label: string;
		onClick: () => void;
		variant?:
			| "default"
			| "outline"
			| "secondary"
			| "ghost"
			| "link"
			| "destructive";
	};
	className?: string;
}

interface DataTableEmptyProps {
	config?: React.ReactNode | EmptyStateConfig;
}

// Type guard to check if config is EmptyStateConfig
function isEmptyStateConfig(config: any): config is EmptyStateConfig {
	return (
		config &&
		typeof config === "object" &&
		!React.isValidElement(config) &&
		!Array.isArray(config)
	);
}

export function DataTableEmpty({ config }: DataTableEmptyProps) {
	// If config is a React element, render it directly
	if (React.isValidElement(config)) {
		return <>{config}</>;
	}

	// Use type guard to safely access properties
	if (isEmptyStateConfig(config)) {
		const Icon = config.icon || FileX2;

		return (
			<div
				className={cn(
					"flex flex-col items-center justify-center py-10",
					config.className
				)}
			>
				<Icon className="h-10 w-10 text-muted-foreground mb-4" />
				<h3 className="text-lg font-semibold">
					{config.title || "No results found"}
				</h3>
				<p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">
					{config.description ||
						"Try adjusting your search or filter to find what you're looking for."}
				</p>
				{config.action && (
					<Button
						variant={config.action.variant || "outline"}
						size="sm"
						onClick={config.action.onClick}
					>
						{config.action.label}
					</Button>
				)}
			</div>
		);
	}

	// Default empty state if no config or config is not recognized
	return (
		<div className="flex flex-col items-center justify-center py-10">
			<FileX2 className="h-10 w-10 text-muted-foreground mb-4" />
			<h3 className="text-lg font-semibold">No results found</h3>
			<p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">
				Try adjusting your search or filter to find what you're looking
				for.
			</p>
		</div>
	);
}
