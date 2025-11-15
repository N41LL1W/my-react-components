import { useState, useMemo } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Typography, Paper } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

// ------------------------------------------------------------
// 🔹 TIPAGENS (Definidas aqui para evitar erros de resolução)
// ------------------------------------------------------------

// Tipos de entrada suportados
type FieldType = 'text' | 'email' | 'number' | 'select' | 'password';

// Definição de uma opção para campos 'select'
interface SelectOption {
  value: string | number;
  label: string;
}

// Configuração para um único campo do formulário
interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: SelectOption[]; // Necessário se type é 'select'
}

// Propriedades do componente de Formulário
interface ReusableFormProps {
  fields: FieldConfig[]; // Array de configurações de campos
  onSubmit: (data: Record<string, any>) => void; // Função chamada no envio
  title?: string;
  submitLabel?: string;
}

// ------------------------------------------------------------
// 🔹 ReusableForm Componente (Integrado no arquivo único)
// ------------------------------------------------------------

function ReusableForm({ 
  fields, 
  onSubmit, 
  title = "Formulário",
  submitLabel = "Enviar"
}: ReusableFormProps) {
  
  // 1. Inicializa o estado do formulário com base nas configurações
  const initialData = useMemo(() => {
    const data: Record<string, any> = {};
    fields.forEach(field => {
      data[field.name] = ''; 
    });
    return data;
  }, [fields]);

  const [formData, setFormData] = useState(initialData);
  const [validationError, setValidationError] = useState<string | null>(null);


  // 2. Manipulador de Mudança (atualiza o estado no input)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    
    if (name) {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
      setValidationError(null); // Limpa o erro ao digitar
    }
  };

  // 3. Manipulador de Envio
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const missingFields = fields.filter(field => field.required && !formData[field.name]);
    
    if (missingFields.length > 0) {
      const labels = missingFields.map(e => e.label).join(', ');
      setValidationError(`Por favor, preencha os campos obrigatórios: ${labels}.`);
      console.error("ERRO DE VALIDAÇÃO: Campos obrigatórios faltando.");
      return;
    }
    
    setValidationError(null);
    onSubmit(formData);
  };

  // 4. Renderiza o campo baseado no tipo
  const renderField = (field: FieldConfig) => {
    const value = (formData[field.name] ?? '').toString();
    
    switch (field.type) {
      case 'select':
        if (!field.options) {
          console.error(`Campo 'select' ${field.name} requer a propriedade 'options'.`);
          return null;
        }
        return (
          <FormControl fullWidth margin="normal" required={field.required} key={field.name}>
            <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
            <Select
              labelId={`${field.name}-label`}
              id={field.name}
              name={field.name}
              value={value} 
              onChange={handleChange as (event: SelectChangeEvent<unknown>) => void}
              label={field.label}
            >
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value as string | number}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      // 'text', 'email', 'number', 'password' usam o mesmo componente TextField
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
            inputProps={field.type === 'number' ? { inputMode: 'numeric', pattern: '[0-9]*' } : {}}
          />
        );
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        maxWidth: '500px', 
        mx: 'auto', 
        p: 3, 
        borderRadius: 2, 
        boxShadow: 3,
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      
      {validationError && (
        <Paper elevation={0} sx={{ p: 1.5, my: 2, bgcolor: 'error.light', color: 'white', borderRadius: 1 }}>
          <Typography variant="body2">{validationError}</Typography>
        </Paper>
      )}

      {fields.map(renderField)}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        {submitLabel}
      </Button>
    </Box>
  );
}

// ------------------------------------------------------------
// 🔹 DADOS E COMPONENTE APLICATIVO
// ------------------------------------------------------------

// A CORREÇÃO PRINCIPAL: Tipagem explícita do array de dados como FieldConfig[]
const userRegistrationFields: FieldConfig[] = [
  { name: 'username', label: 'Nome de Usuário', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Senha', type: 'password', required: true },
  { name: 'age', label: 'Idade', type: 'number', required: false },
  { 
    name: 'role', 
    label: 'Função', 
    type: 'select', 
    required: true, 
    options: [
      { value: 'user', label: 'Usuário Padrão' },
      { value: 'admin', label: 'Administrador' },
      { value: 'guest', label: 'Convidado' },
    ]
  },
];

export default function App() {
    const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

    const handleFormSubmit = (data: Record<string, any>) => {
        console.log("Dados do formulário enviados:", data);
        setSubmittedData(data);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, minHeight: '100vh', bgcolor: 'background.default' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'text.primary' }}>
                Registro de Usuário
            </Typography>
            
            <ReusableForm 
                fields={userRegistrationFields} 
                onSubmit={handleFormSubmit}
                title="Crie sua conta"
                submitLabel="Registrar"
            />

            {submittedData && (
                <Box sx={{ 
                    mt: 4, 
                    p: 3, 
                    maxWidth: '500px', 
                    mx: 'auto', 
                    bgcolor: 'success.light', 
                    color: 'success.contrastText', 
                    borderRadius: 2,
                    boxShadow: 3
                }}>
                    <Typography variant="h6">Dados Enviados com Sucesso!</Typography>
                    <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem', marginTop: '10px' }}>
                        {JSON.stringify(submittedData, null, 2)}
                    </pre>
                </Box>
            )}
        </Box>
    );
}