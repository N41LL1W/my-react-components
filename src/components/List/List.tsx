import React from 'react';
import styles from './List.module.css';

// -------------------------------------------------------------
// Passo 1: Definir uma interface base que TUDO que for para a lista deve ter.
// 'id' é o mínimo necessário para as chaves do React.
// '[key: string]: any;' permite que qualquer item tenha PROPRIEDADES ADICIONAIS.
export interface BaseListItem {
  id: string;
  [key: string]: any; // Permite qualquer outra propriedade.
}

// -------------------------------------------------------------
// Passo 2: O componente ListProps e o próprio componente List
// agora usam um TIPO GENÉRICO <T> que DEVE estender BaseListItem.
interface ListProps<T extends BaseListItem> {
  items: T[];
  title?: string;
  onItemClick?: (item: T) => void;
  // A função renderItem também recebe um item do tipo T
  renderItem?: (item: T) => React.ReactNode;
  emptyMessage?: string | React.ReactNode;
  isLoading?: boolean;
}

// -------------------------------------------------------------
// Passo 3: O componente List é uma função genérica.
const List = <T extends BaseListItem>({
  items,
  title,
  onItemClick,
  renderItem,
  emptyMessage = "Nenhum item encontrado.",
  isLoading = false,
}: ListProps<T>) => {

  if (isLoading) {
    return <div className={styles.listContainer}>Carregando itens...</div>;
  }

  if (!items || items.length === 0) {
    return (
      <div className={styles.listContainer}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {title && <h3 className={styles.listTitle}>{title}</h3>}
      <ul className={styles.unorderedList}>
        {items.map((item) => (
          <li
            key={item.id}
            className={styles.listItem}
            onClick={() => onItemClick && onItemClick(item)}
          >
            {/* Se renderItem for fornecido, use-o. Caso contrário, mostre o ID
                (pois 'text' ou 'name' não são garantidos aqui).
                Mas como você sempre usa renderItem, isso é um fallback seguro. */}
            {renderItem ? renderItem(item) : item.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(List);