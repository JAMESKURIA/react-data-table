// src/components/data-table/utils/exportUtils.ts
import type { ColumnDef } from "@tanstack/react-table";

// Helper to get the accessor key from a column
function getAccessorKey<TData>(column: ColumnDef<TData, any>): string | null {
	if ("accessorKey" in column && column.accessorKey) {
		return column.accessorKey as string;
	}
	if ("id" in column && column.id) {
		return column.id;
	}
	return null;
}

// Helper to get column header text
function getColumnHeader<TData>(column: ColumnDef<TData, any>): string {
	if (typeof column.header === "string") {
		return column.header;
	}
	if ("id" in column && column.id) {
		return column.id;
	}
	if ("accessorKey" in column && column.accessorKey) {
		return String(column.accessorKey);
	}
	return "Column";
}

// CSV Export
export function exportToCSV<TData>(
	data: TData[],
	columns: ColumnDef<TData, any>[],
	filename: string = "data"
) {
	// Get visible columns only
	const visibleColumns = columns.filter(
		(col) =>
			col.id !== "select" &&
			col.id !== "actions" &&
			col.enableHiding !== false
	);

	// Create headers
	const headers = visibleColumns.map((col) => getColumnHeader(col)).join(",");

	// Create rows
	const rows = data
		.map((row) => {
			return visibleColumns
				.map((col) => {
					const accessorKey = getAccessorKey(col);
					const value = accessorKey ? (row as any)[accessorKey] : "";
					// Escape commas and quotes
					const escaped = String(value).replace(/"/g, '""');
					return escaped.includes(",") ? `"${escaped}"` : escaped;
				})
				.join(",");
		})
		.join("\n");

	// Create blob and download
	const csv = `${headers}\n${rows}`;
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = `${filename}.csv`;
	link.click();
}

// Excel Export (using basic CSV format that Excel can open)
export function exportToExcel<TData>(
	data: TData[],
	columns: ColumnDef<TData, any>[],
	filename: string = "data"
) {
	// For a real implementation, you would use a library like SheetJS
	// For now, we'll create a CSV that Excel can open
	exportToCSV(data, columns, filename);
}

// PDF Export (basic implementation)
export function exportToPDF<TData>(
	data: TData[],
	columns: ColumnDef<TData, any>[],
	filename: string = "data"
) {
	// For a real implementation, you would use a library like jsPDF
	// For now, we'll create a simple HTML table and print it
	const visibleColumns = columns.filter(
		(col) =>
			col.id !== "select" &&
			col.id !== "actions" &&
			col.enableHiding !== false
	);

	const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${filename}</title>
      <style>
        body { font-family: Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        @media print {
          body { margin: 0; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }
        }
      </style>
    </head>
    <body>
      <h1>${filename}</h1>
      <table>
        <thead>
          <tr>
            ${visibleColumns
				.map((col) => {
					const header = getColumnHeader(col);
					return `<th>${header}</th>`;
				})
				.join("")}
          </tr>
        </thead>
        <tbody>
          ${data
				.map(
					(row) => `
            <tr>
              ${visibleColumns
					.map((col) => {
						const accessorKey = getAccessorKey(col);
						const value = accessorKey
							? (row as any)[accessorKey]
							: "";
						return `<td>${value || ""}</td>`;
					})
					.join("")}
            </tr>
          `
				)
				.join("")}
        </tbody>
      </table>
    </body>
    </html>
  `;

	const printWindow = window.open("", "_blank");
	if (printWindow) {
		printWindow.document.write(html);
		printWindow.document.close();
		printWindow.print();
	}
}

// Main export function
export function exportData<TData>(
	format: "csv" | "excel" | "pdf",
	data: TData[],
	columns: ColumnDef<TData, any>[],
	filename: string = "table-export"
) {
	const timestamp = new Date().toISOString().split("T")[0];
	const fullFilename = `${filename}-${timestamp}`;

	switch (format) {
		case "csv":
			exportToCSV(data, columns, fullFilename);
			break;
		case "excel":
			exportToExcel(data, columns, fullFilename);
			break;
		case "pdf":
			exportToPDF(data, columns, fullFilename);
			break;
		default:
			console.error(`Unsupported export format: ${format}`);
	}
}
