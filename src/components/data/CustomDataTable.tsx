import {
  DataGrid,
  type GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { type SxProps, type Theme } from '@mui/material';

// 1. Definição do Slot Customizado (Barra de Ferramentas)
// Adicionamos o botão "Adicionar Novo" junto com as ferramentas padrão de Exportar e Filtrar.
interface CustomToolbarProps {
  onAddClick: () => void;
}

function CustomToolbar({ onAddClick }: CustomToolbarProps) {
  return (
    <GridToolbarContainer sx={{ p: 1, borderBottom: '1px solid #e0e0e0' }}>
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <Button
        startIcon={<AddIcon />}
        onClick={onAddClick}
        variant="outlined"
        size="small"
        sx={{ ml: 2 }}
      >
        Adicionar Novo
      </Button>
    </GridToolbarContainer>
  );
}

// 2. Definição das Props do Componente Principal
interface CustomDataTableProps {
  rows: any[]; // Os dados da tabela
  columns: GridColDef[]; // A definição das colunas
  // Aceita estilos customizados para o DataGrid
  customStyles?: SxProps<Theme>;
  // Função que será chamada ao clicar no botão "Adicionar Novo"
  onAddClick: () => void;
}

// 3. O Componente Principal (Reutilizável e Customizável)
export default function CustomDataTable({
  rows,
  columns,
  customStyles,
  onAddClick,
}: CustomDataTableProps) {
  return (
    <Paper sx={{ height: 500, width: '100%', p: 1, boxShadow: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        
        // 4. Personalização de Layout (SLOTS)
        slots={{
          toolbar: () => <CustomToolbar onAddClick={onAddClick} />,
        }}

        // 5. Estilização Customizada (SX)
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5', // Fundo no cabeçalho
            fontWeight: 'bold',
          },
          ...customStyles, // Permite que a página adicione seus próprios estilos
        }}
      />
    </Paper>
  );
}