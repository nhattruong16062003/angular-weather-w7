import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'; // Thêm Observable
import { selectFavorites } from '../store/weather.selectors';
import { removeFavorite } from '../store/weather.actions';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { AppState } from '../store/weather.selectors';
import { Weather } from '../models/weather.model'; // Thêm Weather

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites$!: Observable<Weather[]>; // Kiểu cụ thể thay vì any

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.favorites$ = this.store.select(selectFavorites);
  }

  removeFromFavorites(location: string) {
    this.store.dispatch(removeFavorite({ location }));
  }
}