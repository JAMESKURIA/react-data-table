// src/components/data-table/components/DataTableMobile.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ColumnDef, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as React from "react";
import { MobileConfig, TableFeatures } from "../types";

interface DataTableMobileProps<TData> {
	table: Table<TData>;
	columns: ColumnDef<TData, any>[];
	data: TData[];
	features: TableFeatures;
	config: MobileConfig;
	onRowClick?: (row: TData) => void;
}

export function DataTableMobile<TData>({
	table,
	columns,
	data,
	features,
	config,
	onRowClick,
}: DataTableMobileProps<TData>) {
	const [expandedRows, setExpandedRows] = React.useState<Set<string>>(
		new Set()
	);

	const view = config.view || "cards";
	const mobileColumns = config.columns || [];

	// Filter columns for mobile view
	const visibleColumns =
		mobileColumns.length > 0
			? columns.filter(
					(col) =>
						col.id &&
						(mobileColumns.includes(col.id) ||
							col.id === "select" ||
							col.id === "actions")
			  )
			: columns.slice(0, 3); // Show first 3 columns by default

	const hiddenColumns = columns.filter(
		(col) => !visibleColumns.includes(col)
	);

	const toggleRow = (rowId: string) => {
		setExpandedRows((prev) => {
			const next = new Set(prev);
			if (next.has(rowId)) {
				next.delete(rowId);
			} else {
				next.add(rowId);
			}
			return next;
		});
	};

	if (view === "cards") {
		return (
			<div className="space-y-4">
				{table.getRowModel().rows.map((row) => {
					const isExpanded = expandedRows.has(row.id);

					return (
						<Card
							key={row.id}
							className={cn(
								"transition-colors",
								onRowClick &&
									"cursor-pointer hover:bg-muted/50",
								row.getIsSelected() && "border-primary"
							)}
							onClick={() => onRowClick?.(row.original)}
						>
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="space-y-1 flex-1">
										{visibleColumns.map((column) => {
											if (
												column.id === "select" ||
												column.id === "actions"
											)
												return null;

											const cell = row
												.getAllCells()
												.find(
													(c) =>
														c.column.id ===
														column.id
												);
											if (!cell) return null;

											return (
												<div
													key={column.id}
													className="flex items-center space-x-2"
												>
													<span className="text-sm font-medium text-muted-foreground">
														{typeof column.header ===
														"string"
															? column.header
															: column.id}
														:
													</span>
													<span className="text-sm">
														{flexRender(
															cell.column
																.columnDef.cell,
															cell.getContext()
														)}
													</span>
												</div>
											);
										})}
									</div>

									<div className="flex items-center space-x-2">
										{/* Select checkbox */}
										{features.selection && (
											<div
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												{row
													.getAllCells()
													.find(
														(c) =>
															c.column.id ===
															"select"
													) &&
													flexRender(
														columns.find(
															(c) =>
																c.id ===
																"select"
														)?.cell,
														row
															.getAllCells()
															.find(
																(c) =>
																	c.column
																		.id ===
																	"select"
															)!
															.getContext()
													)}
											</div>
										)}

										{/* Actions */}
										{row
											.getAllCells()
											.find(
												(c) => c.column.id === "actions"
											) && (
											<div
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												{flexRender(
													columns.find(
														(c) =>
															c.id === "actions"
													)?.cell,
													row
														.getAllCells()
														.find(
															(c) =>
																c.column.id ===
																"actions"
														)!
														.getContext()
												)}
											</div>
										)}

										{/* Expand button */}
										{config.collapsible !== false &&
											hiddenColumns.length > 0 && (
												<Button
													variant="ghost"
													size="sm"
													className="h-8 w-8 p-0"
													onClick={(e) => {
														e.stopPropagation();
														toggleRow(row.id);
													}}
												>
													{isExpanded ? (
														<ChevronDown className="h-4 w-4" />
													) : (
														<ChevronRight className="h-4 w-4" />
													)}
												</Button>
											)}
									</div>
								</div>
							</CardHeader>

							{isExpanded && hiddenColumns.length > 0 && (
								<CardContent className="pt-0">
									<div className="space-y-2 border-t pt-3">
										{hiddenColumns.map((column) => {
											if (
												column.id === "select" ||
												column.id === "actions"
											)
												return null;

											const cell = row
												.getAllCells()
												.find(
													(c) =>
														c.column.id ===
														column.id
												);
											if (!cell) return null;

											return (
												<div
													key={column.id}
													className="flex justify-between text-sm"
												>
													<span className="font-medium text-muted-foreground">
														{typeof column.header ===
														"string"
															? column.header
															: column.id}
														:
													</span>
													<span>
														{flexRender(
															cell.column
																.columnDef.cell,
															cell.getContext()
														)}
													</span>
												</div>
											);
										})}
									</div>
								</CardContent>
							)}
						</Card>
					);
				})}

				{/* Mobile Pagination */}
				{features.pagination && (
					<div className="flex items-center justify-between">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<span className="text-sm text-muted-foreground">
							Page {table.getState().pagination.pageIndex + 1} of{" "}
							{table.getPageCount()}
						</span>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				)}
			</div>
		);
	}

	// List view
	if (view === "list") {
		return (
			<div className="space-y-2">
				{table.getRowModel().rows.map((row) => (
					<div
						key={row.id}
						className={cn(
							"flex items-center justify-between p-4 border rounded-lg transition-colors",
							onRowClick && "cursor-pointer hover:bg-muted/50",
							row.getIsSelected() && "border-primary"
						)}
						onClick={() => onRowClick?.(row.original)}
					>
						<div className="flex-1 space-y-1">
							{visibleColumns.map((column) => {
								if (
									column.id === "select" ||
									column.id === "actions"
								)
									return null;

								const cell = row
									.getAllCells()
									.find((c) => c.column.id === column.id);
								if (!cell) return null;

								return (
									<div key={column.id} className="text-sm">
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</div>
								);
							})}
						</div>

						<div className="flex items-center space-x-2">
							{features.selection && (
								<div onClick={(e) => e.stopPropagation()}>
									{row
										.getAllCells()
										.find(
											(c) => c.column.id === "select"
										) &&
										flexRender(
											columns.find(
												(c) => c.id === "select"
											)?.cell,
											row
												.getAllCells()
												.find(
													(c) =>
														c.column.id === "select"
												)!
												.getContext()
										)}
								</div>
							)}

							{row
								.getAllCells()
								.find((c) => c.column.id === "actions") && (
								<div onClick={(e) => e.stopPropagation()}>
									{flexRender(
										columns.find((c) => c.id === "actions")
											?.cell,
										row
											.getAllCells()
											.find(
												(c) => c.column.id === "actions"
											)!
											.getContext()
									)}
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		);
	}

	// Stacked view (default)
	return (
		<div className="space-y-4">
			{table.getRowModel().rows.map((row) => (
				<div
					key={row.id}
					className={cn(
						"space-y-3 p-4 border rounded-lg",
						onRowClick && "cursor-pointer hover:bg-muted/50",
						row.getIsSelected() && "border-primary"
					)}
					onClick={() => onRowClick?.(row.original)}
				>
					{columns.map((column) => {
						if (column.id === "select" || column.id === "actions")
							return null;

						const cell = row
							.getAllCells()
							.find((c) => c.column.id === column.id);
						if (!cell) return null;

						return (
							<div
								key={column.id}
								className="flex flex-col space-y-1"
							>
								<span className="text-xs font-medium text-muted-foreground">
									{typeof column.header === "string"
										? column.header
										: column.id}
								</span>
								<span className="text-sm">
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</span>
							</div>
						);
					})}

					{(features.selection ||
						row
							.getAllCells()
							.find((c) => c.column.id === "actions")) && (
						<div className="flex items-center justify-end space-x-2 pt-2 border-t">
							{features.selection && (
								<div onClick={(e) => e.stopPropagation()}>
									{row
										.getAllCells()
										.find(
											(c) => c.column.id === "select"
										) &&
										flexRender(
											columns.find(
												(c) => c.id === "select"
											)?.cell,
											row
												.getAllCells()
												.find(
													(c) =>
														c.column.id === "select"
												)!
												.getContext()
										)}
								</div>
							)}

							{row
								.getAllCells()
								.find((c) => c.column.id === "actions") && (
								<div onClick={(e) => e.stopPropagation()}>
									{flexRender(
										columns.find((c) => c.id === "actions")
											?.cell,
										row
											.getAllCells()
											.find(
												(c) => c.column.id === "actions"
											)!
											.getContext()
									)}
								</div>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
