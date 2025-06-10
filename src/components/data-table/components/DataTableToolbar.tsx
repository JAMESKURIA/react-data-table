// src/components/data-table/components/DataTableToolbar.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { Columns, Download, RefreshCw, Search, X } from "lucide-react";
import * as React from "react";
import { TableFeatures } from "../types";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	features: TableFeatures;
	globalFilter: string;
	onGlobalFilterChange: (value: string) => void;
	onExport?: (format: "csv" | "excel" | "pdf") => void;
}

export function DataTableToolbar<TData>({
	table,
	features,
	globalFilter,
	onGlobalFilterChange,
	onExport,
}: DataTableToolbarProps<TData>) {
	const [searchValue, setSearchValue] = React.useState(globalFilter);

	const searchConfig =
		typeof features.search === "object" ? features.search : {};

	// Fix: Properly handle export formats
	const exportFormats = React.useMemo(() => {
		if (!features.export) return [];
		if (features.export === true) return ["csv", "excel", "pdf"];
		if (Array.isArray(features.export)) return features.export;
		return [];
	}, [features.export]);

	const hasFilters =
		table.getState().columnFilters.length > 0 || globalFilter;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				{features.search && (
					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder={
								searchConfig.placeholder || "Search..."
							}
							value={searchValue}
							onChange={(e) => {
								setSearchValue(e.target.value);
								onGlobalFilterChange(e.target.value);
							}}
							className="h-9 w-[250px] pl-8"
						/>
					</div>
				)}

				{hasFilters && (
					<Button
						variant="ghost"
						onClick={() => {
							table.resetColumnFilters();
							setSearchValue("");
							onGlobalFilterChange("");
						}}
						className="h-9 px-2 lg:px-3"
					>
						Reset
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>

			<div className="flex items-center space-x-2">
				{features.columnVisibility && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="h-9 lg:flex"
							>
								<Columns className="mr-2 h-4 w-4" />
								View
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-[150px]">
							<DropdownMenuLabel>
								Toggle columns
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{table
								.getAllColumns()
								.filter(
									(column) =>
										typeof column.accessorFn !==
											"undefined" && column.getCanHide()
								)
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				)}

				{features.export && exportFormats.length > 0 && onExport && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="h-9">
								<Download className="mr-2 h-4 w-4" />
								Export
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{exportFormats.includes("csv") && (
								<DropdownMenuItem
									onClick={() => onExport("csv")}
								>
									Export as CSV
								</DropdownMenuItem>
							)}
							{exportFormats.includes("excel") && (
								<DropdownMenuItem
									onClick={() => onExport("excel")}
								>
									Export as Excel
								</DropdownMenuItem>
							)}
							{exportFormats.includes("pdf") && (
								<DropdownMenuItem
									onClick={() => onExport("pdf")}
								>
									Export as PDF
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				)}

				{features.refresh && (
					<Button
						variant="outline"
						size="sm"
						className="h-9"
						onClick={() => {
							if (
								typeof features.refresh === "object" &&
								features.refresh.onRefresh
							) {
								features.refresh.onRefresh();
							}
						}}
					>
						<RefreshCw className="h-4 w-4" />
					</Button>
				)}
			</div>
		</div>
	);
}
