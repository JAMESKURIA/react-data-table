// src/components/data-table/DataTable.tsx
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { AlertCircle } from "lucide-react";
import * as React from "react";
import { DataTableEmpty } from "./components/DataTableEmpty";
import { DataTableMobile } from "./components/DataTableMobile";
import { DataTablePagination } from "./components/DataTablePagination";
import { DataTableSkeleton } from "./components/DataTableSkeleton";
import { DataTableToolbar } from "./components/DataTableToolbar";
import { useDataTable } from "./hooks/useDataTable";
import { ColumnConfig, DataTableProps } from "./types";
import { createColumns } from "./utils/columnHelpers";
import { mergeFeatures } from "./utils/presets";

// Helper to check if columns are ColumnConfig or ColumnDef
function isColumnConfig<TData>(
	columns: ColumnDef<TData, any>[] | ColumnConfig<TData>[]
): columns is ColumnConfig<TData>[] {
	return columns.length > 0 && "key" in columns[0];
}

export function DataTable<TData, TValue = any>({
	columns: rawColumns,
	data,
	preset,
	features: customFeatures,
	loading = false,
	error = null,
	onRetry,
	className,
	containerClassName,
	responsive = true,
	skeleton,
	emptyState,
	renderToolbar,
	renderPagination,
	renderEmpty,
	renderError,
	onStateChange,
	onRowClick,
	onRowDoubleClick,
	manualPagination = false,
	manualSorting = false,
	manualFiltering = false,
	pageCount,
	rowCount,
}: DataTableProps<TData, TValue>) {
	// Convert columns if needed
	const columns = React.useMemo((): ColumnDef<TData, any>[] => {
		if (isColumnConfig(rawColumns as any)) {
			return createColumns(
				rawColumns as ColumnConfig<TData>[]
			) as ColumnDef<TData, any>[];
		}
		return rawColumns as ColumnDef<TData, any>[];
	}, [rawColumns]);

	// Merge features with preset
	const features = React.useMemo(
		() => mergeFeatures(preset, customFeatures),
		[preset, customFeatures]
	);

	// Use the data table hook
	const tableData = useDataTable({
		data,
		columns,
		features,
		manualPagination,
		manualSorting,
		manualFiltering,
		pageCount,
		rowCount,
		onStateChange,
	});

	const { table, state, actions } = tableData;

	// Check if we should show mobile view
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const checkMobile = () => {
			const breakpoint =
				typeof responsive === "object" && responsive.breakpoint
					? responsive.breakpoint
					: 768;
			setIsMobile(window.innerWidth < breakpoint);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, [responsive]);

	// Loading state
	if (loading) {
		const skeletonConfig = typeof skeleton === "object" ? skeleton : {};
		return (
			<div className={containerClassName}>
				<DataTableSkeleton
					columns={columns.length}
					rows={skeletonConfig.rows || 5}
					showHeaders={skeletonConfig.showHeaders !== false}
					animate={skeletonConfig.animate !== false}
				/>
			</div>
		);
	}

	// Error state
	if (error) {
		if (renderError) {
			return <>{renderError(error, onRetry || (() => {}))}</>;
		}

		return (
			<div className={containerClassName}>
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription className="flex items-center justify-between">
						<span>
							{error.message ||
								"An error occurred while loading the data."}
						</span>
						{onRetry && (
							<Button
								variant="outline"
								size="sm"
								onClick={onRetry}
								className="ml-4"
							>
								Retry
							</Button>
						)}
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	// Mobile view
	if (isMobile && responsive) {
		return (
			<div className={containerClassName}>
				<DataTableMobile
					table={table}
					columns={columns as ColumnDef<TData>[]}
					data={data}
					features={features}
					config={typeof responsive === "object" ? responsive : {}}
					onRowClick={onRowClick}
				/>
			</div>
		);
	}

	// Empty state
	const isEmpty = table.getRowModel().rows.length === 0;

	return (
		<div className={cn("space-y-4", containerClassName)}>
			{/* Toolbar */}
			{features.search ||
			features.filters ||
			features.columnVisibility ||
			features.export ? (
				renderToolbar ? (
					renderToolbar(table)
				) : (
					<DataTableToolbar
						table={table}
						features={features}
						globalFilter={state.globalFilter}
						onGlobalFilterChange={actions.setGlobalFilter}
						onExport={tableData.exportData}
					/>
				)
			) : null}

			{/* Table */}
			<div className="rounded-md border">
				<Table className={className}>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup: any) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header: any) => {
									const meta = header.column.columnDef
										.meta as any;
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											style={{
												width: meta?.width,
												textAlign: meta?.align,
											}}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isEmpty ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									{renderEmpty ? (
										renderEmpty()
									) : (
										<DataTableEmpty config={emptyState} />
									)}
								</TableCell>
							</TableRow>
						) : (
							table.getRowModel().rows.map((row: any) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
									onClick={() => onRowClick?.(row.original)}
									onDoubleClick={() =>
										onRowDoubleClick?.(row.original)
									}
									className={cn(
										onRowClick &&
											"cursor-pointer hover:bg-muted/50",
										row.getIsSelected() && "bg-muted"
									)}
								>
									{row.getVisibleCells().map((cell: any) => {
										const meta = cell.column.columnDef
											.meta as any;
										return (
											<TableCell
												key={cell.id}
												style={{
													textAlign: meta?.align,
												}}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										);
									})}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			{features.pagination && !isEmpty ? (
				renderPagination ? (
					renderPagination({
						pageIndex: state.pagination.pageIndex,
						pageSize: state.pagination.pageSize,
						pageCount: tableData.pageCount,
						canPreviousPage: table.getCanPreviousPage(),
						canNextPage: table.getCanNextPage(),
						previousPage: () => table.previousPage(),
						nextPage: () => table.nextPage(),
						setPageIndex: actions.setPage,
						setPageSize: actions.setPageSize,
					})
				) : (
					<DataTablePagination
						table={table}
						features={features}
						pageSizes={
							typeof features.pagination === "object"
								? features.pagination.pageSizes
								: undefined
						}
					/>
				)
			) : null}
		</div>
	);
}
