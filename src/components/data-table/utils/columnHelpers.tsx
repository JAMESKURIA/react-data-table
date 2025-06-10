// src/components/data-table/utils/columnHelpers.ts
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnAction, ColumnConfig } from "../types";

// Format functions
const formatters = {
	text: (value: any) => String(value || ""),
	number: (value: any) => {
		const num = parseFloat(value);
		return isNaN(num) ? "" : num.toLocaleString();
	},
	currency: (value: any, currency = "USD") => {
		const num = parseFloat(value);
		return isNaN(num)
			? ""
			: new Intl.NumberFormat("en-US", {
					style: "currency",
					currency,
			  }).format(num);
	},
	date: (value: any) => {
		const date = new Date(value);
		return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
	},
	datetime: (value: any) => {
		const date = new Date(value);
		return isNaN(date.getTime()) ? "" : date.toLocaleString();
	},
	boolean: (value: any) => {
		return value ? "Yes" : "No";
	},
};

// Main column creation function
export function createColumns<TData>(
	configs: ColumnConfig<TData>[]
): ColumnDef<TData, any>[] {
	return configs.map((config) => {
		const column: ColumnDef<TData, any> = {
			id: String(config.key),
			accessorKey: config.key as string,
			header:
				config.sortable !== false
					? ({ column }) => (
							<Button
								variant="ghost"
								onClick={() =>
									column.toggleSorting(
										column.getIsSorted() === "asc"
									)
								}
								className="-ml-3 h-8 text-left justify-start"
							>
								{config.header}
								{config.sortable && (
									<ArrowUpDown className="ml-2 h-4 w-4" />
								)}
							</Button>
					  )
					: config.header,
			cell: ({ row, getValue }) => {
				const value = getValue();

				// Custom cell renderer
				if (config.cell) {
					return config.cell(value, row.original);
				}

				// Format based on type
				if (config.format && config.format in formatters) {
					return formatters[config.format](value);
				}

				return value;
			},
			enableSorting: config.sortable !== false,
			enableHiding: config.enableHiding !== false,
		};

		// Add alignment
		if (config.align) {
			column.meta = { align: config.align };
		}

		// Add width
		if (config.width) {
			column.size =
				typeof config.width === "number" ? config.width : undefined;
			column.meta = { ...column.meta, width: config.width };
		}

		return column;
	});
}

// Preset column creators
export const columnHelpers = {
	// Selection column
	select: <TData,>(): ColumnDef<TData, any> => ({
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
		size: 40,
	}),

	// Text column
	text: <TData,>(
		key: keyof TData,
		options: Partial<ColumnConfig<TData>> = {}
	): ColumnDef<TData, any> => ({
		accessorKey: key as string,
		header: options.header || String(key),
		enableSorting: options.sortable !== false,
		enableHiding: options.enableHiding !== false,
		cell: options.cell
			? ({ row, getValue }) => options.cell!(getValue(), row.original)
			: ({ getValue }) => getValue(),
	}),

	// Number column
	number: <TData,>(
		key: keyof TData,
		options: Partial<ColumnConfig<TData>> = {}
	): ColumnDef<TData, any> => ({
		accessorKey: key as string,
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
				className="-ml-3 h-8 text-left justify-start"
			>
				{options.header || String(key)}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ getValue }) => {
			const value = getValue() as number;
			return formatters.number(value);
		},
		meta: { align: "right" },
	}),

	// Currency column
	currency: <TData,>(
		key: keyof TData,
		options: Partial<ColumnConfig<TData>> & { currency?: string } = {}
	): ColumnDef<TData, any> => ({
		accessorKey: key as string,
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
				className="-ml-3 h-8 text-left justify-start"
			>
				{options.header || String(key)}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ getValue }) => {
			const value = getValue() as number;
			return formatters.currency(value, options.currency);
		},
		meta: { align: "right" },
	}),

	// Date column
	date: <TData,>(
		key: keyof TData,
		options: Partial<ColumnConfig<TData>> = {}
	): ColumnDef<TData, any> => ({
		accessorKey: key as string,
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
				className="-ml-3 h-8 text-left justify-start"
			>
				{options.header || String(key)}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ getValue }) => {
			const value = getValue();
			return formatters.date(value);
		},
	}),

	// Status/Badge column
	status: <TData,>(
		key: keyof TData,
		options: Partial<ColumnConfig<TData>> & {
			variants?: Record<
				string,
				| "default"
				| "secondary"
				| "destructive"
				| "outline"
				| "success"
				| "warning"
			>;
		} = {}
	): ColumnDef<TData, any> => ({
		accessorKey: key as string,
		header: options.header || String(key),
		cell: ({ getValue }) => {
			const value = String(getValue());
			const variant = (options.variants?.[value] || "default") as
				| "default"
				| "secondary"
				| "destructive"
				| "outline"
				| "success"
				| "warning";
			return <Badge variant={variant}>{value}</Badge>;
		},
	}),

	// Actions column
	actions: <TData,>(
		actions: ColumnAction<TData>[],
		options: { header?: string } = {}
	): ColumnDef<TData, any> => ({
		id: "actions",
		header: options.header || "",
		cell: ({ row }) => {
			const visibleActions = actions.filter(
				(action) => !action.show || action.show(row.original)
			);

			if (visibleActions.length === 0) return null;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{visibleActions.map((action, index) => (
							<DropdownMenuItem
								key={index}
								onClick={() => action.onClick(row.original)}
								className={
									action.variant === "destructive"
										? "text-red-600"
										: ""
								}
							>
								{action.icon && (
									<action.icon className="mr-2 h-4 w-4" />
								)}
								{action.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		enableSorting: false,
		enableHiding: false,
		size: 40,
	}),

	// Custom column
	custom: <TData,>(
		id: string,
		renderer: (row: TData) => React.ReactNode,
		options: { header?: string; size?: number } = {}
	): ColumnDef<TData, any> => ({
		id,
		header: options.header || "",
		cell: ({ row }) => renderer(row.original),
		enableSorting: false,
		size: options.size,
	}),
};

// Helper to merge column definitions
export function mergeColumns<TData>(
	...columnSets: ColumnDef<TData, any>[][]
): ColumnDef<TData, any>[] {
	return columnSets.flat();
}
