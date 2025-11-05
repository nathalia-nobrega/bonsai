import React from 'react'
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    InputAdornment,
    createTheme,
    ThemeProvider,
} from "@mui/material";

const Ihome = () => {
  return (
    <Box
        sx={{
            backgrounfImage: "C:\Users\diaju\bonsai\frontend\src\images\image.png",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            width: '100%',
        }}
        >
            <Typography variant="h3" color="white">
                Minha aplicação
            </Typography>
        </Box>
  );
}

export default Ihome