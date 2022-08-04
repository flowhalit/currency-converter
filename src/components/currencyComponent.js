import { Autocomplete, TextField } from '@mui/material';
import React, { Component, useEffect, useState } from 'react'

const CurrencyComponent = ({items,selected,setSelected,label,placeholder})=>{
    const [value ,setValue]=useState(null)
  
    return (
        <Autocomplete
        disablePortal
        options={items}
        sx={{ width: 300 }}
        placeholder={placeholder || ""}
        renderInput={(params) => <TextField {...params} label={label} />}
        value={value}
        onChange={(e) => {
            setSelected(e.currentTarget.textContent,items.filter(x=>x.label===e.currentTarget.textContent).map(x=>x.value).join(""))
            setValue(e.currentTarget.textContent)
        }}
      />
    )
}
export default CurrencyComponent
