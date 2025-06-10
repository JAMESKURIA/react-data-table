import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef, SortingState, PaginationState, ColumnFiltersState, VisibilityState, RowSelectionState } from '@tanstack/react-table';
export { ColumnDef, Row, Table } from '@tanstack/react-table';
import { LucideIcon } from 'lucide-react';

type TablePreset = "simple" | "advanced" | "server-side";
interface ColumnConfig<TData> {
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
interface TableFeatures {
    search?: boolean | {
        placeholder?: string;
        debounce?: number;
        columns?: string[];
    };
    sort?: boolean | {
        multi?: boolean;
        defaultSort?: SortingState;
    };
    pagination?: boolean | {
        pageSize?: number;
        pageSizes?: number[];
        showInfo?: boolean;
    };
    selection?: boolean | {
        multi?: boolean;
        showSelectAll?: boolean;
    };
    columnVisibility?: boolean;
    filters?: boolean | {
        inline?: boolean;
        advanced?: boolean;
    };
    export?: boolean | ("csv" | "excel" | "pdf")[];
    density?: boolean;
    fullscreen?: boolean;
    refresh?: boolean | {
        onRefresh: () => void | Promise<void>;
    };
}
interface MobileConfig {
    breakpoint?: number;
    columns?: string[];
    view?: "cards" | "list" | "stacked";
    collapsible?: boolean;
}
interface LoadingConfig {
    rows?: number;
    animate?: boolean;
    showHeaders?: boolean;
}
interface ExportConfig {
    formats?: ("csv" | "excel" | "pdf")[];
    filename?: string;
    onExport?: (format: string, data: any[]) => void;
}
interface DataTableProps<TData, TValue = any> {
    columns: ColumnDef<TData, TValue>[] | ColumnConfig<TData>[];
    data: TData[];
    preset?: TablePreset;
    features?: TableFeatures;
    loading?: boolean;
    error?: Error | null;
    onRetry?: () => void;
    className?: string;
    containerClassName?: string;
    responsive?: boolean | MobileConfig;
    skeleton?: boolean | LoadingConfig;
    emptyState?: React.ReactNode | {
        icon?: LucideIcon;
        title?: string;
        description?: string;
        action?: {
            label: string;
            onClick: () => void;
        };
    };
    renderToolbar?: (table: any) => React.ReactNode;
    renderPagination?: (props: any) => React.ReactNode;
    renderEmpty?: () => React.ReactNode;
    renderError?: (error: Error, retry: () => void) => React.ReactNode;
    onStateChange?: (state: TableState) => void;
    onRowClick?: (row: TData) => void;
    onRowDoubleClick?: (row: TData) => void;
    manualPagination?: boolean;
    manualSorting?: boolean;
    manualFiltering?: boolean;
    pageCount?: number;
    rowCount?: number;
}
interface TableState {
    pagination: PaginationState;
    sorting: SortingState;
    filters: ColumnFiltersState;
    columnVisibility: VisibilityState;
    rowSelection: RowSelectionState;
    globalFilter: string;
}
interface UseDataTableReturn<TData> {
    data: TData[];
    loading: boolean;
    error: Error | null;
    state: TableState;
    pageCount: number;
    rowCount: number;
    selectedRows: TData[];
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
    exportData: (format: "csv" | "excel" | "pdf") => void;
    table: any;
}
interface ColumnAction<TData> {
    label: string;
    icon?: LucideIcon;
    onClick: (row: TData) => void;
    show?: (row: TData) => boolean;
    variant?: "default" | "destructive";
}
interface FilterOption {
    label: string;
    value: string;
    icon?: LucideIcon;
    count?: number;
}

declare function DataTable<TData, TValue = any>({ columns: rawColumns, data, preset, features: customFeatures, loading, error, onRetry, className, containerClassName, responsive, skeleton, emptyState, renderToolbar, renderPagination, renderEmpty, renderError, onStateChange, onRowClick, onRowDoubleClick, manualPagination, manualSorting, manualFiltering, pageCount, rowCount, }: DataTableProps<TData, TValue>): react_jsx_runtime.JSX.Element;

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
declare function useDataTable<TData>({ data, columns, features, manualPagination, manualSorting, manualFiltering, pageCount: controlledPageCount, rowCount: controlledRowCount, onStateChange, }: UseDataTableProps<TData>): UseDataTableReturn<TData>;

declare function createColumns<TData>(configs: ColumnConfig<TData>[]): ColumnDef<TData, any>[];
declare const columnHelpers: {
    select: <TData>() => ColumnDef<TData, any>;
    text: <TData>(key: keyof TData, options?: Partial<ColumnConfig<TData>>) => ColumnDef<TData, any>;
    number: <TData>(key: keyof TData, options?: Partial<ColumnConfig<TData>>) => ColumnDef<TData, any>;
    currency: <TData>(key: keyof TData, options?: Partial<ColumnConfig<TData>> & {
        currency?: string;
    }) => ColumnDef<TData, any>;
    date: <TData>(key: keyof TData, options?: Partial<ColumnConfig<TData>>) => ColumnDef<TData, any>;
    status: <TData>(key: keyof TData, options?: Partial<ColumnConfig<TData>> & {
        variants?: Record<string, "default" | "secondary" | "destructive" | "outline" | "success" | "warning">;
    }) => ColumnDef<TData, any>;
    actions: <TData>(actions: ColumnAction<TData>[], options?: {
        header?: string;
    }) => ColumnDef<TData, any>;
    custom: <TData>(id: string, renderer: (row: TData) => React.ReactNode, options?: {
        header?: string;
        size?: number;
    }) => ColumnDef<TData, any>;
};
declare function mergeColumns<TData>(...columnSets: ColumnDef<TData, any>[][]): ColumnDef<TData, any>[];

declare function exportData<TData>(format: "csv" | "excel" | "pdf", data: TData[], columns: ColumnDef<TData, any>[], filename?: string): void;

declare const tablePresets: Record<TablePreset, TableFeatures>;

export { type ColumnAction, type ColumnConfig, DataTable, type DataTableProps, type ExportConfig, type FilterOption, type LoadingConfig, type MobileConfig, type TableFeatures, type TablePreset, type TableState, type UseDataTableReturn, columnHelpers, createColumns, exportData, mergeColumns, tablePresets, useDataTable };
