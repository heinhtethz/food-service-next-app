// src/components/Autocomplete.tsx
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Option {
  id: number;
  name: string;
}

interface Props {
  options: Option[];
  defaultValue?: Option[];
  value?: Option[];
  label: string;
  onChange: (options: Option[]) => void;
}

const AutocompleteComponent = ({
  options,
  defaultValue,
  label,
  onChange,
}: Props) => {
  return (
    <Autocomplete
      sx={{ mt: 2 }}
      fullWidth
      multiple
      options={options}
      defaultValue={defaultValue}
      onChange={(event, values) => onChange(values)}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.id}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  );
};

export default AutocompleteComponent;
