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
  onItemClick?: (item: T) => void;
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

// ================== Componentes Internos ==================

function ListHeader({ title }: { title?: string }) {
  if (!title) return null;
  return (
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2>
  );
}

function ListFilter({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  if (!onChange) return null;
  return (
    <div className="mb-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filtrar..."
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

function ListSort<T extends BaseListItem>({
  items,
  currentSortBy,
  currentSortDirection,
  onSort,
}: {
  items: T[];
  currentSortBy?: keyof T;
  currentSortDirection?: "asc" | "desc";
  onSort?: (sortBy: keyof T, direction: "asc" | "desc") => void;
}) {
  if (!onSort || items.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-3">
      <label className="text-sm text-gray-600">Ordenar por:</label>
      <select
        value={String(currentSortBy ?? "")}
        onChange={(e) =>
          onSort(e.target.value as keyof T, currentSortDirection ?? "asc")
        }
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {Object.keys(items[0]).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      <button
        onClick={() =>
          onSort(
            (currentSortBy as keyof T) ?? (Object.keys(items[0])[0] as keyof T),
            currentSortDirection === "asc" ? "desc" : "asc"
          )
        }
        className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
      >
        {currentSortDirection === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
      </button>
    </div>
  );
}

function ListBody<T extends BaseListItem>({
  items,
  renderItem,
  onItemClick,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;
}) {
  return (
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
  );
}

function ListEmpty({ message }: { message: string }) {
  return <p className="text-gray-500 italic">{message}</p>;
}

function ListLoading() {
  return <p className="text-gray-500 italic">Carregando...</p>;
}

// ================== Componente Principal ==================

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
      <ListHeader title={title} />
      {filterable && <ListFilter value={currentFilterValue} onChange={onFilterChange} />}
      {sortable && <ListSort
        items={items}
        currentSortBy={currentSortBy}
        currentSortDirection={currentSortDirection}
        onSort={onSort}
      />}
      {isLoading ? (
        <ListLoading />
      ) : items.length === 0 ? (
        <ListEmpty message={emptyMessage} />
      ) : (
        <ListBody items={items} renderItem={renderItem} onItemClick={onItemClick} />
      )}
    </div>
  );
}

export default List;
