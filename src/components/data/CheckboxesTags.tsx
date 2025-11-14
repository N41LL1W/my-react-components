import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// --- Tipagem de Dados ---
// Define o formato esperado para cada opção
interface OptionType {
  title: string;
  year?: number; // 'year' é opcional se você não precisar dele em todas as listas
}

// --- Tipagem do Componente ---
// Define as propriedades que o componente aceita
interface CheckboxesTagsProps {
  options: OptionType[]; // A lista de opções (dados) que será exibida
  label?: string; // Label do campo (opcional)
  // Função que o componente pai pode usar para saber o que foi selecionado
  onSelectionChange?: (selected: OptionType[]) => void; 
}

// Ícones usados para a caixa de seleção
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// --- Componente Principal ---
export default function CheckboxesTags({ options, label = "Selecione Opções", onSelectionChange }: CheckboxesTagsProps) {
  
  // 1. Gerencia o estado dos itens SELECIONADOS
  const [selectedItems, setSelectedItems] = useState<OptionType[]>([]);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      
      // 2. Propriedades de Dados e Estado
      options={options} // 👈 Recebe a lista de dados via props
      value={selectedItems} // 👈 Item(ns) selecionado(s)
      onChange={(event, newValue) => {
        // Atualiza o estado interno
        setSelectedItems(newValue);
        
        // Notifica o componente pai, se a função onSelectionChange foi fornecida
        if (onSelectionChange) {
          onSelectionChange(newValue);
        }
      }}

      disableCloseOnSelect
      getOptionLabel={(option) => option.title}

      // 3. Renderização Customizada da Opção (com Checkbox)
      renderOption={(props, option, { selected }) => {
        // O MUI já inclui a key nas props, basta desestruturar ou espalhar o resto
        const { key, ...optionProps } = props as any;
        return (
          // Usamos a key para manter a integridade do React
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}

      style={{ width: 500 }}
      
      // 4. Renderização do Campo de Entrada
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={label} // 👈 Usa a prop 'label'
          placeholder="Comece a digitar..." 
        />
      )}
    />
  );
}

// --- Dados Estáticos de Exemplo (Para Teste) ---
// Normalmente, estes dados ficariam na página que usa o componente, 
// mas os mantemos aqui como um exemplo de como eles devem ser estruturados.
export const top100Films: OptionType[] = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  // ... adicione o restante da sua lista de filmes aqui ...
];