// src/examples/AdvancedExample.tsx
"use client";

import { DataTable, columnHelpers } from "@/components/data-table";
import { Edit, Eye, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Sample data type
type Product = {
	id: string;
	name: string;
	category: string;
	price: number;
	stock: number;
	status: "in-stock" | "low-stock" | "out-of-stock";
	lastUpdated: string;
};

// Sample data
const products: Product[] = [
	{
		id: "1",
		name: 'MacBook Pro 16"',
		category: "Electronics",
		price: 2499,
		stock: 15,
		status: "in-stock",
		lastUpdated: "2024-03-15",
	},
	{
		id: "2",
		name: "AirPods Pro",
		category: "Electronics",
		price: 249,
		stock: 3,
		status: "low-stock",
		lastUpdated: "2024-03-14",
	},
	{
		id: "3",
		name: "Nike Air Max",
		category: "Footwear",
		price: 150,
		stock: 0,
		status: "out-of-stock",
		lastUpdated: "2024-03-13",
	},
	{
		id: "4",
		name: "The Great Gatsby",
		category: "Books",
		price: 12.99,
		stock: 50,
		status: "in-stock",
		lastUpdated: "2024-03-12",
	},
	{
		id: "5",
		name: "Organic Coffee Beans",
		category: "Food",
		price: 24.99,
		stock: 8,
		status: "low-stock",
		lastUpdated: "2024-03-11",
	},
];

export function AdvancedExample() {
	const [data, setData] = useState(products);

	// Define columns using column helpers
	const columns = [
		columnHelpers.select<Product>(),
		columnHelpers.text("name", {
			header: "Product Name",
			sortable: true,
			searchable: true,
		}),
		columnHelpers.text("category", {
			header: "Category",
			filterable: "select",
		}),
		columnHelpers.currency("price", {
			header: "Price",
			currency: "USD",
		}),
		columnHelpers.number("stock", {
			header: "Stock",
			sortable: true,
		}),
		columnHelpers.status("status", {
			header: "Status",
			variants: {
				"in-stock": "success",
				"low-stock": "warning",
				"out-of-stock": "destructive",
			},
		}),
		columnHelpers.date("lastUpdated", {
			header: "Last Updated",
		}),
		columnHelpers.actions<Product>([
			{
				label: "View",
				icon: Eye,
				onClick: (row) => toast.info(`Viewing ${row.name}`),
			},
			{
				label: "Edit",
				icon: Edit,
				onClick: (row) => toast.info(`Editing ${row.name}`),
			},
			{
				label: "Delete",
				icon: Trash,
				variant: "destructive",
				onClick: (row) => {
					if (confirm(`Delete ${row.name}?`)) {
						setData((prev) => prev.filter((p) => p.id !== row.id));
						toast.success(`${row.name} deleted`);
					}
				},
			},
		]),
	];

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-2">Advanced Table Example</h1>
			<p className="text-muted-foreground mb-6">
				Demonstrating all features with the simplified API
			</p>

			<DataTable
				columns={columns}
				data={data}
				preset="advanced"
				features={{
					export: ["csv", "excel", "pdf"],
					density: true,
					refresh: {
						onRefresh: async () => {
							toast.info("Refreshing data...");
							// Simulate API call
							await new Promise((resolve) =>
								setTimeout(resolve, 1000)
							);
							toast.success("Data refreshed!");
						},
					},
				}}
				responsive={{
					breakpoint: 768,
					columns: ["name", "price", "status"],
					view: "cards",
				}}
				emptyState={{
					title: "No products found",
					description:
						"Try adjusting your filters or add a new product.",
					action: {
						label: "Add Product",
						onClick: () => toast.info("Add product clicked"),
					},
				}}
				onRowClick={(row) => toast.info(`Clicked on ${row.name}`)}
				onStateChange={(state) => {
					console.log("Table state changed:", state);
				}}
			/>
		</div>
	);
}
