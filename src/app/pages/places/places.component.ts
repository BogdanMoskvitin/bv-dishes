import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { PlaceResponse } from 'src/app/models/place.interface';
import { PlacesService } from 'src/app/services/places.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  places: PlaceResponse[] = [];
  filteredPlaces: PlaceResponse[] = [];
  searchValue: string = '';
  private searchSubject = new Subject<string>();
  isLoader: boolean = false;
  isSortByDateAsc: boolean = true;
  isSortByRatingAsc: boolean = false;
  user: string | null = null;

  constructor(
    private placesService: PlacesService,
    private userService: UserService,
  ) {
    this.user = userService.getUserName();
  }

  ngOnInit(): void {
    this.getPlaces();

    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.applyFilter(value);
    });
  }

  getPlaces() {
    this.isLoader = true;
    this.placesService.getPlaces().subscribe((data: PlaceResponse[]) => {
      this.places = data;
      this.filteredPlaces = data;
      this.isLoader = false;
    });
  }

  filterList(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.searchSubject.next(value);
  }

  private applyFilter(value: string) {
    const lowerValue = value.toLowerCase().trim();

    if (!lowerValue) {
      this.filteredPlaces = this.places;
      return;
    }

    this.filteredPlaces = this.places.filter(place =>
      place.name.toLowerCase().includes(lowerValue) ||
      place.address.toLowerCase().includes(lowerValue)
    );
  }

  sortByDate(): void {
    this.filteredPlaces.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return this.isSortByDateAsc ? dateA - dateB : dateB - dateA;
    });
    this.isSortByDateAsc = !this.isSortByDateAsc;
  }

  sortByRating(): void {
    this.filteredPlaces.sort((a, b) => {
      const getAverageRating = (place: PlaceResponse): number => {
        const ratings = [];
        if (place['b_rating'] != null && place['b_rating'] !== undefined) {
          ratings.push(place['b_rating']);
        }
        if (place['v_rating'] != null && place['v_rating'] !== undefined) {
          ratings.push(place['v_rating']);
        }
        const sum = ratings.reduce((acc, val) => acc + val, 0);
        return sum / ratings.length;
      };

      const avgA = getAverageRating(a);
      const avgB = getAverageRating(b);

      return this.isSortByRatingAsc ? avgA - avgB : avgB - avgA;
    });
    this.isSortByRatingAsc = !this.isSortByRatingAsc;
  }
}
