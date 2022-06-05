import {useState, useEffect} from 'react';
import _ from 'lodash';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import allCityList from './data/city.list.json';
import {fetchForecast} from './api/fetchForecast';
import {ICity, ILoadedCity} from './types';

const defaultCity = allCityList.find(({name}) => name === 'Amsterdam')!;

const columns = [
    {field: 'name', headerName: 'City', sortable: false, flex: 1},
    {field: 'temp', type: 'number', headerName: 'Temp, °C', width: 150},
    {
        field: 'windSpeed',
        type: 'number',
        headerName: 'Wind speed, m/s',
        width: 150,
    },
    {field: 'weather', headerName: 'Weather', sortable: false, flex: 1},
];

export default function App() {
    const [selectedCities, setSelectedCities] = useState<ICity[]>([defaultCity]);
    const [loadedCities, setLoadedCities] = useState<ILoadedCity[]>([]);

    useEffect(() => {
        let mounted = true;

        fetchForecast(selectedCities, _loadedCities => {
            if (!mounted) {
                return;
            }
            setLoadedCities(_loadedCities);
        });

        return () => {
            mounted = false;
        };
    }, [selectedCities]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                height: 0,
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box mb={2}>
                <Autocomplete
                    disableClearable
                    disableCloseOnSelect
                    multiple
                    options={allCityList}
                    getOptionLabel={(option) => option.name}
                    value={allCityList.filter(
                        city => (_.map(selectedCities, 'id')).includes(city.id),
                    )}
                    onChange={(event, newValue) => {
                        if (_.isArray(newValue)) {
                            setSelectedCities(newValue);
                        } else {
                            setSelectedCities([]);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Cities"
                        />
                    )}
                />
            </Box>
            <DataGrid
                disableColumnMenu
                disableSelectionOnClick
                rows={loadedCities}
                columns={columns}
            />
        </Box>
    );
}
