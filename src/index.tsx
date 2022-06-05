import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from '@mui/material/styles';
import {createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import App from './App';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                html {
                    height: 100%;
                }
                body {
                    min-height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                #root {
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }
            `,
        },
    },
});

const getDay = (date: Date) => {
    return date.toString().split(/\s/).slice(1, 3).join(' ');
};
const firstDay = getDay(new Date());
const lastDay = getDay(new Date(new Date().getTime() + 7*24*60*60*1000));
const daysRange = `${firstDay} - ${lastDay}`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Weather Forecast {daysRange}
                </Typography>
            </Toolbar>
        </AppBar>
        <App />
    </ThemeProvider>
);
