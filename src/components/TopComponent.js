import { Box, Grid } from '@mui/material'
import React from 'react'
import styled from '@emotion/styled';



const TitleH2 = styled("h2")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: "xxx-large",
  }));
  
const TopComponent= ()=>{
    return (
        <Grid container  justifyContent="center" alignItems={"center"}>
          <Box>
          <TitleH2>Money Converter</TitleH2>
          </Box>
        </Grid>
    )
}

export default TopComponent