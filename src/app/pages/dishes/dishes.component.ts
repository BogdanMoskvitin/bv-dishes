import { Component, OnInit } from '@angular/core';
import { DishResponse } from 'src/app/models/dish.interface';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
  dishes: DishResponse[] = [];

  constructor(private dishesService: DishesService) { }

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes() {
    this.dishesService.getDishes().subscribe((data: DishResponse[]) => {
      this.dishes = data;
    });
  }
}
