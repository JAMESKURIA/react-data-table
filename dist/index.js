"use client"
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DataTable: () => DataTable,
  columnHelpers: () => columnHelpers,
  createColumns: () => createColumns,
  exportData: () => exportData,
  mergeColumns: () => mergeColumns,
  tablePresets: () => tablePresets,
  useDataTable: () => useDataTable
});
module.exports = __toCommonJS(src_exports);

// src/components/ui/alert.tsx
var import_class_variance_authority = require("class-variance-authority");

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/ui/alert.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var alertVariants = (0, import_class_variance_authority.cva)(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      ),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/button.tsx
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority2 = require("class-variance-authority");
var React = __toESM(require("react"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority2.cva)(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-700",
        warning: "bg-yellow-600 text-white hover:bg-yellow-700"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/ui/table.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function Table({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}

// src/components/data-table/DataTable.tsx
var import_react_table3 = require("@tanstack/react-table");
var import_lucide_react7 = require("lucide-react");
var React9 = __toESM(require("react"));

// src/components/data-table/components/DataTableEmpty.tsx
var import_lucide_react = require("lucide-react");
var React2 = __toESM(require("react"));
var import_jsx_runtime4 = require("react/jsx-runtime");
function isEmptyStateConfig(config) {
  return config && typeof config === "object" && !React2.isValidElement(config) && !Array.isArray(config);
}
function DataTableEmpty({ config }) {
  if (React2.isValidElement(config)) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: config });
  }
  if (isEmptyStateConfig(config)) {
    const Icon2 = config.icon || import_lucide_react.FileX2;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: cn(
          "flex flex-col items-center justify-center py-10",
          config.className
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon2, { className: "h-10 w-10 text-muted-foreground mb-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "text-lg font-semibold", children: config.title || "No results found" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-sm text-muted-foreground mb-4 text-center max-w-sm", children: config.description || "Try adjusting your search or filter to find what you're looking for." }),
          config.action && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            Button,
            {
              variant: config.action.variant || "outline",
              size: "sm",
              onClick: config.action.onClick,
              children: config.action.label
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col items-center justify-center py-10", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react.FileX2, { className: "h-10 w-10 text-muted-foreground mb-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "text-lg font-semibold", children: "No results found" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-sm text-muted-foreground mb-4 text-center max-w-sm", children: "Try adjusting your search or filter to find what you're looking for." })
  ] });
}

// src/components/ui/card.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function Card({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}

// src/components/data-table/components/DataTableMobile.tsx
var import_react_table = require("@tanstack/react-table");
var import_lucide_react2 = require("lucide-react");
var React3 = __toESM(require("react"));
var import_jsx_runtime6 = require("react/jsx-runtime");
function DataTableMobile({
  table,
  columns,
  data,
  features,
  config,
  onRowClick
}) {
  const [expandedRows, setExpandedRows] = React3.useState(
    /* @__PURE__ */ new Set()
  );
  const view = config.view || "cards";
  const mobileColumns = config.columns || [];
  const visibleColumns = mobileColumns.length > 0 ? columns.filter(
    (col) => col.id && (mobileColumns.includes(col.id) || col.id === "select" || col.id === "actions")
  ) : columns.slice(0, 3);
  const hiddenColumns = columns.filter(
    (col) => !visibleColumns.includes(col)
  );
  const toggleRow = (rowId) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  };
  if (view === "cards") {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-4", children: [
      table.getRowModel().rows.map((row) => {
        const isExpanded = expandedRows.has(row.id);
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          Card,
          {
            className: cn(
              "transition-colors",
              onRowClick && "cursor-pointer hover:bg-muted/50",
              row.getIsSelected() && "border-primary"
            ),
            onClick: () => onRowClick?.(row.original),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CardHeader, { className: "pb-3", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "space-y-1 flex-1", children: visibleColumns.map((column) => {
                  if (column.id === "select" || column.id === "actions")
                    return null;
                  const cell = row.getAllCells().find(
                    (c) => c.column.id === column.id
                  );
                  if (!cell) return null;
                  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                    "div",
                    {
                      className: "flex items-center space-x-2",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "text-sm font-medium text-muted-foreground", children: [
                          typeof column.header === "string" ? column.header : column.id,
                          ":"
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-sm", children: (0, import_react_table.flexRender)(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        ) })
                      ]
                    },
                    column.id
                  );
                }) }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center space-x-2", children: [
                  features.selection && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    "div",
                    {
                      onClick: (e) => e.stopPropagation(),
                      children: row.getAllCells().find(
                        (c) => c.column.id === "select"
                      ) && (0, import_react_table.flexRender)(
                        columns.find(
                          (c) => c.id === "select"
                        )?.cell,
                        row.getAllCells().find(
                          (c) => c.column.id === "select"
                        ).getContext()
                      )
                    }
                  ),
                  row.getAllCells().find(
                    (c) => c.column.id === "actions"
                  ) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    "div",
                    {
                      onClick: (e) => e.stopPropagation(),
                      children: (0, import_react_table.flexRender)(
                        columns.find(
                          (c) => c.id === "actions"
                        )?.cell,
                        row.getAllCells().find(
                          (c) => c.column.id === "actions"
                        ).getContext()
                      )
                    }
                  ),
                  config.collapsible !== false && hiddenColumns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-8 w-8 p-0",
                      onClick: (e) => {
                        e.stopPropagation();
                        toggleRow(row.id);
                      },
                      children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.ChevronRight, { className: "h-4 w-4" })
                    }
                  )
                ] })
              ] }) }),
              isExpanded && hiddenColumns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CardContent, { className: "pt-0", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "space-y-2 border-t pt-3", children: hiddenColumns.map((column) => {
                if (column.id === "select" || column.id === "actions")
                  return null;
                const cell = row.getAllCells().find(
                  (c) => c.column.id === column.id
                );
                if (!cell) return null;
                return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                  "div",
                  {
                    className: "flex justify-between text-sm",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "font-medium text-muted-foreground", children: [
                        typeof column.header === "string" ? column.header : column.id,
                        ":"
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: (0, import_react_table.flexRender)(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      ) })
                    ]
                  },
                  column.id
                );
              }) }) })
            ]
          },
          row.id
        );
      }),
      features.pagination && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            children: "Previous"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "text-sm text-muted-foreground", children: [
          "Page ",
          table.getState().pagination.pageIndex + 1,
          " of",
          " ",
          table.getPageCount()
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            children: "Next"
          }
        )
      ] })
    ] });
  }
  if (view === "list") {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "space-y-2", children: table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: cn(
          "flex items-center justify-between p-4 border rounded-lg transition-colors",
          onRowClick && "cursor-pointer hover:bg-muted/50",
          row.getIsSelected() && "border-primary"
        ),
        onClick: () => onRowClick?.(row.original),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex-1 space-y-1", children: visibleColumns.map((column) => {
            if (column.id === "select" || column.id === "actions")
              return null;
            const cell = row.getAllCells().find((c) => c.column.id === column.id);
            if (!cell) return null;
            return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "text-sm", children: (0, import_react_table.flexRender)(
              cell.column.columnDef.cell,
              cell.getContext()
            ) }, column.id);
          }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center space-x-2", children: [
            features.selection && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { onClick: (e) => e.stopPropagation(), children: row.getAllCells().find(
              (c) => c.column.id === "select"
            ) && (0, import_react_table.flexRender)(
              columns.find(
                (c) => c.id === "select"
              )?.cell,
              row.getAllCells().find(
                (c) => c.column.id === "select"
              ).getContext()
            ) }),
            row.getAllCells().find((c) => c.column.id === "actions") && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { onClick: (e) => e.stopPropagation(), children: (0, import_react_table.flexRender)(
              columns.find((c) => c.id === "actions")?.cell,
              row.getAllCells().find(
                (c) => c.column.id === "actions"
              ).getContext()
            ) })
          ] })
        ]
      },
      row.id
    )) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "space-y-4", children: table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      className: cn(
        "space-y-3 p-4 border rounded-lg",
        onRowClick && "cursor-pointer hover:bg-muted/50",
        row.getIsSelected() && "border-primary"
      ),
      onClick: () => onRowClick?.(row.original),
      children: [
        columns.map((column) => {
          if (column.id === "select" || column.id === "actions")
            return null;
          const cell = row.getAllCells().find((c) => c.column.id === column.id);
          if (!cell) return null;
          return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "div",
            {
              className: "flex flex-col space-y-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-medium text-muted-foreground", children: typeof column.header === "string" ? column.header : column.id }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-sm", children: (0, import_react_table.flexRender)(
                  cell.column.columnDef.cell,
                  cell.getContext()
                ) })
              ]
            },
            column.id
          );
        }),
        (features.selection || row.getAllCells().find((c) => c.column.id === "actions")) && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center justify-end space-x-2 pt-2 border-t", children: [
          features.selection && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { onClick: (e) => e.stopPropagation(), children: row.getAllCells().find(
            (c) => c.column.id === "select"
          ) && (0, import_react_table.flexRender)(
            columns.find(
              (c) => c.id === "select"
            )?.cell,
            row.getAllCells().find(
              (c) => c.column.id === "select"
            ).getContext()
          ) }),
          row.getAllCells().find((c) => c.column.id === "actions") && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { onClick: (e) => e.stopPropagation(), children: (0, import_react_table.flexRender)(
            columns.find((c) => c.id === "actions")?.cell,
            row.getAllCells().find(
              (c) => c.column.id === "actions"
            ).getContext()
          ) })
        ] })
      ]
    },
    row.id
  )) });
}

// src/components/ui/select.tsx
var import_react_icons = require("@radix-ui/react-icons");
var SelectPrimitive = __toESM(require("@radix-ui/react-select"));
var React4 = __toESM(require("react"));
var import_jsx_runtime7 = require("react/jsx-runtime");
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React4.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_icons.ChevronDownIcon, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_icons.ChevronUpIcon, {})
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_icons.ChevronDownIcon, {})
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React4.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectScrollUpButton, {}),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React4.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_icons.CheckIcon, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/components/data-table/components/DataTablePagination.tsx
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime8 = require("react/jsx-runtime");
function DataTablePagination({
  table,
  features,
  pageSizes = [10, 20, 30, 40, 50],
  className
}) {
  const paginationConfig = typeof features.pagination === "object" ? features.pagination : {};
  const showInfo = paginationConfig.showInfo !== false;
  const availablePageSizes = paginationConfig.pageSizes || pageSizes;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "div",
    {
      className: cn("flex items-center justify-between px-2", className),
      children: [
        showInfo && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex-1 text-sm text-muted-foreground", children: table.getFilteredSelectedRowModel().rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
          table.getFilteredSelectedRowModel().rows.length,
          " of",
          " ",
          table.getFilteredRowModel().rows.length,
          " row(s) selected."
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-sm font-medium", children: "Rows per page" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
              Select,
              {
                value: `${table.getState().pagination.pageSize}`,
                onValueChange: (value) => {
                  table.setPageSize(Number(value));
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectTrigger, { className: "h-8 w-[70px]", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                    SelectValue,
                    {
                      placeholder: table.getState().pagination.pageSize
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectContent, { side: "top", children: availablePageSizes.map((pageSize) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                    SelectItem,
                    {
                      value: `${pageSize}`,
                      children: pageSize
                    },
                    pageSize
                  )) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: [
            "Page ",
            table.getState().pagination.pageIndex + 1,
            " of",
            " ",
            table.getPageCount() || 1
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
              Button,
              {
                variant: "outline",
                className: "hidden h-8 w-8 p-0 lg:flex",
                onClick: () => table.setPageIndex(0),
                disabled: !table.getCanPreviousPage(),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "sr-only", children: "Go to first page" }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react3.ChevronsLeft, { className: "h-4 w-4" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
              Button,
              {
                variant: "outline",
                className: "h-8 w-8 p-0",
                onClick: () => table.previousPage(),
                disabled: !table.getCanPreviousPage(),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "sr-only", children: "Go to previous page" }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react3.ChevronLeft, { className: "h-4 w-4" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
              Button,
              {
                variant: "outline",
                className: "h-8 w-8 p-0",
                onClick: () => table.nextPage(),
                disabled: !table.getCanNextPage(),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "sr-only", children: "Go to next page" }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react3.ChevronRight, { className: "h-4 w-4" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
              Button,
              {
                variant: "outline",
                className: "hidden h-8 w-8 p-0 lg:flex",
                onClick: () => table.setPageIndex(table.getPageCount() - 1),
                disabled: !table.getCanNextPage(),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "sr-only", children: "Go to last page" }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react3.ChevronsRight, { className: "h-4 w-4" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}

// src/components/ui/skeleton.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}

// src/components/data-table/components/DataTableSkeleton.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function DataTableSkeleton({
  columns = 5,
  rows = 5,
  showHeaders = true,
  animate = true,
  className,
  cellClassName,
  headerClassName
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cn("rounded-md border", className), children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Table, { children: [
    showHeaders && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TableRow, { children: Array.from({ length: columns }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TableHead, { className: headerClassName, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      Skeleton,
      {
        className: cn(
          "h-6 w-20",
          animate && "animate-pulse"
        )
      }
    ) }, i)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TableBody, { children: Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TableRow, { children: Array.from({ length: columns }).map((_2, j) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TableCell, { className: cellClassName, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      Skeleton,
      {
        className: cn(
          "h-6",
          j === 0 ? "w-32" : "w-full",
          // First column slightly narrower
          animate && "animate-pulse"
        )
      }
    ) }, j)) }, i)) })
  ] }) });
}

// src/components/ui/dropdown-menu.tsx
var DropdownMenuPrimitive = __toESM(require("@radix-ui/react-dropdown-menu"));
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime11 = require("react/jsx-runtime");
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    DropdownMenuPrimitive.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react4.CheckIcon, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}

// src/components/ui/input.tsx
var React5 = __toESM(require("react"));
var import_jsx_runtime12 = require("react/jsx-runtime");
var Input = React5.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/components/data-table/components/DataTableToolbar.tsx
var import_lucide_react5 = require("lucide-react");
var React6 = __toESM(require("react"));
var import_jsx_runtime13 = require("react/jsx-runtime");
function DataTableToolbar({
  table,
  features,
  globalFilter,
  onGlobalFilterChange,
  onExport
}) {
  const [searchValue, setSearchValue] = React6.useState(globalFilter);
  const searchConfig = typeof features.search === "object" ? features.search : {};
  const exportFormats = React6.useMemo(() => {
    if (!features.export) return [];
    if (features.export === true) return ["csv", "excel", "pdf"];
    if (Array.isArray(features.export)) return features.export;
    return [];
  }, [features.export]);
  const hasFilters = table.getState().columnFilters.length > 0 || globalFilter;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex flex-1 items-center space-x-2", children: [
      features.search && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react5.Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          Input,
          {
            placeholder: searchConfig.placeholder || "Search...",
            value: searchValue,
            onChange: (e) => {
              setSearchValue(e.target.value);
              onGlobalFilterChange(e.target.value);
            },
            className: "h-9 w-[250px] pl-8"
          }
        )
      ] }),
      hasFilters && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
        Button,
        {
          variant: "ghost",
          onClick: () => {
            table.resetColumnFilters();
            setSearchValue("");
            onGlobalFilterChange("");
          },
          className: "h-9 px-2 lg:px-3",
          children: [
            "Reset",
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react5.X, { className: "ml-2 h-4 w-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center space-x-2", children: [
      features.columnVisibility && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(DropdownMenu, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-9 lg:flex",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react5.Columns, { className: "mr-2 h-4 w-4" }),
              "View"
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(DropdownMenuContent, { align: "end", className: "w-[150px]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(DropdownMenuLabel, { children: "Toggle columns" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(DropdownMenuSeparator, {}),
          table.getAllColumns().filter(
            (column) => typeof column.accessorFn !== "undefined" && column.getCanHide()
          ).map((column) => {
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              DropdownMenuCheckboxItem,
              {
                className: "capitalize",
                checked: column.getIsVisible(),
                onCheckedChange: (value) => column.toggleVisibility(!!value),
                children: column.id
              },
              column.id
            );
          })
        ] })
      ] }),
      features.export && exportFormats.length > 0 && onExport && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(DropdownMenu, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(Button, { variant: "outline", size: "sm", className: "h-9", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react5.Download, { className: "mr-2 h-4 w-4" }),
          "Export"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(DropdownMenuContent, { align: "end", children: [
          exportFormats.includes("csv") && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            DropdownMenuItem,
            {
              onClick: () => onExport("csv"),
              children: "Export as CSV"
            }
          ),
          exportFormats.includes("excel") && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            DropdownMenuItem,
            {
              onClick: () => onExport("excel"),
              children: "Export as Excel"
            }
          ),
          exportFormats.includes("pdf") && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            DropdownMenuItem,
            {
              onClick: () => onExport("pdf"),
              children: "Export as PDF"
            }
          )
        ] })
      ] }),
      features.refresh && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "h-9",
          onClick: () => {
            if (typeof features.refresh === "object" && features.refresh.onRefresh) {
              features.refresh.onRefresh();
            }
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react5.RefreshCw, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}

// src/components/data-table/hooks/useDataTable.ts
var import_react_table2 = require("@tanstack/react-table");
var React7 = __toESM(require("react"));

// src/components/data-table/utils/exportUtils.ts
function getAccessorKey(column) {
  if ("accessorKey" in column && column.accessorKey) {
    return column.accessorKey;
  }
  if ("id" in column && column.id) {
    return column.id;
  }
  return null;
}
function getColumnHeader(column) {
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
function exportToCSV(data, columns, filename = "data") {
  const visibleColumns = columns.filter(
    (col) => col.id !== "select" && col.id !== "actions" && col.enableHiding !== false
  );
  const headers = visibleColumns.map((col) => getColumnHeader(col)).join(",");
  const rows = data.map((row) => {
    return visibleColumns.map((col) => {
      const accessorKey = getAccessorKey(col);
      const value = accessorKey ? row[accessorKey] : "";
      const escaped = String(value).replace(/"/g, '""');
      return escaped.includes(",") ? `"${escaped}"` : escaped;
    }).join(",");
  }).join("\n");
  const csv = `${headers}
${rows}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
}
function exportToExcel(data, columns, filename = "data") {
  exportToCSV(data, columns, filename);
}
function exportToPDF(data, columns, filename = "data") {
  const visibleColumns = columns.filter(
    (col) => col.id !== "select" && col.id !== "actions" && col.enableHiding !== false
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
            ${visibleColumns.map((col) => {
    const header = getColumnHeader(col);
    return `<th>${header}</th>`;
  }).join("")}
          </tr>
        </thead>
        <tbody>
          ${data.map(
    (row) => `
            <tr>
              ${visibleColumns.map((col) => {
      const accessorKey = getAccessorKey(col);
      const value = accessorKey ? row[accessorKey] : "";
      return `<td>${value || ""}</td>`;
    }).join("")}
            </tr>
          `
  ).join("")}
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
function exportData(format, data, columns, filename = "table-export") {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
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

// src/components/data-table/hooks/useDataTable.ts
function useDataTable({
  data,
  columns,
  features,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  pageCount: controlledPageCount,
  rowCount: controlledRowCount,
  onStateChange
}) {
  const [rowSelection, setRowSelection] = React7.useState(
    {}
  );
  const [columnVisibility, setColumnVisibility] = React7.useState({});
  const [columnFilters, setColumnFilters] = React7.useState([]);
  const [sorting, setSorting] = React7.useState(
    typeof features?.sort === "object" ? features.sort.defaultSort || [] : []
  );
  const [globalFilter, setGlobalFilter] = React7.useState("");
  const [pagination, setPagination] = React7.useState({
    pageIndex: 0,
    pageSize: typeof features?.pagination === "object" ? features.pagination.pageSize || 10 : 10
  });
  const debouncedGlobalFilter = React7.useMemo(() => {
    const debounce = typeof features?.search === "object" ? features.search.debounce || 300 : 300;
    let timeoutId;
    return (value) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setGlobalFilter(value);
      }, debounce);
    };
  }, [features?.search]);
  const table = (0, import_react_table2.useReactTable)({
    data,
    columns,
    pageCount: controlledPageCount,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination
    },
    enableRowSelection: features?.selection !== false,
    enableMultiRowSelection: typeof features?.selection === "object" ? features.selection.multi !== false : true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: (0, import_react_table2.getCoreRowModel)(),
    getFilteredRowModel: manualFiltering ? void 0 : (0, import_react_table2.getFilteredRowModel)(),
    getPaginationRowModel: manualPagination ? void 0 : (0, import_react_table2.getPaginationRowModel)(),
    getSortedRowModel: manualSorting ? void 0 : (0, import_react_table2.getSortedRowModel)(),
    getFacetedRowModel: (0, import_react_table2.getFacetedRowModel)(),
    getFacetedUniqueValues: (0, import_react_table2.getFacetedUniqueValues)(),
    manualPagination,
    manualSorting,
    manualFiltering
  });
  const state = {
    pagination,
    sorting,
    filters: columnFilters,
    columnVisibility,
    rowSelection,
    globalFilter
  };
  React7.useEffect(() => {
    onStateChange?.(state);
  }, [
    pagination,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    globalFilter
  ]);
  const pageCount = table.getPageCount();
  const rowCount = controlledRowCount ?? table.getFilteredRowModel().rows.length;
  const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original);
  const actions = React7.useMemo(
    () => ({
      setPage: (page) => {
        setPagination((prev) => ({ ...prev, pageIndex: page }));
      },
      setPageSize: (size) => {
        setPagination((prev) => ({
          ...prev,
          pageSize: size,
          pageIndex: 0
        }));
      },
      setSort: (columnId, desc) => {
        if (typeof features?.sort === "object" && features.sort.multi) {
          setSorting((prev) => {
            const existing = prev.find((s) => s.id === columnId);
            if (existing) {
              return prev.map(
                (s) => s.id === columnId ? { ...s, desc: desc ?? !s.desc } : s
              );
            }
            return [...prev, { id: columnId, desc: desc ?? false }];
          });
        } else {
          setSorting([{ id: columnId, desc: desc ?? false }]);
        }
      },
      setFilter: (columnId, value) => {
        setColumnFilters((prev) => {
          const existing = prev.find((f) => f.id === columnId);
          if (value === void 0 || value === null || value === "") {
            return prev.filter((f) => f.id !== columnId);
          }
          if (existing) {
            return prev.map(
              (f) => f.id === columnId ? { ...f, value } : f
            );
          }
          return [...prev, { id: columnId, value }];
        });
      },
      setGlobalFilter: (value) => {
        if (typeof features?.search === "object" && features.search.debounce) {
          debouncedGlobalFilter(value);
        } else {
          setGlobalFilter(value);
        }
      },
      toggleColumnVisibility: (columnId) => {
        setColumnVisibility((prev) => ({
          ...prev,
          [columnId]: !prev[columnId]
        }));
      },
      selectRow: (rowId, selected) => {
        setRowSelection((prev) => ({
          ...prev,
          [rowId]: selected ?? !prev[rowId]
        }));
      },
      selectAllRows: (selected) => {
        if (selected === void 0) {
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
      }
    }),
    [features, pagination.pageSize, debouncedGlobalFilter]
  );
  const exportTableData = React7.useCallback(
    (format) => {
      const dataToExport = table.getFilteredRowModel().rows.map((row) => row.original);
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
    table
  };
}

// src/components/ui/badge.tsx
var import_class_variance_authority3 = require("class-variance-authority");
var import_jsx_runtime14 = require("react/jsx-runtime");
var badgeVariants = (0, import_class_variance_authority3.cva)(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
        warning: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

// src/components/ui/checkbox.tsx
var CheckboxPrimitive = __toESM(require("@radix-ui/react-checkbox"));
var import_react_icons2 = require("@radix-ui/react-icons");
var React8 = __toESM(require("react"));
var import_jsx_runtime15 = require("react/jsx-runtime");
var Checkbox = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_icons2.CheckIcon, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// src/components/data-table/utils/columnHelpers.tsx
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime16 = require("react/jsx-runtime");
var formatters = {
  text: (value) => String(value || ""),
  number: (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? "" : num.toLocaleString();
  },
  currency: (value, currency = "USD") => {
    const num = parseFloat(value);
    return isNaN(num) ? "" : new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(num);
  },
  date: (value) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  },
  datetime: (value) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? "" : date.toLocaleString();
  },
  boolean: (value) => {
    return value ? "Yes" : "No";
  }
};
function createColumns(configs) {
  return configs.map((config) => {
    const column = {
      id: String(config.key),
      accessorKey: config.key,
      header: config.sortable !== false ? ({ column: column2 }) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
        Button,
        {
          variant: "ghost",
          onClick: () => column2.toggleSorting(
            column2.getIsSorted() === "asc"
          ),
          className: "-ml-3 h-8 text-left justify-start",
          children: [
            config.header,
            config.sortable && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react6.ArrowUpDown, { className: "ml-2 h-4 w-4" })
          ]
        }
      ) : config.header,
      cell: ({ row, getValue }) => {
        const value = getValue();
        if (config.cell) {
          return config.cell(value, row.original);
        }
        if (config.format && config.format in formatters) {
          return formatters[config.format](value);
        }
        return value;
      },
      enableSorting: config.sortable !== false,
      enableHiding: config.enableHiding !== false
    };
    if (config.align) {
      column.meta = { align: config.align };
    }
    if (config.width) {
      column.size = typeof config.width === "number" ? config.width : void 0;
      column.meta = { ...column.meta, width: config.width };
    }
    return column;
  });
}
var columnHelpers = {
  // Selection column
  select: () => ({
    id: "select",
    header: ({ table }) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      Checkbox,
      {
        checked: table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected() && "indeterminate",
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all"
      }
    ),
    cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      Checkbox,
      {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        "aria-label": "Select row"
      }
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40
  }),
  // Text column
  text: (key, options = {}) => ({
    accessorKey: key,
    header: options.header || String(key),
    enableSorting: options.sortable !== false,
    enableHiding: options.enableHiding !== false,
    cell: options.cell ? ({ row, getValue }) => options.cell(getValue(), row.original) : ({ getValue }) => getValue()
  }),
  // Number column
  number: (key, options = {}) => ({
    accessorKey: key,
    header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        className: "-ml-3 h-8 text-left justify-start",
        children: [
          options.header || String(key),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react6.ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => {
      const value = getValue();
      return formatters.number(value);
    },
    meta: { align: "right" }
  }),
  // Currency column
  currency: (key, options = {}) => ({
    accessorKey: key,
    header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        className: "-ml-3 h-8 text-left justify-start",
        children: [
          options.header || String(key),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react6.ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => {
      const value = getValue();
      return formatters.currency(value, options.currency);
    },
    meta: { align: "right" }
  }),
  // Date column
  date: (key, options = {}) => ({
    accessorKey: key,
    header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        className: "-ml-3 h-8 text-left justify-start",
        children: [
          options.header || String(key),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react6.ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => {
      const value = getValue();
      return formatters.date(value);
    }
  }),
  // Status/Badge column
  status: (key, options = {}) => ({
    accessorKey: key,
    header: options.header || String(key),
    cell: ({ getValue }) => {
      const value = String(getValue());
      const variant = options.variants?.[value] || "default";
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Badge, { variant, children: value });
    }
  }),
  // Actions column
  actions: (actions, options = {}) => ({
    id: "actions",
    header: options.header || "",
    cell: ({ row }) => {
      const visibleActions = actions.filter(
        (action) => !action.show || action.show(row.original)
      );
      if (visibleActions.length === 0) return null;
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(DropdownMenu, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "sr-only", children: "Open menu" }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react6.MoreHorizontal, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DropdownMenuLabel, { children: "Actions" }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DropdownMenuSeparator, {}),
          visibleActions.map((action, index) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
            DropdownMenuItem,
            {
              onClick: () => action.onClick(row.original),
              className: action.variant === "destructive" ? "text-red-600" : "",
              children: [
                action.icon && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(action.icon, { className: "mr-2 h-4 w-4" }),
                action.label
              ]
            },
            index
          ))
        ] })
      ] });
    },
    enableSorting: false,
    enableHiding: false,
    size: 40
  }),
  // Custom column
  custom: (id, renderer, options = {}) => ({
    id,
    header: options.header || "",
    cell: ({ row }) => renderer(row.original),
    enableSorting: false,
    size: options.size
  })
};
function mergeColumns(...columnSets) {
  return columnSets.flat();
}

// src/components/data-table/utils/presets.ts
var tablePresets = {
  simple: {
    sort: true,
    pagination: {
      pageSize: 10,
      pageSizes: [10, 25, 50],
      showInfo: true
    }
  },
  advanced: {
    search: {
      placeholder: "Search...",
      debounce: 300
    },
    sort: {
      multi: true
    },
    pagination: {
      pageSize: 20,
      pageSizes: [10, 20, 50, 100],
      showInfo: true
    },
    selection: {
      multi: true,
      showSelectAll: true
    },
    columnVisibility: true,
    filters: {
      inline: true,
      advanced: false
    },
    export: ["csv", "excel"],
    density: true,
    refresh: false
  },
  "server-side": {
    search: {
      placeholder: "Search...",
      debounce: 500
    },
    sort: {
      multi: false
    },
    pagination: {
      pageSize: 25,
      pageSizes: [25, 50, 100],
      showInfo: true
    },
    selection: false,
    columnVisibility: true,
    filters: {
      inline: true,
      advanced: true
    },
    export: false,
    density: false,
    refresh: true
  }
};
function mergeFeatures(preset, customFeatures) {
  const baseFeatures = preset ? tablePresets[preset] : {};
  if (!customFeatures) return baseFeatures;
  const merged = { ...baseFeatures };
  Object.keys(customFeatures).forEach((key) => {
    const featureKey = key;
    const customValue = customFeatures[featureKey];
    const baseValue = baseFeatures[featureKey];
    if (typeof customValue === "boolean") {
      merged[featureKey] = customValue;
    } else if (typeof customValue === "object" && typeof baseValue === "object") {
      merged[featureKey] = { ...baseValue, ...customValue };
    } else {
      merged[featureKey] = customValue;
    }
  });
  return merged;
}

// src/components/data-table/DataTable.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function isColumnConfig(columns) {
  return columns.length > 0 && "key" in columns[0];
}
function DataTable({
  columns: rawColumns,
  data,
  preset,
  features: customFeatures,
  loading = false,
  error = null,
  onRetry,
  className,
  containerClassName,
  responsive = true,
  skeleton,
  emptyState,
  renderToolbar,
  renderPagination,
  renderEmpty,
  renderError,
  onStateChange,
  onRowClick,
  onRowDoubleClick,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  pageCount,
  rowCount
}) {
  const columns = React9.useMemo(() => {
    if (isColumnConfig(rawColumns)) {
      return createColumns(
        rawColumns
      );
    }
    return rawColumns;
  }, [rawColumns]);
  const features = React9.useMemo(
    () => mergeFeatures(preset, customFeatures),
    [preset, customFeatures]
  );
  const tableData = useDataTable({
    data,
    columns,
    features,
    manualPagination,
    manualSorting,
    manualFiltering,
    pageCount,
    rowCount,
    onStateChange
  });
  const { table, state, actions } = tableData;
  const [isMobile, setIsMobile] = React9.useState(false);
  React9.useEffect(() => {
    const checkMobile = () => {
      const breakpoint = typeof responsive === "object" && responsive.breakpoint ? responsive.breakpoint : 768;
      setIsMobile(window.innerWidth < breakpoint);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [responsive]);
  if (loading) {
    const skeletonConfig = typeof skeleton === "object" ? skeleton : {};
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: containerClassName, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      DataTableSkeleton,
      {
        columns: columns.length,
        rows: skeletonConfig.rows || 5,
        showHeaders: skeletonConfig.showHeaders !== false,
        animate: skeletonConfig.animate !== false
      }
    ) });
  }
  if (error) {
    if (renderError) {
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_jsx_runtime17.Fragment, { children: renderError(error, onRetry || (() => {
      })) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: containerClassName, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(Alert, { variant: "destructive", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react7.AlertCircle, { className: "h-4 w-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(AlertTitle, { children: "Error" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(AlertDescription, { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: error.message || "An error occurred while loading the data." }),
        onRetry && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onRetry,
            className: "ml-4",
            children: "Retry"
          }
        )
      ] })
    ] }) });
  }
  if (isMobile && responsive) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: containerClassName, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      DataTableMobile,
      {
        table,
        columns,
        data,
        features,
        config: typeof responsive === "object" ? responsive : {},
        onRowClick
      }
    ) });
  }
  const isEmpty = table.getRowModel().rows.length === 0;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: cn("space-y-4", containerClassName), children: [
    features.search || features.filters || features.columnVisibility || features.export ? renderToolbar ? renderToolbar(table) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      DataTableToolbar,
      {
        table,
        features,
        globalFilter: state.globalFilter,
        onGlobalFilterChange: actions.setGlobalFilter,
        onExport: tableData.exportData
      }
    ) : null,
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "rounded-md border", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(Table, { className, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(TableRow, { children: headerGroup.headers.map((header) => {
        const meta = header.column.columnDef.meta;
        return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          TableHead,
          {
            colSpan: header.colSpan,
            style: {
              width: meta?.width,
              textAlign: meta?.align
            },
            children: header.isPlaceholder ? null : (0, import_react_table3.flexRender)(
              header.column.columnDef.header,
              header.getContext()
            )
          },
          header.id
        );
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(TableBody, { children: isEmpty ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: renderEmpty ? renderEmpty() : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(DataTableEmpty, { config: emptyState })
        }
      ) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          onClick: () => onRowClick?.(row.original),
          onDoubleClick: () => onRowDoubleClick?.(row.original),
          className: cn(
            onRowClick && "cursor-pointer hover:bg-muted/50",
            row.getIsSelected() && "bg-muted"
          ),
          children: row.getVisibleCells().map((cell) => {
            const meta = cell.column.columnDef.meta;
            return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
              TableCell,
              {
                style: {
                  textAlign: meta?.align
                },
                children: (0, import_react_table3.flexRender)(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )
              },
              cell.id
            );
          })
        },
        row.id
      )) })
    ] }) }),
    features.pagination && !isEmpty ? renderPagination ? renderPagination({
      pageIndex: state.pagination.pageIndex,
      pageSize: state.pagination.pageSize,
      pageCount: tableData.pageCount,
      canPreviousPage: table.getCanPreviousPage(),
      canNextPage: table.getCanNextPage(),
      previousPage: () => table.previousPage(),
      nextPage: () => table.nextPage(),
      setPageIndex: actions.setPage,
      setPageSize: actions.setPageSize
    }) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      DataTablePagination,
      {
        table,
        features,
        pageSizes: typeof features.pagination === "object" ? features.pagination.pageSizes : void 0
      }
    ) : null
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataTable,
  columnHelpers,
  createColumns,
  exportData,
  mergeColumns,
  tablePresets,
  useDataTable
});
//# sourceMappingURL=index.js.map