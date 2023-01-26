import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Axios from 'axios';
import { keys } from '../../../config/keys';

export default function QuantitySelect({ id, item }) {
    const [quantity, setQuantity] = React.useState('');
    React.useEffect(() => {
        setQuantity(item.quantity);
    }, []);
    const handleChange = async (event: SelectChangeEvent) => {
        if (event.target.value > item.stock) {
            alert(`There are only ${item.stock} items in stock`);
            return setQuantity(1);
        }
        setQuantity(event.target.value as string);

        try {
            await Axios.put(`${keys.BACKEND}/api/user/changeQuantity/${id}`, {
                quantity: event.target.value
            });
            window.location.reload();
        } catch (e) {
            return alert('Something Went Wrong');
        }
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quantity}
                    label="Quantity"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
