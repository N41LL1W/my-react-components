import React from "react";
import clsx from "clsx";

// Tipo base mínimo para qualquer item da lista
export interface BaseListItem {
  id: string;
}

// Props genéricas do List
export interface ListProps<T extends BaseListItem> {
  title?: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void; // ✅ corrigido para ser genérico
  emptyMessage?: string;
  isLoading?: boolean;

  // Ordenação
  sortable?: boolean;
  onSort?: (sortBy: keyof T, direction: "asc" | "desc") => void;
  currentSortBy?: keyof T;
  currentSortDirection?: "asc" | "desc";

  // Filtragem
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
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow rounded-2xl">
      {title && (
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2>
      )}

      {/* Filtro */}
      {filterable && (
        <div className="mb-3">
          <input
            type="text"
            value={currentFilterValue}
            onChange={(e) => onFilterChange?.(e.target.value)}
            placeholder="Filtrar..."
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Ordenação */}
      {sortable && onSort && (
        <div className="flex items-center gap-2 mb-3">
          <label className="text-sm text-gray-600">Ordenar por:</label>
          <select
            value={String(currentSortBy ?? "")}
            onChange={(e) =>
              onSort(e.target.value as keyof T, currentSortDirection)
            }
            className="p-1 border rounded-md"
          >
            {items.length > 0 &&
              Object.keys(items[0]).map((key) => (
                <option key={key} value={key}>
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
            className="px-2 py-1 border rounded-md text-sm"
          >
            {currentSortDirection === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
          </button>
        </div>
      )}

      {/* Estado de carregamento */}
      {isLoading ? (
        <p className="text-gray-500 italic">Carregando...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 italic">{emptyMessage}</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li
              key={item.id}
              className={clsx(
                "p-3 cursor-pointer hover:bg-gray-50 transition-colors"
              )}
              onClick={() => onItemClick?.(item)}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;
