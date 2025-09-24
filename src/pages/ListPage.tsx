import List from '../components/List/List';

// Exemplo de um tipo de item mais complexo
interface Product {
  id: string;
  name: string;
  price: number;
}

function ListComponentPage() {
  const myItems = [
    { id: '1', text: 'Item 1 da Lista' },
    { id: '2', text: 'Item 2 da Lista' },
    { id: '3', text: 'Item 3 da Lista' },
  ];

  const products: Product[] = [
    { id: 'p1', name: 'Smartphone', price: 999.99 },
    { id: 'p2', name: 'Notebook', price: 1499.00 },
    { id: 'p3', name: 'Smartwatch', price: 299.50 },
  ];

  const handleItemClick = (item: { id: string; text?: string; [key: string]: any }) => {
    alert(`Você clicou no item: ${item.text || item.name || item.id}`);
  };

  return (
    <div>
      <h2>Página do Componente de Lista</h2>
      <p>Aqui você pode ver e interagir com o componente de lista.</p>

      <h3>Lista Simples com Click:</h3>
      <List
        title="Minha Primeira Lista"
        items={myItems}
        onItemClick={handleItemClick}
      />

      <h3>Lista de Produtos (com renderItem customizado):</h3>
      <List
        title="Meus Produtos"
        items={products}
        onItemClick={handleItemClick}
        renderItem={(product) => (
          <div>
            <strong>{product.name}</strong> - R$ {product.price.toFixed(2)}
          </div>
        )}
      />

      <h3>Lista Vazia:</h3>
      <List
        title="Lista Vazia"
        items={[]}
        emptyMessage="Parece que não há produtos cadastrados no momento."
      />

      <h3>Lista Carregando:</h3>
      <List
        title="Carregando Dados"
        items={[]}
        isLoading={true}
      />

      {/* Adicione mais exemplos, documentação ou controles aqui */}
    </div>
  );
}

export default ListComponentPage;