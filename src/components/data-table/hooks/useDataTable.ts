// src/components/data-table/hooks/useDataTable.ts
import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	RowSelectionState,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { DataTableProps, TableState, UseDataTableReturn } from "../types";
import { exportData } from "../utils/exportUtils";

interface UseDataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData, any>[];
	features?: DataTableProps<TData, any>["features"];
	manualPagination?: boolean;
	manualSorting?: boolean;
	manualFiltering?: boolean;
	pageCount?: number;
	rowCount?: number;
	onStateChange?: (state: TableState) => void;
}

export function useDataTable<TData>({
	data,
	columns,
	features,
	manualPagination = false,
	manualSorting = false,
	manualFiltering = false,
	pageCount: controlledPageCount,
	rowCount: controlledRowCount,
	onStateChange,
}: UseDataTableProps<TData>): UseDataTableReturn<TData> {
	// State
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
		{}
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>(
		typeof features?.sort === "object"
			? features.sort.defaultSort || []
			: []
	);
	const [globalFilter, setGlobalFilter] = React.useState("");
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize:
			typeof features?.pagination === "object"
				? features.pagination.pageSize || 10
				: 10,
	});

	// Create debounced global filter
	const debouncedGlobalFilter = React.useMemo(() => {
		const debounce =
			typeof features?.search === "object"
				? features.search.debounce || 300
				: 300;

		let timeoutId: NodeJS.Timeout;
		return (value: string) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setGlobalFilter(value);
			}, debounce);
		};
	}, [features?.search]);

	// Create table instance
	const table = useReactTable({
		data,
		columns,
		pageCount: controlledPageCount,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			globalFilter,
			pagination,
		},
		enableRowSelection: features?.selection !== false,
		enableMultiRowSelection:
			typeof features?.selection === "object"
				? features.selection.multi !== false
				: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: manualFiltering
			? undefined
			: getFilteredRowModel(),
		getPaginationRowModel: manualPagination
			? undefined
			: getPaginationRowModel(),
		getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		manualPagination,
		manualSorting,
		manualFiltering,
	});

	// Current state
	const state: TableState = {
		pagination,
		sorting,
		filters: columnFilters,
		columnVisibility,
		rowSelection,
		globalFilter,
	};

	// Notify state changes
	React.useEffect(() => {
		onStateChange?.(state);
	}, [
		pagination,
		sorting,
		columnFilters,
		columnVisibility,
		rowSelection,
		globalFilter,
	]);

	// Computed values
	const pageCount = table.getPageCount();
	const rowCount =
		controlledRowCount ?? table.getFilteredRowModel().rows.length;
	const selectedRows = table
		.getFilteredSelectedRowModel()
		.rows.map((row) => row.original);

	// Actions
	const actions = React.useMemo(
		() => ({
			setPage: (page: number) => {
				setPagination((prev) => ({ ...prev, pageIndex: page }));
			},
			setPageSize: (size: number) => {
				setPagination((prev) => ({
					...prev,
					pageSize: size,
					pageIndex: 0,
				}));
			},
			setSort: (columnId: string, desc?: boolean) => {
				if (typeof features?.sort === "object" && features.sort.multi) {
					setSorting((prev) => {
						const existing = prev.find((s) => s.id === columnId);
						if (existing) {
							return prev.map((s) =>
								s.id === columnId
									? { ...s, desc: desc ?? !s.desc }
									: s
							);
						}
						return [...prev, { id: columnId, desc: desc ?? false }];
					});
				} else {
					setSorting([{ id: columnId, desc: desc ?? false }]);
				}
			},
			setFilter: (columnId: string, value: any) => {
				setColumnFilters((prev) => {
					const existing = prev.find((f) => f.id === columnId);
					if (value === undefined || value === null || value === "") {
						return prev.filter((f) => f.id !== columnId);
					}
					if (existing) {
						return prev.map((f) =>
							f.id === columnId ? { ...f, value } : f
						);
					}
					return [...prev, { id: columnId, value }];
				});
			},
			setGlobalFilter: (value: string) => {
				if (
					typeof features?.search === "object" &&
					features.search.debounce
				) {
					debouncedGlobalFilter(value);
				} else {
					setGlobalFilter(value);
				}
			},
			toggleColumnVisibility: (columnId: string) => {
				setColumnVisibility((prev) => ({
					...prev,
					[columnId]: !prev[columnId],
				}));
			},
			selectRow: (rowId: string, selected?: boolean) => {
				setRowSelection((prev) => ({
					...prev,
					[rowId]: selected ?? !prev[rowId],
				}));
			},
			selectAllRows: (selected?: boolean) => {
				if (selected === undefined) {
					table.toggleAllRowsSelected();
				} else {
					table.toggleAllRowsSelected(selected);
				}
			},
			resetFilters: () => {
				setColumnFilters([]);
				setGlobalFilter("");
			},
			resetSort: () => {
				setSorting([]);
			},
			resetSelection: () => {
				setRowSelection({});
			},
			resetAll: () => {
				setColumnFilters([]);
				setGlobalFilter("");
				setSorting([]);
				setRowSelection({});
				setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
			},
			refresh: () => {
				// This would typically trigger a data refetch
				// Implementation depends on data source
			},
		}),
		[features, pagination.pageSize, debouncedGlobalFilter]
	);

	// Export functionality
	const exportTableData = React.useCallback(
		(format: "csv" | "excel" | "pdf") => {
			const dataToExport = table
				.getFilteredRowModel()
				.rows.map((row) => row.original);
			exportData(format, dataToExport, columns, "table-export");
		},
		[table, columns]
	);

	return {
		data: table.getRowModel().rows.map((row) => row.original),
		loading: false,
		error: null,
		state,
		pageCount,
		rowCount,
		selectedRows,
		actions,
		exportData: exportTableData,
		table,
	};
}
