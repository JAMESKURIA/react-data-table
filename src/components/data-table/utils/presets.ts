// src/components/data-table/utils/presets.ts
import { TableFeatures, TablePreset } from "../types";

export const tablePresets: Record<TablePreset, TableFeatures> = {
	simple: {
		sort: true,
		pagination: {
			pageSize: 10,
			pageSizes: [10, 25, 50],
			showInfo: true,
		},
	},

	advanced: {
		search: {
			placeholder: "Search...",
			debounce: 300,
		},
		sort: {
			multi: true,
		},
		pagination: {
			pageSize: 20,
			pageSizes: [10, 20, 50, 100],
			showInfo: true,
		},
		selection: {
			multi: true,
			showSelectAll: true,
		},
		columnVisibility: true,
		filters: {
			inline: true,
			advanced: false,
		},
		export: ["csv", "excel"],
		density: true,
		refresh: false,
	},

	"server-side": {
		search: {
			placeholder: "Search...",
			debounce: 500,
		},
		sort: {
			multi: false,
		},
		pagination: {
			pageSize: 25,
			pageSizes: [25, 50, 100],
			showInfo: true,
		},
		selection: false,
		columnVisibility: true,
		filters: {
			inline: true,
			advanced: true,
		},
		export: false,
		density: false,
		refresh: true,
	},
};

// Merge preset with custom features
export function mergeFeatures(
	preset: TablePreset | undefined,
	customFeatures: TableFeatures | undefined
): TableFeatures {
	const baseFeatures = preset ? tablePresets[preset] : {};

	if (!customFeatures) return baseFeatures;

	// Deep merge features
	const merged: TableFeatures = { ...baseFeatures };

	Object.keys(customFeatures).forEach((key) => {
		const featureKey = key as keyof TableFeatures;
		const customValue = customFeatures[featureKey];
		const baseValue = baseFeatures[featureKey];

		if (typeof customValue === "boolean") {
			merged[featureKey] = customValue as any;
		} else if (
			typeof customValue === "object" &&
			typeof baseValue === "object"
		) {
			merged[featureKey] = { ...baseValue, ...customValue } as any;
		} else {
			merged[featureKey] = customValue as any;
		}
	});

	return merged;
}
