import React, { useState, useMemo } from 'react';
import { 
    TextField, Button as MuiButton, Box, MenuItem, Select, InputLabel, 
    FormControl, Typography, Paper, Container, Grid, Divider, CircularProgress, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow 
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

// Ícones para CheckboxesTags
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Componentes DataGrid (Substituído por Tabela MUI simples para evitar erro de dependência)
// import { DataGrid } from '@mui/x-data-grid'; 
// import type { GridColDef, GridRowsProp } from '@mui/x-data-grid'; 
// Definindo tipos para a nova tabela
interface GridColDef {
    field: string;
    headerName: string;
    width?: number;
    type?: 'string' | 'number';
    editable?: boolean;
    valueGetter?: (value: any, row: any) => string;
}
interface GridRowsProp {
    id: number;
    [key: string]: any;
}

// ------------------------------------------------------------
// 🔹 TIPAGENS COMPARTILHADAS (ReusableForm)
// ------------------------------------------------------------
type FieldType = 'text' | 'email' | 'number' | 'select' | 'password';
interface SelectOption {
  value: string | number;
  label: string;
}
interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: SelectOption[];
}
interface ReusableFormProps {
  fields: FieldConfig[]; 
  onSubmit: (data: Record<string, any>) => void; 
  title?: string;
  submitLabel?: string;
}

// ------------------------------------------------------------
// 🔹 COMPONENTE: ReusableForm (Anteriormente components/data/ReusableForm.tsx)
// ------------------------------------------------------------

const ReusableForm: React.FC<ReusableFormProps> = ({ 
  fields, 
  onSubmit, 
  title = "Formulário",
  submitLabel = "Enviar"
}) => {
  
  const initialData = useMemo(() => {
    const data: Record<string, any> = {};
    fields.forEach(field => {
      data[field.name] = ''; 
    });
    return data;
  }, [fields]);

  const [formData, setFormData] = useState(initialData);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    
    if (name) {
      setFormData(prevData => ({ ...prevData, [name]: value, }));
      setValidationError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missingFields = fields.filter(field => field.required && !formData[field.name]);
    
    if (missingFields.length > 0) {
      const labels = missingFields.map(e => e.label).join(', ');
      setValidationError(`Por favor, preencha os campos obrigatórios: ${labels}.`);
      return;
    }
    
    setValidationError(null);
    onSubmit(formData);
  };

  const renderField = (field: FieldConfig) => {
    const value = (formData[field.name] ?? '').toString();
    
    switch (field.type) {
      case 'select':
        return (
          <FormControl fullWidth margin="normal" required={field.required} key={field.name} size="small">
            <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
            <Select
              labelId={`${field.name}-label`}
              id={field.name}
              name={field.name}
              value={value} 
              onChange={handleChange as (event: SelectChangeEvent<unknown>) => void}
              label={field.label}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value as string | number}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      default:
        return (
          <TextField
            key={field.name}
            fullWidth
            margin="normal"
            label={field.label}
            name={field.name}
            type={field.type} 
            required={field.required}
            value={value}
            onChange={handleChange} 
            size="small"
          />
        );
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, minHeight: '350px' }}
    >
      <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'text.primary' }}>
        {title}
      </Typography>
      
      {validationError && (
        <Paper elevation={0} sx={{ p: 1, my: 1, bgcolor: 'error.main', color: 'white', borderRadius: 1 }}>
          <Typography variant="body2">{validationError}</Typography>
        </Paper>
      )}

      {fields.map(renderField)}

      <MuiButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        {submitLabel}
      </MuiButton>
    </Box>
  );
}

// ------------------------------------------------------------
// 🔹 DADOS DE ReusableForm
// ------------------------------------------------------------
const userRegistrationFields: FieldConfig[] = [
  { name: 'username', label: 'Nome de Usuário', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { 
    name: 'role', 
    label: 'Função', 
    type: 'select', 
    required: true, 
    options: [
      { value: 'user', label: 'Usuário Padrão' },
      { value: 'admin', label: 'Administrador' },
    ]
  },
];

// ------------------------------------------------------------
// 🔹 TIPAGENS COMPARTILHADAS (CheckboxesTags)
// ------------------------------------------------------------
interface OptionType {
  title: string;
  year?: number;
}
interface CheckboxesTagsProps {
  options: OptionType[];
  label?: string;
  onSelectionChange?: (selected: OptionType[]) => void; 
}

// ------------------------------------------------------------
// 🔹 COMPONENTE: CheckboxesTags (Anteriormente components/data/CheckBoxsTags.tsx)
// ------------------------------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CheckboxesTags: React.FC<CheckboxesTagsProps> = ({ options, label = "Selecione Opções", onSelectionChange }) => {
  
  const [selectedItems, setSelectedItems] = useState<OptionType[]>([]);

  return (
    <Autocomplete
      multiple
      size="small"
      id="checkboxes-tags-demo"
      options={options}
      value={selectedItems}
      onChange={(_, newValue) => {
        setSelectedItems(newValue);
        if (onSelectionChange) {
          onSelectionChange(newValue);
        }
      }}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}

      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props as any;
        return (
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
      
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={label}
          placeholder="Comece a digitar..." 
        />
      )}
    />
  );
}

// ------------------------------------------------------------
// 🔹 DADOS DE CheckboxesTags
// ------------------------------------------------------------
const topFilms: OptionType[] = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings', year: 2003 },
];

// ------------------------------------------------------------
// 🔹 TIPAGENS COMPARTILHADAS (CustomDataTable)
// ------------------------------------------------------------
interface CustomDataTableProps {
  rows: GridRowsProp;        
  columns: GridColDef[];   
  loading?: boolean;         
  pageSize?: number;         
  height?: string;           
}

// ------------------------------------------------------------
// 🔹 COMPONENTE: CustomDataTable (Substituído por Tabela MUI Simples)
// ------------------------------------------------------------
const CustomDataTable: React.FC<CustomDataTableProps> = ({ 
  rows, 
  columns, 
  loading = false, 
  pageSize = 5, // Não usado na Tabela Simples
  height = '300px'
}) => {
    // Renderiza uma Tabela MUI padrão para evitar a dependência DataGrid
    const visibleRows = rows.slice(0, 5); // Simula um limite de página

    if (loading) {
        return (
            <Box sx={{ height: height, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }
    
  return (
    <TableContainer component={Paper} sx={{ height: height, width: '100%', borderRadius: 2, boxShadow: 1 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ fontWeight: 'bold' }}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row) => (
            <TableRow key={row.id} hover>
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.field}`}>
                  {column.valueGetter 
                        ? column.valueGetter(row[column.field], row) 
                        : row[column.field]
                    }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ------------------------------------------------------------
// 🔹 DADOS DE CustomDataTable
// ------------------------------------------------------------
const initialColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'firstName', headerName: 'Nome', width: 120, editable: true },
  { field: 'lastName', headerName: 'Sobrenome', width: 120, editable: true },
  { field: 'age', headerName: 'Idade', type: 'number', width: 80, editable: true },
  {
    field: 'fullName',
    headerName: 'Nome Completo',
    sortable: false,
    width: 180,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const initialRows: GridRowsProp = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 28 },
  { id: 6, lastName: 'Melisandre', firstName: 'Melisandre', age: 300 }, // Adicionado para simular paginação
  { id: 7, lastName: 'Tarly', firstName: 'Samwell', age: 25 }, // Adicionado para simular paginação
];

// ------------------------------------------------------------
// 🔹 COMPONENTE: DataTable (Anteriormente components/DataTable.tsx)
// ------------------------------------------------------------
// Este componente foi reescrito para usar a Tabela MUI simples
const DataTable: React.FC = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'Nome', width: 130 },
        { field: 'lastName', headerName: 'Sobrenome', width: 130 },
        { field: 'age', headerName: 'Idade', type: 'number', width: 90 },
    ];
    
    const rows: GridRowsProp = [
        { id: 10, lastName: 'Potter', firstName: 'Harry', age: 17 },
        { id: 11, lastName: 'Granger', firstName: 'Hermione', age: 17 },
        { id: 12, lastName: 'Weasley', firstName: 'Ron', age: 17 },
    ];

    return (
        <TableContainer component={Paper} sx={{ height: 300, width: '100%', boxShadow: 1 }}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.field} sx={{ fontWeight: 'bold' }}>
                                {column.headerName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} hover>
                            {columns.map((column) => (
                                <TableCell key={`${row.id}-${column.field}`}>
                                    {row[column.field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

// ------------------------------------------------------------
// 🔹 COMPONENTE AUXILIAR: Button (Para ListForm, usa Tailwind)
// ------------------------------------------------------------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "default";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "default", ...props }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors shadow-sm";
    
    const variantClasses = variant === "primary"
        ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600";
        
    return (
        <button 
            className={`${baseClasses} ${variantClasses}`} 
            {...props}
        >
            {children}
        </button>
    );
};


// ------------------------------------------------------------
// 🔹 COMPONENTE: ListForm (Anteriormente components/lists/ListForm.tsx)
// ------------------------------------------------------------
interface ListFormProps {
  onSubmit: (data: { name: string; description: string }) => void;
  onCancel: () => void;
  initialData?: { name: string; description: string };
  type?: "list" | "item";
  isEditing?: boolean;
}

const ListForm: React.FC<ListFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  type = "list", 
  isEditing = false,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const getTitle = () => {
    if (type === "list") {
      return isEditing ? "✏️ Editar Lista" : "🆕 Nova Lista";
    } else {
      return isEditing ? "✏️ Editar Item" : "🆕 Novo Item";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name, description });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-md space-y-3 border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-lg font-semibold mb-2">{getTitle()}</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o nome..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Descrição opcional..."
        />
      </div>

      <div className="flex justify-end space-x-2 pt-1">
        <Button type="submit" variant="primary">
          💾 Salvar
        </Button>
        <Button type="button" variant="default" onClick={onCancel}>
          ❌ Cancelar
        </Button>
      </div>
    </form>
  );
}


// ------------------------------------------------------------
// 🔹 COMPONENTE PRINCIPAL: HomePage
// ------------------------------------------------------------

export default function HomePage() {
    const [formResult, setFormResult] = useState<Record<string, any> | null>(null);
    const [tagsResult, setTagsResult] = useState<OptionType[]>([]);
    const [listFormResult, setListFormResult] = useState<{ name: string; description: string } | null>(null);
    
    // Funções de tratamento de resultados
    const handleFormSubmit = (data: Record<string, any>) => {
        setFormResult(data);
    };

    const handleTagsChange = (selected: OptionType[]) => {
        setTagsResult(selected);
    };

    const handleListFormSubmit = (data: { name: string; description: string }) => {
        setListFormResult(data);
    };

    const handleListFormCancel = () => {
        setListFormResult(null); // Reseta o preview
    };

    // Estrutura de prévia unificada
    const PreviewCard = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
        <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, minHeight: '100%' }}>
                <Typography variant="h5" component="h2" gutterBottom color="primary">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {description}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {children}
            </Box>
        </Grid>
    );

    return (
        <Container component="main" maxWidth="xl" sx={{ pt: 12, pb: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 5, color: 'text.primary', fontWeight: 700 }}>
                Galeria de Componentes Reutilizáveis
            </Typography>

            <Grid container spacing={4}>
                
                {/* 1. ReusableForm Preview */}
                <PreviewCard
                    title="1. ReusableForm"
                    description="Componente genérico para criar formulários rapidamente com base em uma configuração de array (JSON Schema)."
                >
                    <ReusableForm 
                        fields={userRegistrationFields} 
                        onSubmit={handleFormSubmit}
                        title="Formulário de Cadastro Simplificado"
                        submitLabel="Salvar Dados"
                    />
                    {formResult && (
                        <Box sx={{ mt: 2, p: 1, bgcolor: 'primary.light', color: 'white', borderRadius: 1 }}>
                            <Typography variant="caption" component="pre">
                                {JSON.stringify(formResult, null, 2)}
                            </Typography>
                        </Box>
                    )}
                </PreviewCard>

                {/* 2. CheckboxesTags Preview */}
                <PreviewCard
                    title="2. CheckboxesTags"
                    description="Um Autocomplete do MUI que permite a seleção múltipla de itens como tags, com checkboxes."
                >
                    <Box sx={{ mt: 3, maxWidth: 400 }}>
                        <CheckboxesTags 
                            options={topFilms} 
                            label="Escolha seus filmes favoritos"
                            onSelectionChange={handleTagsChange}
                        />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" color="text.primary">
                            Selecionados ({tagsResult.length}):
                        </Typography>
                        <Typography variant="caption" component="pre">
                            {tagsResult.map(t => t.title).join(', ') || 'Nenhum selecionado.'}
                        </Typography>
                    </Box>
                </PreviewCard>
                
                {/* 3. CustomDataTable Preview */}
                <PreviewCard
                    title="3. CustomDataTable (Tabela Simples)"
                    description="Wrapper flexível que agora usa o componente <Table> padrão do MUI para evitar dependências externas."
                >
                    <CustomDataTable 
                        rows={initialRows} 
                        columns={initialColumns} 
                        height="350px"
                        pageSize={5}
                    />
                </PreviewCard>

                {/* 4. Simple DataTable Preview */}
                 <PreviewCard
                    title="4. Simple DataTable (Tabela Simples)"
                    description="Demonstração da implementação padrão de uma tabela simples do MUI."
                >
                    <DataTable />
                </PreviewCard>

                {/* 5. ListForm Preview */}
                <PreviewCard
                    title="5. ListForm (Estilo Tailwind)"
                    description="Formulário genérico com estilo Tailwind para criação/edição de listas e itens. Usa o componente <Button> auxiliar."
                >
                    <ListForm 
                        onSubmit={handleListFormSubmit}
                        onCancel={handleListFormCancel}
                        type="item"
                        isEditing={false}
                    />
                    {listFormResult && (
                         <Box sx={{ mt: 2, p: 1, bgcolor: 'warning.main', color: 'white', borderRadius: 1 }}>
                            <Typography variant="caption" component="pre">
                                Dados Submetidos: {JSON.stringify(listFormResult, null, 2)}
                            </Typography>
                        </Box>
                    )}
                </PreviewCard>

            </Grid>
        </Container>
    );
}