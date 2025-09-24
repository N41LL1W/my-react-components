// src/pages/ListComponentPage.tsx
import List from '../components/List/List';

function ListComponentPage() {
  const myItems = [
    { id: '1', text: 'Item 1 da Lista' },
    { id: '2', text: 'Item 2 da Lista' },
    { id: '3', text: 'Item 3 da Lista' },
  ];

  const handleItemClick = (item: { id: string; text: string }) => {
    alert(`Você clicou no item: ${item.text}`);
  };

  return (
    <div>
      <h2>Página do Componente de Lista</h2>
      <p>Aqui você pode ver e interagir com o componente de lista.</p>

      <h3>Exemplo de Uso:</h3>
      <List
        title="Minha Primeira Lista"
        items={myItems}
        onItemClick={handleItemClick}
      />

      <h3>Outra Lista (sem título e sem clique):</h3>
      <List
        items={[
          { id: 'a', text: 'Maçã' },
          { id: 'b', text: 'Banana' },
          { id: 'c', text: 'Laranja' },
        ]}
      />

      {/* Adicione mais exemplos, documentação ou controles aqui */}
    </div>
  );
}

export default ListComponentPage;