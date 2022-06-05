export interface ICity {
    id: number;
    name: string;
    lat: number;
    lon: number;
}

export interface ILoadedCity {
    id: number;
    name: string;
    temp: number;
    windSpeed: number;
    weather: string;
}
