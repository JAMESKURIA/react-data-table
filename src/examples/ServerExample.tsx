// src/examples/ServerExample.tsx
"use client";

import { createColumns, DataTable, TableState } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { useCallback, useEffect, useState } from "react";

// API response type
type ApiResponse<T> = {
	data: T[];
	total: number;
	pageCount: number;
};

// Data type
type Employee = {
	id: string;
	name: string;
	email: string;
	department: string;
	position: string;
	salary: number;
	status: "active" | "inactive";
};

// Simulate API call
async function fetchEmployees(
	state: TableState
): Promise<ApiResponse<Employee>> {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 800));

	// In a real app, you'd make an API call like:
	// const response = await fetch(`/api/employees?${params}`)
	// return response.json()

	// For demo, generate mock data
	const mockData: Employee[] = Array.from({ length: 100 }, (_, i) => ({
		id: `${i + 1}`,
		name: `Employee ${i + 1}`,
		email: `employee${i + 1}@company.com`,
		department: ["Engineering", "Sales", "Marketing", "HR"][
			Math.floor(Math.random() * 4)
		],
		position: ["Manager", "Senior", "Junior", "Lead"][
			Math.floor(Math.random() * 4)
		],
		salary: Math.floor(Math.random() * 100000) + 40000,
		status: Math.random() > 0.2 ? "active" : "inactive",
	}));

	// Apply filters
	let filtered = [...mockData];

	// Global search
	if (state.globalFilter) {
		filtered = filtered.filter((item) =>
			Object.values(item).some((value) =>
				String(value)
					.toLowerCase()
					.includes(state.globalFilter.toLowerCase())
			)
		);
	}

	// Column filters
	state.filters.forEach((filter) => {
		filtered = filtered.filter((item) =>
			String(item[filter.id as keyof Employee])
				.toLowerCase()
				.includes(String(filter.value).toLowerCase())
		);
	});

	// Apply sorting
	if (state.sorting.length > 0) {
		const sort = state.sorting[0];
		filtered.sort((a, b) => {
			const aVal = a[sort.id as keyof Employee];
			const bVal = b[sort.id as keyof Employee];
			if (aVal < bVal) return sort.desc ? 1 : -1;
			if (aVal > bVal) return sort.desc ? -1 : 1;
			return 0;
		});
	}

	// Paginate
	const start = state.pagination.pageIndex * state.pagination.pageSize;
	const end = start + state.pagination.pageSize;
	const paginated = filtered.slice(start, end);

	return {
		data: paginated,
		total: filtered.length,
		pageCount: Math.ceil(filtered.length / state.pagination.pageSize),
	};
}

export function ServerExample() {
	const [data, setData] = useState<Employee[]>([]);
	const [loading, setLoading] = useState(true);
	const [pageCount, setPageCount] = useState(0);
	const [rowCount, setRowCount] = useState(0);

	// Handle state changes from table
	const handleStateChange = useCallback(async (state: TableState) => {
		setLoading(true);
		try {
			const response = await fetchEmployees(state);
			setData(response.data);
			setPageCount(response.pageCount);
			setRowCount(response.total);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	// Initial load
	useEffect(() => {
		handleStateChange({
			pagination: { pageIndex: 0, pageSize: 25 },
			sorting: [],
			filters: [],
			columnVisibility: {},
			rowSelection: {},
			globalFilter: "",
		});
	}, []);

	// Define columns
	const columns = createColumns<Employee>([
		{ key: "id", header: "ID", sortable: true },
		{ key: "name", header: "Name", sortable: true, searchable: true },
		{ key: "email", header: "Email" },
		{
			key: "department",
			header: "Department",
			filterable: "select",
			cell: (value) => <Badge variant="outline">{value}</Badge>,
		},
		{ key: "position", header: "Position", sortable: true },
		{ key: "salary", header: "Salary", format: "currency", sortable: true },
		{
			key: "status",
			header: "Status",
			cell: (value) => (
				<Badge variant={value === "active" ? "success" : "secondary"}>
					{value}
				</Badge>
			),
		},
	]);

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-2">
				Server-Side Table Example
			</h1>
			<p className="text-muted-foreground mb-6">
				Data fetching, sorting, and filtering handled on the server
			</p>

			<DataTable
				columns={columns}
				data={data}
				preset="server-side"
				loading={loading}
				manualPagination
				manualSorting
				manualFiltering
				pageCount={pageCount}
				rowCount={rowCount}
				onStateChange={handleStateChange}
				skeleton={{
					rows: 10,
					animate: true,
				}}
				features={{
					refresh: {
						onRefresh: () => {
							// Trigger refetch with current state
							const table = document.querySelector(
								"[data-table-instance]"
							);
							if (table) {
								// Force refresh
								window.location.reload();
							}
						},
					},
				}}
			/>

			<div className="mt-4 text-sm text-muted-foreground">
				Total records: {rowCount}
			</div>
		</div>
	);
}
