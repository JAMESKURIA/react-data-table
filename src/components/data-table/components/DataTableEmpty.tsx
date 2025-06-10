// src/components/data-table/components/DataTableEmpty.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileX2, LucideIcon } from "lucide-react";
import * as React from "react";

interface DataTableEmptyProps {
	config?:
		| React.ReactNode
		| {
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
		  };
}

export function DataTableEmpty({ config }: DataTableEmptyProps) {
	// If config is a React element, render it directly
	if (React.isValidElement(config)) {
		return <>{config}</>;
	}

	// Otherwise, use the configuration object
	const emptyConfig =
		typeof config === "object" && config !== null ? config : {};
	const Icon = emptyConfig.icon || FileX2;

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center py-10",
				emptyConfig.className
			)}
		>
			<Icon className="h-10 w-10 text-muted-foreground mb-4" />
			<h3 className="text-lg font-semibold">
				{emptyConfig.title || "No results found"}
			</h3>
			<p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">
				{emptyConfig.description ||
					"Try adjusting your search or filter to find what you're looking for."}
			</p>
			{emptyConfig.action && (
				<Button
					variant={emptyConfig.action.variant || "outline"}
					size="sm"
					onClick={emptyConfig.action.onClick}
				>
					{emptyConfig.action.label}
				</Button>
			)}
		</div>
	);
}
