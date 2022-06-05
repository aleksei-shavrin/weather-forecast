import axios from 'axios';
import _ from 'lodash';

import {ICity, ILoadedCity} from '../types';

const buildRequestUrl = (lat: number, lon: number) => (
    'https://api.openweathermap.org/data/2.5/onecall?'+
    'appid=997bd629b967306f0d0b106eacc73b55&'+
    'exclude=current,minutely,hourly,alerts&'+
    `units=metric&lat=${lat}&lon=${lon}`
);

interface ICache {
    [id: number]: ILoadedCity;
}

const cache: ICache = {};

export const fetchForecast = async (
    cities: ICity[],
    callback: (loadedCities: ILoadedCity[]) => void,
) => {
    const results = [];

    for (const city of cities) {
        if (!cache[city.id]) {
            await axios.get(buildRequestUrl(city.lat, city.lon))
                .then(({data: {daily}}) => {
                    const temp = _.chain(daily)
                        .map(({temp: {day}}) => day)
                        .mean()
                        .round()
                        .value();
                    const windSpeed = _.chain(daily)
                        .map(({wind_speed}) => wind_speed)
                        .mean()
                        .round()
                        .value();
                    const weather = _.chain(daily)
                        .map(({weather}) => _.map(weather, 'description'))
                        .flatten()
                        .uniq()
                        .join(', ')
                        .value();

                    cache[city.id] = {
                        id: city.id,
                        name: city.name,
                        temp,
                        windSpeed,
                        weather,
                    };
                    results.push(cache[city.id]);
                });
        } else {
            results.push(cache[city.id]);
        }
    }

    callback(results);
};
