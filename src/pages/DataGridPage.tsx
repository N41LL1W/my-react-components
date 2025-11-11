import { type GridColDef } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { type SxProps, type Theme } from '@mui/material';
import CustomDataTable from '../components/data/CustomDataTable';

// Dados de Exemplo (para teste)
const testRows = [
  { id: 1, nome: 'Ana Silva', status: 'Ativo', idade: 35, email: 'ana@teste.com' },
  { id: 2, nome: 'Bruno Costa', status: 'Pendente', idade: 42, email: 'bruno@teste.com' },
  { id: 3, nome: 'Carla Dias', status: 'Ativo', idade: 28, email: 'carla@teste.com' },
  { id: 4, nome: 'David Souza', status: 'Inativo', idade: 51, email: 'david@teste.com' },
  { id: 5, nome: 'Eva Lima', status: 'Ativo', idade: 19, email: 'eva@teste.com' },
];

// 1. Definição das Colunas com Customização
const customColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'nome', headerName: 'Nome Completo', width: 200 },
  {
    field: 'idade',
    headerName: 'Idade',
    type: 'number',
    width: 90,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    // 2. Personalização da Renderização de Células (renderCell)
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'Ativo' ? 'success' : 'warning'}
        variant="outlined"
        size="small"
      />
    ),
  },
  {
    field: 'actions',
    headerName: 'Ações',
    width: 150,
    sortable: false,
    // 3. Adicionando Ações (Botão)
    renderCell: (params) => (
      <Button
        variant="contained"
        size="small"
        onClick={() => alert(`Ação de clique na linha ID: ${params.row.id}`)}
        sx={{ backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
      >
        Detalhes
      </Button>
    ),
  },
];

// 4. Estilos Customizados da Página (para testar o 'customStyles' prop)
const pageCustomStyles: SxProps<Theme> = {
  // Sobrescreve o estilo das linhas ímpares
  '& .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: '#fff3e0', // Fundo Laranja Claro
  },
  // Alinha o texto do cabeçalho centralmente
  '& .MuiDataGrid-columnHeaderTitle': {
    textAlign: 'center', 
    width: '100%',
  },
};

// Componente da Página
export default function DataGridPage() {
  const handleAddClick = () => {
    alert('Função de adicionar novo item ativada!');
  };

  return (
    <Box sx={{ p: 4 }}>
      <h1 className="text-2xl font-bold mb-4">Demonstração da Tabela Customizada (MUI DataGrid)</h1>
      
      {/* 5. Uso do Componente com todas as Props e Estilos */}
      <CustomDataTable
        rows={testRows}
        columns={customColumns}
        onAddClick={handleAddClick}
        customStyles={pageCustomStyles} // Aplicação dos estilos customizados
      />
    </Box>
  );
}