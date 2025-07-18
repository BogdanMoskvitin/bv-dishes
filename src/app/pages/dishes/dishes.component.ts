import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { DishResponse } from 'src/app/models/dish.interface';
import { DishesService } from 'src/app/services/dishes.service';

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

  constructor(private dishesService: DishesService) { }

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
}
