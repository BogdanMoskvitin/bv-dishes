import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { DishResponse } from 'src/app/models/dish.interface';
import { DishesService } from 'src/app/services/dishes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
  dishes: DishResponse[] = [];
  filteredDishes: DishResponse[] = [];
  searchValue: string = '';
  private searchSubject = new Subject<string>();
  isLoader: boolean = false;
  isSortByDateAsc: boolean = true;
  isSortByRatingAsc: boolean = false;
  user: string | null = null;

  constructor(
    private dishesService: DishesService,
    private userService: UserService,
  ) {
    this.user = userService.getUserName();
  }

  ngOnInit(): void {
    this.getDishes();

    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.applyFilter(value);
    });
  }

  getDishes() {
    this.isLoader = true;
    this.dishesService.getDishes().subscribe((data: DishResponse[]) => {
      this.dishes = data;
      this.filteredDishes = data;
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
      this.filteredDishes = this.dishes;
      return;
    }

    this.filteredDishes = this.dishes.filter(dish =>
      dish.name.toLowerCase().includes(lowerValue) ||
      dish.place.toLowerCase().includes(lowerValue)
    );
  }

  sortByDate(): void {
    this.filteredDishes.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return this.isSortByDateAsc ? dateA - dateB : dateB - dateA;
    });
    this.isSortByDateAsc = !this.isSortByDateAsc;
  }

  sortByRating(): void {
    this.filteredDishes.sort((a, b) => {
      const getAverageRating = (dish: DishResponse): number => {
        const ratings = [];
        if (dish['b_rating'] != null && dish['b_rating'] !== undefined) {
          ratings.push(dish['b_rating']);
        }
        if (dish['v_rating'] != null && dish['v_rating'] !== undefined) {
          ratings.push(dish['v_rating']);
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
