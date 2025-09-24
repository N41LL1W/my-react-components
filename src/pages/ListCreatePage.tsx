// src/pages/ListCreatePage.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos
// Importamos o componente List E a interface BaseListItem (se quiser tipar explicitamente)
import List from '../components/List/List';
import type { BaseListItem } from '../components/List/List';

// -------------------------------------------------------------
// Passo 4: Definir a interface ListItem ESPECÍFICA para esta página.
// Esta interface EXTENDE BaseListItem e ADICIONA as propriedades que você precisa.
// Agora 'name' é explicitamente obrigatório para os itens gerenciados NESTA PÁGINA.
interface MyListItem extends BaseListItem {
  name: string;
  description?: string;
  // Outros campos específicos da lista de criação/gerenciamento podem vir aqui
}

// Vamos usar um estado global simples para simular um "banco de dados" de itens
const initialItems: MyListItem[] = [ // Usamos MyListItem aqui
  { id: uuidv4(), name: 'Primeiro Item', description: 'Este é um item inicial.' },
  { id: uuidv4(), name: 'Segundo Item', description: 'Outro item para começar.' },
];

function ListCreatePage() {
  const [currentListItems, setCurrentListItems] = useState<MyListItem[]>(initialItems); // Usa MyListItem
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemDescription, setNewItemDescription] = useState<string>('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim() === '') return;

    const newItem: MyListItem = { // O novo item é do tipo MyListItem
      id: uuidv4(),
      name: newItemName,
      description: newItemDescription,
    };

    setCurrentListItems((prevItems) => [...prevItems, newItem]);
    setNewItemName('');
    setNewItemDescription('');
  };

  return (
    <div>
      <h2>Criar Novo Item para a Lista</h2>

      <form onSubmit={handleAddItem} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', maxWidth: '400px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="itemName" style={{ display: 'block', marginBottom: '5px' }}>Nome do Item:</label>
          <input
            id="itemName"
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Ex: Tarefa Importante"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="itemDescription" style={{ display: 'block', marginBottom: '5px' }}>Descrição:</label>
          <textarea
            id="itemDescription"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            placeholder="Detalhes do item..."
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            rows={3}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Adicionar Item
        </button>
      </form>

      <h3>Lista Atual:</h3>
      {/* -------------------------------------------------------------
          Passo 5: Ao usar o componente List, o TypeScript infere que T é MyListItem.
          A propriedade 'name' e 'description' estão garantidas para o renderItem aqui. */}
      <List
        title="Itens Criados"
        items={currentListItems}
        renderItem={(item) => ( // Tipar item explicitamente para garantir as propriedades
          <div>
            <strong>{item.name}</strong>
            {item.description && <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>{item.description}</p>}
          </div>
        )}
        emptyMessage="Comece a adicionar itens usando o formulário acima!"
      />
    </div>
  );
}

export default ListCreatePage;