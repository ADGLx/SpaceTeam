import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl } from '@mui/material';

export default function SearchBar() {
    const options = Professions.map((option) => {
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
        sx={{minWidth: 240 }}
        renderInput={(params) => <TextField {...params} label="Professions" />}
      />
      </FormControl>
      
    );
  }

const Professions = [
  { label: 'Aerospace Engineering'},
  { label: 'Building Engineering'},
  { label: 'Chemical Engineering'},
  { label: 'Computer Engineering'},
  { label: 'Civil Engineering'},
  { label: 'Data Scientist'}, 
  { label: 'Electrical Engineering'},
  { label: 'Industrial Engineering'},
  { label: 'Mechanical Engineering'},
  { label: 'Software Engineering'},
];