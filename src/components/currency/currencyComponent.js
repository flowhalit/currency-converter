/* eslint-disable react/prop-types */
import { Autocomplete, TextField } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';

const CurrencyComponent = ({action ,items,value,label,placeholder})=>{
    const dispatch = useDispatch();
    return items &&(
        <Autocomplete
        disablePortal
        options={items}
        sx={{ width: 300 }}
        placeholder={placeholder || ""}
        renderInput={(params) => <TextField {...params} label={label} />}
        value={value}
        onChange={(e) => {
            dispatch(action(e.currentTarget.textContent))
        }}
      />
    )
}
export default CurrencyComponent
