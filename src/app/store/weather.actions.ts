import { createAction, props } from '@ngrx/store';
import { Weather } from '../models/weather.model';

export const loadWeather = createAction('[Weather] Load Weather', props<{ location: string }>());
export const loadWeatherSuccess = createAction('[Weather] Load Weather Success', props<{ weather: Weather }>());
export const addFavorite = createAction('[Weather] Add Favorite', props<{ weather: Weather }>());
export const removeFavorite = createAction('[Weather] Remove Favorite', props<{ location: string }>());