import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "../components/List/List";
import type { BaseListItem } from "../components/List/List";

// Definimos uma interface específica para os itens desta página
interface MyListItem extends BaseListItem {
  name: string;
  description?: string;
  createdAt: number; // campo usado para ordenação
}

// Exemplo de um tipo de item mais complexo
interface Product extends BaseListItem {
  name: string;
  price: number;
  category: string;
  createdAt: number; // campo usado para ordenação
}

function ListPage() {
  const [itemsList1, setItemsList1] = useState<MyListItem[]>([
    {
      id: uuidv4(),
      name: "Estudar React",
      description: "Revisar hooks e componentes",
      createdAt: Date.now() - 50000000,
    },
    {
      id: uuidv4(),
      name: "Fazer compras",
      description: "Comprar frutas e vegetais",
      createdAt: Date.now() - 30000000,
    },
    {
      id: uuidv4(),
      name: "Trabalho de faculdade",
      description: "Finalizar relatório",
      createdAt: Date.now() - 10000000,
    },
    {
      id: uuidv4(),
      name: "Academia",
      description: "Treino de pernas",
      createdAt: Date.now() - 70000000,
    },
  ]);

  const [productsList, setProductsList] = useState<Product[]>([
    {
      id: uuidv4(),
      name: "Smartphone Pro",
      price: 999.99,
      category: "Eletrônicos",
      createdAt: Date.now() - 20000000,
    },
    {
      id: uuidv4(),
      name: "Fone de Ouvido",
      price: 150.0,
      category: "Eletrônicos",
      createdAt: Date.now() - 80000000,
    },
    {
      id: uuidv4(),
      name: "Teclado Mecânico",
      price: 280.5,
      category: "Periféricos",
      createdAt: Date.now() - 10000000,
    },
    {
      id: uuidv4(),
      name: "Mouse Gamer",
      price: 120.0,
      category: "Periféricos",
      createdAt: Date.now() - 60000000,
    },
  ]);

  // --- Estados para a ordenação e filtragem da List 1 ---
  const [sortByList1, setSortByList1] = useState<string>("name");
  const [sortDirectionList1, setSortDirectionList1] = useState<
    "asc" | "desc"
  >("asc");
  const [filterValueList1, setFilterValueList1] = useState<string>("");

  const filteredAndSortedList1 = useMemo(() => {
    let currentItems = [...itemsList1];

    if (filterValueList1) {
      currentItems = currentItems.filter(
        (item) =>
          item.name.toLowerCase().includes(filterValueList1.toLowerCase()) ||
          (item.description &&
            item.description
              .toLowerCase()
              .includes(filterValueList1.toLowerCase()))
      );
    }

    if (sortByList1) {
      currentItems.sort((a, b) => {
        const aValue = a[sortByList1 as keyof MyListItem];
        const bValue = b[sortByList1 as keyof MyListItem];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirectionList1 === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirectionList1 === "asc" ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    return currentItems;
  }, [itemsList1, sortByList1, sortDirectionList1, filterValueList1]);

  // --- Estados para a ordenação e filtragem da Products List ---
  const [sortByProducts, setSortByProducts] = useState<string>("name");
  const [sortDirectionProducts, setSortDirectionProducts] = useState<
    "asc" | "desc"
  >("asc");
  const [filterValueProducts, setFilterValueProducts] = useState<string>("");

  const filteredAndSortedProducts = useMemo(() => {
    let currentProducts = [...productsList];

    if (filterValueProducts) {
      currentProducts = currentProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(filterValueProducts.toLowerCase()) ||
          product.category
            .toLowerCase()
            .includes(filterValueProducts.toLowerCase())
      );
    }

    if (sortByProducts) {
      currentProducts.sort((a, b) => {
        const aValue = a[sortByProducts as keyof Product];
        const bValue = b[sortByProducts as keyof Product];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirectionProducts === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirectionProducts === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
        return 0;
      });
    }

    return currentProducts;
  }, [productsList, sortByProducts, sortDirectionProducts, filterValueProducts]);

  // Funções separadas de clique
  const handleTaskClick = (item: MyListItem) => {
    alert(`Você clicou na tarefa: ${item.name}`);
  };

  const handleProductClick = (product: Product) => {
    alert(
      `Você clicou no produto: ${product.name} - R$ ${product.price.toFixed(2)}`
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Demonstrações do Componente de Lista</h1>
      <p>Explore as diversas funcionalidades do componente `List` abaixo.</p>

      {/* --- Lista de Tarefas --- */}
      <h3 className="text-xl font-semibold">Lista de Tarefas</h3>
      <List
        title="Minhas Tarefas"
        items={filteredAndSortedList1}
        onItemClick={handleTaskClick}
        renderItem={(item) => (
          <div className="flex justify-between items-center w-full">
            <div>
              <strong>{item.name}</strong>
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
            </div>
            <span className="text-xs text-gray-400">
              Criado em: {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
        sortable
        onSort={(sortBy, direction) => {
          setSortByList1(sortBy);
          setSortDirectionList1(direction);
        }}
        currentSortBy={sortByList1}
        currentSortDirection={sortDirectionList1}
        filterable
        onFilterChange={setFilterValueList1}
        currentFilterValue={filterValueList1}
      />

      {/* --- Lista de Produtos --- */}
      <h3 className="text-xl font-semibold">Lista de Produtos</h3>
      <List
        title="Meus Produtos Eletrônicos"
        items={filteredAndSortedProducts}
        onItemClick={handleProductClick}
        renderItem={(product) => (
          <div className="flex items-center gap-4 py-2">
            <div className="flex-grow">
              <strong>{product.name}</strong>
              <p className="text-sm text-gray-600">
                Categoria: {product.category}
              </p>
            </div>
            <span className="font-bold text-green-600">
              R$ {product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400">
              Criado em: {new Date(product.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
        sortable
        onSort={(sortBy, direction) => {
          setSortByProducts(sortBy);
          setSortDirectionProducts(direction);
        }}
        currentSortBy={sortByProducts}
        currentSortDirection={sortDirectionProducts}
        filterable
        onFilterChange={setFilterValueProducts}
        currentFilterValue={filterValueProducts}
      />

      {/* --- Lista Vazia --- */}
      <h3 className="text-xl font-semibold">Lista Vazia</h3>
      <List
        title="Lista de Lembretes"
        items={[]}
        emptyMessage="Nenhum lembrete para hoje!"
        isLoading={false}
      />

      {/* --- Lista Carregando --- */}
      <h3 className="text-xl font-semibold">Lista Carregando</h3>
      <List title="Dados do Servidor" items={[]} isLoading />
    </div>
  );
}

export default ListPage;
