import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; // 1. Componente (valor) importado normalmente

// 2. Tipos (interfaces) importados com 'type'
import type { 
  GridColDef, 
  GridRowsProp 
} from '@mui/x-data-grid'; 

// --- Tipagem de Propriedades ---
// O componente aceita qualquer tipo de objeto para as linhas (rows), 
// e requer a definição de GridColDef do MUI para as colunas.
interface CustomDataTableProps {
  rows: GridRowsProp;        // O array de dados
  columns: GridColDef[];   // A definição das colunas
  // Propriedades opcionais
  loading?: boolean;         // Para mostrar o estado de carregamento
  pageSize?: number;         // Número de linhas por página (padrão 5)
  height?: string;           // Altura da tabela (padrão '400px')
}

// --- Componente Principal ---
export default function CustomDataTable({ 
  rows, 
  columns, 
  loading = false, 
  pageSize = 5,
  height = '400px'
}: CustomDataTableProps) {

  // O componente Box garante que a tabela tenha uma altura definida e funcione corretamente
  return (
    <Box 
      sx={{ 
        height: height, 
        width: '100%', 
        // Adaptação de cores para temas claro/escuro
        '& .MuiDataGrid-root': {
            borderColor: 'transparent',
        },
        '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(240, 240, 240, 0.1)', // Cor de fundo do cabeçalho
        },
        '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitle': {
            color: 'inherit', // Herda a cor do tema (claro ou escuro)
        },
        // Correção de estilo para garantir que o DataGrid se adapte
        '& .MuiDataGrid-virtualScrollerContent': {
            color: 'inherit',
        },
        
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        // Configurações de paginação
        initialState={{
          pagination: { paginationModel: { pageSize: pageSize } },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick // Desabilita a seleção de linha por clique
        autoPageSize={false}
      />
    </Box>
  );
}

// --- Definições de Exemplo (Para uso na HomePage) ---

// 1. Definição das Colunas
// 'field' deve corresponder à chave do objeto na linha (row)
export const initialColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'Nome', width: 150, editable: true },
  { field: 'lastName', headerName: 'Sobrenome', width: 150, editable: true },
  {
    field: 'age',
    headerName: 'Idade',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Nome Completo',
    description: 'Esta coluna não pode ser ordenada.',
    sortable: false,
    width: 200,
    // Uso do underscore (_) no 'value' para evitar o warning, pois não é utilizado diretamente
    valueGetter: (_, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

// 2. Definição das Linhas (Dados de Exemplo)
export const initialRows: GridRowsProp = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: 'Ramin', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];