import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl } from '@mui/material';

export default function SmallBar() {
    const options = Type.map((option) => {
      const firstLetter = option.label[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
      };
    });
  
    return (
        <FormControl>
      <Autocomplete
        id="grouped-demo"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.label}
        sx={{ width: 200  }}
        renderInput={(params) => <TextField {...params} label="Type" />}
      />
      </FormControl>
    );
  }

const Type = [
  { label: 'Full-time'},
  { label: 'Part-time'},
];