// Main exports
export { DataTable } from './components/data-table/DataTable'
export { useDataTable } from './components/data-table/hooks/useDataTable'
export { createColumns, columnHelpers, mergeColumns } from './components/data-table/utils/columnHelpers'
export { exportData } from './components/data-table/utils/exportUtils'
export { tablePresets } from './components/data-table/utils/presets'

// Export all types
export type {
  DataTableProps,
  TableState,
  UseDataTableReturn,
  ColumnConfig,
  ColumnAction,
  TableFeatures,
  TablePreset,
  MobileConfig,
  LoadingConfig,
  ExportConfig,
  FilterOption,
} from './components/data-table/types'

// Re-export useful types from tanstack
export type { ColumnDef, Row, Table } from '@tanstack/react-table'
