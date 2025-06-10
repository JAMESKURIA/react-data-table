// src/examples/SimpleExample.tsx
"use client";

import { DataTable, createColumns } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

// Sample data type
type User = {
	id: string;
	name: string;
	email: string;
	role: string;
	status: "active" | "inactive";
};

// Sample data
const users: User[] = [
	{
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
		status: "active",
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane@example.com",
		role: "User",
		status: "active",
	},
	{
		id: "3",
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "User",
		status: "inactive",
	},
	{
		id: "4",
		name: "Alice Brown",
		email: "alice@example.com",
		role: "Manager",
		status: "active",
	},
	{
		id: "5",
		name: "Charlie Wilson",
		email: "charlie@example.com",
		role: "User",
		status: "inactive",
	},
];

export function SimpleExample() {
	// Define columns using the simplified API
	const columns = createColumns<User>([
		{ key: "name", header: "Name", sortable: true },
		{ key: "email", header: "Email" },
		{ key: "role", header: "Role", sortable: true },
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
			<h1 className="text-2xl font-bold mb-5">Simple Table Example</h1>

			{/* That's it! Just pass columns and data */}
			<DataTable columns={columns} data={users} preset="simple" />
		</div>
	);
}
