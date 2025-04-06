import { createSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';

export interface AppState {
    weather: WeatherState;
}

export const selectWeatherState = (state: AppState) => state.weather;
export const selectCurrentWeather = createSelector(selectWeatherState, (state) => state.currentWeather);
export const selectFavorites = createSelector(selectWeatherState, (state) => state.favorites);