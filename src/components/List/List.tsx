// src/components/List/List.tsx
import React from 'react';
import styles from './List.module.css';

interface ListItem {
  id: string;
  text: string;
}

interface ListProps {
  items: ListItem[];
  title?: string;
  onItemClick?: (item: ListItem) => void;
}

const List: React.FC<ListProps> = ({ items, title, onItemClick }) => {
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
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;