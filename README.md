# React Data Table

A modern, flexible, and feature-rich data table component for React applications built on top of @tanstack/react-table.

[![npm version](https://img.shields.io/npm/v/@nickjames/react-data-table.svg)](https://www.npmjs.com/package/@nickjames/react-data-table)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@nickjames/react-data-table)](https://bundlephobia.com/package/@nickjames/react-data-table)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

-   🚀 **Simple API** - Get started with just 2 lines of code
-   🎯 **TypeScript Support** - Full type safety and autocompletion
-   📱 **Mobile Responsive** - Automatic mobile-optimized views
-   🎨 **Highly Customizable** - Override any part of the table
-   📊 **Export Data** - Built-in CSV, Excel, and PDF export
-   🔍 **Advanced Filtering** - Global search and column filters
-   ⚡ **High Performance** - Optimized rendering with virtualization support
-   🎭 **Presets** - Simple, Advanced, and Server-side configurations
-   🔄 **Server-Side Operations** - First-class support for backend pagination/sorting
-   💅 **Beautiful by Default** - Styled with Tailwind CSS and Radix UI

## 📦 Installation

```bash
npm install @nickjames/react-data-table
# or
yarn add @nickjames/react-data-table
# or
pnpm add @nickjames/react-data-table
```

## 🚀 Quick Start

```tsx
import { DataTable, createColumns } from "@nickjames/react-data-table";
import "@nickjames/react-data-table/styles";

const columns = createColumns([
	{ key: "name", header: "Name", sortable: true },
	{ key: "email", header: "Email" },
	{ key: "role", header: "Role" },
]);

function App() {
	return <DataTable columns={columns} data={users} preset="advanced" />;
}
```

That's it! You now have a fully functional data table with sorting, filtering, pagination, and more.

## 📖 Basic Usage

### Using Column Helpers

For even cleaner code, use our column helpers:

```tsx
import { DataTable, columnHelpers } from "@nickjames/react-data-table";

const columns = [
	columnHelpers.select(),
	columnHelpers.text("name", { header: "Name", sortable: true }),
	columnHelpers.email("email", { header: "Email" }),
	columnHelpers.badge("role", { header: "Role" }),
	columnHelpers.date("createdAt", { header: "Joined" }),
	columnHelpers.actions([
		{ label: "Edit", onClick: (row) => handleEdit(row) },
		{
			label: "Delete",
			onClick: (row) => handleDelete(row),
			variant: "destructive",
		},
	]),
];

function UsersTable() {
	return (
		<DataTable
			columns={columns}
			data={users}
			preset="advanced"
			onRowClick={(user) => console.log("Clicked:", user)}
		/>
	);
}
```

### Presets

Choose from three built-in presets:

```tsx
// Simple - Just sorting and pagination
<DataTable columns={columns} data={data} preset="simple" />

// Advanced - All features enabled
<DataTable columns={columns} data={data} preset="advanced" />

// Server-side - Optimized for backend operations
<DataTable columns={columns} data={data} preset="server-side" />
```

### Custom Features

Override or extend preset features:

```tsx
<DataTable
	columns={columns}
	data={data}
	preset="advanced"
	features={{
		search: {
			placeholder: "Search users...",
			debounce: 500,
		},
		pagination: {
			pageSize: 50,
			pageSizes: [25, 50, 100],
		},
		export: ["csv", "excel", "pdf"],
		columnVisibility: true,
		density: true,
	}}
/>
```

## 📱 Mobile Support

Automatic responsive behavior with customization:

```tsx
<DataTable
	columns={columns}
	data={data}
	responsive={{
		breakpoint: 768,
		columns: ["name", "email"], // Show only these on mobile
		view: "cards", // 'cards' | 'list' | 'stacked'
	}}
/>
```

## 🔄 Server-Side Data

Perfect for large datasets:

```tsx
function ServerTable() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pageCount, setPageCount] = useState(0);

	const handleStateChange = async (state) => {
		setLoading(true);
		const response = await fetch("/api/users", {
			method: "POST",
			body: JSON.stringify(state),
		});
		const result = await response.json();
		setData(result.data);
		setPageCount(result.pageCount);
		setLoading(false);
	};

	return (
		<DataTable
			columns={columns}
			data={data}
			preset="server-side"
			loading={loading}
			manualPagination
			manualSorting
			manualFiltering
			pageCount={pageCount}
			onStateChange={handleStateChange}
		/>
	);
}
```

## 🎨 Customization

### Loading States

```tsx
<DataTable
	loading={true}
	skeleton={{
		rows: 10,
		animate: true,
	}}
/>
```

### Empty States

```tsx
<DataTable
	emptyState={{
		icon: FileX,
		title: "No data found",
		description: "Try adjusting your filters",
		action: {
			label: "Clear filters",
			onClick: () => handleClearFilters(),
		},
	}}
/>
```

### Custom Rendering

```tsx
<DataTable
	renderToolbar={(table) => <CustomToolbar table={table} />}
	renderPagination={(props) => <CustomPagination {...props} />}
	renderEmpty={() => <CustomEmptyState />}
/>
```

## 🛠️ Advanced Usage

### Use the Hook Directly

For complete control:

```tsx
import { useDataTable } from "@nickjames/react-data-table";

function CustomTable() {
	const { data, state, actions, exportData } = useDataTable({
		data: myData,
		columns: myColumns,
	});

	return (
		<div>
			<button onClick={() => actions.setGlobalFilter("search")}>
				Search
			</button>
			<button onClick={() => exportData("csv")}>Export CSV</button>
			{/* Build your own UI */}
		</div>
	);
}
```

### Column Definition API

```tsx
const columns = createColumns([
	{
		key: "name",
		header: "Name",
		sortable: true,
		searchable: true,
		cell: (value, row) => <strong>{value}</strong>,
	},
	{
		key: "status",
		header: "Status",
		filterable: "select", // or 'multi-select' | 'range'
		cell: (value) => <Badge>{value}</Badge>,
	},
]);
```

## 📊 Column Helpers Reference

```tsx
// Selection checkbox
columnHelpers.select()

// Text columns
columnHelpers.text(key, options)
columnHelpers.email(key, options)
columnHelpers.url(key, options)

// Number columns
columnHelpers.number(key, options)
columnHelpers.currency(key, { currency: 'USD', ...options })
columnHelpers.percentage(key, options)

// Date columns
columnHelpers.date(key, options)
columnHelpers.datetime(key, options)

// Status/Badge columns
columnHelpers.badge(key, options)
columnHelpers.status(key, { variants: {...} })

// Boolean columns
columnHelpers.boolean(key, options)
columnHelpers.checkbox(key, options)

// Action columns
columnHelpers.actions(actions, options)

// Custom columns
columnHelpers.custom(id, renderer, options)
```

## 🎯 TypeScript

Full TypeScript support with type inference:

```tsx
interface User {
	id: string;
	name: string;
	email: string;
}

// Type-safe columns
const columns = createColumns<User>([
	{ key: "name", header: "Name" }, // ✅ 'name' must be keyof User
]);

// Type-safe actions
const actions: ColumnAction<User>[] = [
	{
		label: "Edit",
		onClick: (user) => {
			console.log(user.email); // ✅ Fully typed
		},
	},
];
```

## 🎨 Theming

The component uses Tailwind CSS classes and CSS variables for theming:

```css
/* Override in your global CSS */
:root {
	--data-table-border: theme("colors.gray.200");
	--data-table-hover: theme("colors.gray.50");
	/* ... more variables */
}
```

## 📚 Examples

Check out our [examples repository](https://github.com/nickjames/react-data-table-examples) for:

-   Basic usage
-   Server-side pagination
-   Custom styling
-   Advanced filtering
-   Export functionality
-   Mobile optimization
-   Real-world applications

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

```bash
# Clone the repo
git clone https://github.com/nickjames/react-data-table.git

# Install dependencies
pnpm install

# Run development
pnpm dev

# Run tests
pnpm test

# Build
pnpm build
```

## 📄 License

MIT © [nickjames_](https://github.com/nickjames)

---

<p align="center">Made with ❤️ by developers, for developers</p>
