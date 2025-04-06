import { createReducer, on } from '@ngrx/store';
import { Weather } from '../models/weather.model';
import { loadWeatherSuccess, addFavorite, removeFavorite } from './weather.actions';

export interface WeatherState {
    currentWeather: Weather | null;
    favorites: Weather[];
}

const initialState: WeatherState = {
    currentWeather: null,
    favorites: []
};

export const weatherReducer = createReducer(
    initialState,
    on(loadWeatherSuccess, (state, { weather }) => ({ ...state, currentWeather: weather })),
    on(addFavorite, (state, { weather }) => ({
        ...state,
        favorites: [...state.favorites.filter(f => f.location !== weather.location), { ...weather, isFavorite: true }]
    })),
    on(removeFavorite, (state, { location }) => ({
        ...state,
        favorites: state.favorites.filter(f => f.location !== location)
    }))
);