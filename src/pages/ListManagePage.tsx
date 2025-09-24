// src/pages/ListManagePage.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Importamos o componente List E a interface BaseListItem
import List from '../components/List/List';
import type { BaseListItem } from '../components/List/List';

// -------------------------------------------------------------
// Passo 6: Definir a interface ListItem ESPECÍFICA para esta página.
// Esta interface EXTENDE BaseListItem e ADICIONA as propriedades que você precisa.
// 'name' é obrigatório para os itens gerenciados NESTA PÁGINA.
interface MyListItem extends BaseListItem {
  name?: string;
  description?: string;
  // Outros campos específicos da lista de criação/gerenciamento podem vir aqui
}

// Vamos manter o estado aqui para simular o gerenciamento
const initialManagedItems: MyListItem[] = [ // Usamos MyListItem aqui
  { id: uuidv4(), name: 'Gerenciar Item A', description: 'Descrição do item A para edição.' },
  { id: uuidv4(), name: 'Gerenciar Item B', description: 'Descrição do item B para edição.' },
];

function ListManagePage() {
  const [managedItems, setManagedItems] = useState<MyListItem[]>(initialManagedItems); // Usa MyListItem
  const [editingItem, setEditingItem] = useState<MyListItem | null>(null); // Usa MyListItem
  const [editName, setEditName] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');

  const handleEditClick = (item: MyListItem) => { // item é do tipo MyListItem
    setEditingItem(item);
    setEditName(item.name || '');
    setEditDescription(item.description || '');
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || editName.trim() === '') return;

    setManagedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editingItem.id
          ? { ...item, name: editName, description: editDescription } as MyListItem // Assegura que o tipo é MyListItem
          : item
      )
    );
    setEditingItem(null); // Fecha o formulário de edição
    setEditName('');
    setEditDescription('');
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      setManagedItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  return (
    <div>
      <h2>Gerenciar Itens da Lista</h2>

      {editingItem ? (
        <form onSubmit={handleUpdateItem} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #007bff', borderRadius: '8px', maxWidth: '400px' }}>
          <h3>Editando: {editingItem.name}</h3>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="editItemName" style={{ display: 'block', marginBottom: '5px' }}>Nome:</label>
            <input
              id="editItemName"
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="editItemDescription" style={{ display: 'block', marginBottom: '5px' }}>Descrição:</label>
            <textarea
              id="editItemDescription"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              rows={3}
            />
          </div>
          <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
            Salvar Alterações
          </button>
          <button type="button" onClick={() => setEditingItem(null)} style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancelar
          </button>
        </form>
      ) : (
        <p>Selecione um item abaixo para editar ou excluir.</p>
      )}

      <h3>Itens Gerenciáveis:</h3>
      {/* -------------------------------------------------------------
          Passo 7: Ao usar o componente List, o TypeScript infere que T é MyListItem.
          A propriedade 'name' e 'description' estão garantidas para o renderItem aqui. */}
      <List
        title="Minha Lista Gerenciável"
        items={managedItems}
        renderItem={(item: MyListItem) => ( // TypeScript infere o tipo correto de item
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div>
              <strong>{item.name}</strong>
              {item.description && <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>{item.description}</p>}
            </div>
            <div>
              <button onClick={() => handleEditClick(item)} style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}>
                Editar
              </button>
              <button onClick={() => handleDeleteItem(item.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Excluir
              </button>
            </div>
          </div>
        )}
        emptyMessage="Não há itens para gerenciar. Crie alguns!"
      />
    </div>
  );
}

export default ListManagePage;