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
import { type Table } from "@tanstack/react-table";
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
	const exportFormats =
		typeof features.export === "object"
			? features.export
			: ["csv", "excel"];
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

				{features.export && onExport && (
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

// src/components/data-table/components/DataTablePagination.tsx
("use client");

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	features: TableFeatures;
	pageSizes?: number[];
}

export function DataTablePagination<TData>({
	table,
	features,
	pageSizes = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
	const showInfo =
		typeof features.pagination === "object"
			? features.pagination.showInfo !== false
			: true;

	return (
		<div className="flex items-center justify-between px-2">
			{showInfo && (
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
			)}

			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue
								placeholder={
									table.getState().pagination.pageSize
								}
							/>
						</SelectTrigger>
						<SelectContent side="top">
							{pageSizes.map((pageSize) => (
								<SelectItem
									key={pageSize}
									value={`${pageSize}`}
								>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</div>

				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() =>
							table.setPageIndex(table.getPageCount() - 1)
						}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

// src/components/data-table/components/DataTableSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table as FormTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
	columns: number;
	rows: number;
	showHeaders?: boolean;
	animate?: boolean;
}

export function DataTableSkeleton({
	columns,
	rows,
	showHeaders = true,
	animate = true,
}: DataTableSkeletonProps) {
	return (
		<div className="rounded-md border">
			<FormTable>
				{showHeaders && (
					<TableHeader>
						<TableRow>
							{Array.from({ length: columns }).map((_, i) => (
								<TableHead key={i}>
									<Skeleton
										className={`h-6 w-20 ${
											animate ? "animate-pulse" : ""
										}`}
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
								<TableCell key={j}>
									<Skeleton
										className={`h-6 w-full ${
											animate ? "animate-pulse" : ""
										}`}
									/>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</FormTable>
		</div>
	);
}

// src/components/data-table/components/DataTableEmpty.tsx
import { FileX2 } from "lucide-react";

interface DataTableEmptyProps {
	config?:
		| React.ReactNode
		| {
				icon?: any;
				title?: string;
				description?: string;
				action?: {
					label: string;
					onClick: () => void;
				};
		  };
}

export function DataTableEmpty({ config }: DataTableEmptyProps) {
	if (React.isValidElement(config)) {
		return <>{config}</>;
	}

	const emptyConfig =
		typeof config === "object" && config !== null ? config : {};
	const Icon = emptyConfig.icon || FileX2;

	return (
		<div className="flex flex-col items-center justify-center py-10">
			<Icon className="h-10 w-10 text-muted-foreground mb-4" />
			<h3 className="text-lg font-semibold">
				{emptyConfig.title || "No results found"}
			</h3>
			<p className="text-sm text-muted-foreground mb-4">
				{emptyConfig.description ||
					"Try adjusting your search or filter to find what you're looking for."}
			</p>
			{emptyConfig.action && (
				<Button
					variant="outline"
					size="sm"
					onClick={emptyConfig.action.onClick}
				>
					{emptyConfig.action.label}
				</Button>
			)}
		</div>
	);
}
