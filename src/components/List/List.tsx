import React, { useRef } from "react";
import clsx from "clsx";

export interface BaseListItem {
  id: string;
}

export interface ListProps<T extends BaseListItem> {
  title?: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;
  emptyMessage?: string;
  isLoading?: boolean;
  sortable?: boolean;
  onSort?: (sortBy: keyof T, direction: "asc" | "desc") => void;
  currentSortBy?: keyof T;
  currentSortDirection?: "asc" | "desc";
  filterable?: boolean;
  onFilterChange?: (value: string) => void;
  currentFilterValue?: string;
}

function List<T extends BaseListItem>({
  title,
  items,
  renderItem,
  onItemClick,
  emptyMessage = "Nenhum item encontrado.",
  isLoading = false,
  sortable = false,
  onSort,
  currentSortBy,
  currentSortDirection = "asc",
  filterable = false,
  onFilterChange,
  currentFilterValue = "",
}: ListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "w-full max-w-3xl mx-auto rounded-2xl shadow-lg border overflow-hidden transition-colors",
        "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
      )}
    >
      {/* Cabeçalho fixo */}
      <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 p-4 border-b dark:border-gray-700">
        {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}

        <div className="flex flex-wrap items-center justify-between gap-3">
          {filterable && (
            <input
              type="text"
              value={currentFilterValue}
              onChange={(e) => onFilterChange?.(e.target.value)}
              placeholder="Filtrar..."
              className="p-2 w-full sm:w-60 rounded-md border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          )}

          {sortable && onSort && items.length > 0 && (
            <div className="flex gap-2 items-center">
              <select
                value={String(currentSortBy ?? "")}
                onChange={(e) =>
                  onSort(e.target.value as keyof T, currentSortDirection)
                }
                className="p-2 rounded-md border dark:border-gray-700 dark:bg-gray-800"
              >
                {Object.keys(items[0]).map((key) => (
                  <option key={String(key)} value={key}>
                    {key}
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  onSort(
                    (currentSortBy as keyof T) ?? (Object.keys(items[0])[0] as keyof T),
                    currentSortDirection === "asc" ? "desc" : "asc"
                  )
                }
                className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {currentSortDirection === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Corpo da lista (scrollável) */}
      <div className="max-h-[70vh] overflow-y-auto">
        {isLoading ? (
          <p className="p-4 text-gray-500 italic">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="p-4 text-gray-500 italic">{emptyMessage}</p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => onItemClick?.(item)}
                className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {renderItem(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default List;
