import React, {useState} from 'react';
import  TextField from '@mui/material/TextField';
import  Button from '@mui/material/Button';

const Search =({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if(searchTerm){
            onSearch(searchTerm);
        }else {
            onSearch('');
            setSearchTerm('');
        }
    };

return (
    <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '7vh'}}>
        <TextField
            label= "Search"
            value ={searchTerm}
            onChange= {(e)=> setSearchTerm(e.target.value)}
            style={{ width: '300px' }}
            />
            <Button onClick ={handleSearch}>Search</Button>
    </div>
);
};
export default Search;