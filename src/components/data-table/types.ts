// src/components/data-table/types.ts
import {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	RowSelectionState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";

// Preset configurations
export type TablePreset = "simple" | "advanced" | "server-side";

// Column helper types
export interface ColumnConfig<TData> {
	key: keyof TData;
	header: string;
	sortable?: boolean;
	searchable?: boolean;
	filterable?: boolean | "select" | "multi-select" | "range";
	format?: "text" | "number" | "currency" | "date" | "datetime" | "boolean";
	align?: "left" | "center" | "right";
	width?: number | string;
	cell?: (value: any, row: TData) => React.ReactNode;
	enableHiding?: boolean;
}

// Feature configuration
export interface TableFeatures {
	search?:
		| boolean
		| {
				placeholder?: string;
				debounce?: number;
				columns?: string[];
		  };
	sort?:
		| boolean
		| {
				multi?: boolean;
				defaultSort?: SortingState;
		  };
	pagination?:
		| boolean
		| {
				pageSize?: number;
				pageSizes?: number[];
				showInfo?: boolean;
		  };
	selection?:
		| boolean
		| {
				multi?: boolean;
				showSelectAll?: boolean;
		  };
	columnVisibility?: boolean;
	filters?:
		| boolean
		| {
				inline?: boolean;
				advanced?: boolean;
		  };
	export?: boolean | ("csv" | "excel" | "pdf")[];
	density?: boolean;
	fullscreen?: boolean;
	refresh?:
		| boolean
		| {
				onRefresh: () => void | Promise<void>;
		  };
}

// Mobile configuration
export interface MobileConfig {
	breakpoint?: number;
	columns?: string[];
	view?: "cards" | "list" | "stacked";
	collapsible?: boolean;
}

// Loading configuration
export interface LoadingConfig {
	rows?: number;
	animate?: boolean;
	showHeaders?: boolean;
}

// Export configuration
export interface ExportConfig {
	formats?: ("csv" | "excel" | "pdf")[];
	filename?: string;
	onExport?: (format: string, data: any[]) => void;
}

// Main DataTable props
export interface DataTableProps<TData, TValue = any> {
	// Core props
	columns: ColumnDef<TData, TValue>[] | ColumnConfig<TData>[];
	data: TData[];

	// Configuration
	preset?: TablePreset;
	features?: TableFeatures;

	// State management
	loading?: boolean;
	error?: Error | null;
	onRetry?: () => void;

	// Customization
	className?: string;
	containerClassName?: string;

	// Mobile
	responsive?: boolean | MobileConfig;

	// Loading & Empty states
	skeleton?: boolean | LoadingConfig;
	emptyState?:
		| React.ReactNode
		| {
				icon?: LucideIcon;
				title?: string;
				description?: string;
				action?: {
					label: string;
					onClick: () => void;
				};
		  };

	// Render props for customization
	renderToolbar?: (table: any) => React.ReactNode;
	renderPagination?: (props: any) => React.ReactNode;
	renderEmpty?: () => React.ReactNode;
	renderError?: (error: Error, retry: () => void) => React.ReactNode;

	// Callbacks
	onStateChange?: (state: TableState) => void;
	onRowClick?: (row: TData) => void;
	onRowDoubleClick?: (row: TData) => void;

	// Server-side support
	manualPagination?: boolean;
	manualSorting?: boolean;
	manualFiltering?: boolean;
	pageCount?: number;
	rowCount?: number;
}

// Table state interface
export interface TableState {
	pagination: PaginationState;
	sorting: SortingState;
	filters: ColumnFiltersState;
	columnVisibility: VisibilityState;
	rowSelection: RowSelectionState;
	globalFilter: string;
}

// Hook return type
export interface UseDataTableReturn<TData> {
	// State
	data: TData[];
	loading: boolean;
	error: Error | null;
	state: TableState;

	// Computed values
	pageCount: number;
	rowCount: number;
	selectedRows: TData[];

	// Actions
	actions: {
		setPage: (page: number) => void;
		setPageSize: (size: number) => void;
		setSort: (column: string, desc?: boolean) => void;
		setFilter: (column: string, value: any) => void;
		setGlobalFilter: (value: string) => void;
		toggleColumnVisibility: (column: string) => void;
		selectRow: (rowId: string, selected?: boolean) => void;
		selectAllRows: (selected?: boolean) => void;
		resetFilters: () => void;
		resetSort: () => void;
		resetSelection: () => void;
		resetAll: () => void;
		refresh: () => void | Promise<void>;
	};

	// Export functionality
	exportData: (format: "csv" | "excel" | "pdf") => void;

	// Table instance (for advanced use cases)
	table: any;
}

// Column action types
export interface ColumnAction<TData> {
	label: string;
	icon?: LucideIcon;
	onClick: (row: TData) => void;
	show?: (row: TData) => boolean;
	variant?: "default" | "destructive";
}

// Filter option type
export interface FilterOption {
	label: string;
	value: string;
	icon?: LucideIcon;
	count?: number;
}
