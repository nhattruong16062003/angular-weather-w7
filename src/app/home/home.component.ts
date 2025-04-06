import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherService } from '../weather.service';
import { loadWeather, addFavorite, loadWeatherSuccess } from '../store/weather.actions'; // Thêm addFavorite
import { selectCurrentWeather } from '../store/weather.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { AppState } from '../store/weather.selectors'; // Thêm AppState
import { Weather } from '../models/weather.model'; // Thêm Weather
import { Observable } from 'rxjs'; // Thêm Observable


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchLocation = '';
  weather$!: Observable<Weather | null>; // Kiểu cụ thể thay vì any

  constructor(
    private store: Store<AppState>, // Chỉ định kiểu AppState
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.weather$ = this.store.select(selectCurrentWeather);

    // Thêm console.log để debug
    this.weather$.subscribe(weather => {
      console.log('Current weather data:', weather);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude},${position.coords.longitude}`;
          console.log('Using geolocation:', location);
          this.fetchWeather(location);
        },
        (error) => {
          console.warn('Geolocation error, using default location');
          this.loadDefaultWeather();
        }
      );
    } else {
      console.warn('Geolocation not supported, using default location');
      this.loadDefaultWeather();
    }
  }

  private fetchWeather(location: string) {
    this.weatherService.getCurrentWeather(location).subscribe({
      next: (weather) => {
        console.log('Weather data received:', weather);
        this.store.dispatch(loadWeatherSuccess({ weather }));
      },
      error: (err) => {
        console.error('Failed to fetch weather:', err);
        this.loadDefaultWeather(); // Fallback nếu API fail
      }
    });
  }

  private loadDefaultWeather() {
    const defaultLocation = 'Ho Chi Minh';
    console.log('Loading default location:', defaultLocation);
    this.fetchWeather(defaultLocation);
  }

  searchWeather() {
    if (this.searchLocation) {
      this.weatherService
        .getCurrentWeather(this.searchLocation)
        .subscribe((weather) => {
          this.store.dispatch(loadWeatherSuccess({ weather }));
        });
      this.searchLocation = '';
    }
  }

  addToFavorites(weather: any) {
    this.store.dispatch(addFavorite({ weather }));
  }
}