import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Este é o componente principal que você exportará
export default function CheckboxesTags() {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
        // Código Corrigido:
        renderOption={(props, option, { selected }) => {
        // Não precisa desestruturar 'key' separadamente. 
        // O MUI passa 'key' e outras props juntas.
        return (
            // Apenas passamos a 'props' inteira para o <li>
            <li {...props} key={props.key}> 
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
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  // ... (seus objetos de filme)
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  // ... e o restante dos seus dados
  { title: 'Interstellar', year: 2014 },
];