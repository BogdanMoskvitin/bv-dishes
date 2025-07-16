import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishRequest, DishResponse } from 'src/app/models/dish.interface';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  @ViewChildren('audioRef') audioElements!: QueryList<ElementRef<HTMLAudioElement>>;

  audioList = [
    {id: 1, src: "/assets/sounds/1-plankton.mp3"},
    {id: 2, src: "/assets/sounds/2-banane.mp3"},
    {id: 3, src: "/assets/sounds/3-hitler.mp3"},
    {id: 4, src: "/assets/sounds/4-a.mp3"},
    {id: 5, src: "/assets/sounds/5-billy.mp3"},
    {id: 6, src: "/assets/sounds/6-angry.mp3"},
    {id: 7, src: "/assets/sounds/7-pop.mp3"},
    {id: 8, src: "/assets/sounds/8-kumi.mp3"},
    {id: 9, src: "/assets/sounds/9-oiia.mp3"},
    {id: 10, src: "/assets/sounds/10-happy.mp3"},
  ]

  id: string | null = null;

  name: string = '';
  place: string = '';
  rating: number = 5;

  isPlanktonMem: boolean = false;

  errorMessage: string = '';

  constructor(
    private dishesService: DishesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.setValue();
  }

  setValue() {
    if (this.id) {
      this.dishesService.getDish(+this.id).subscribe((res: DishResponse) => {
        this.name = res.name;
        this.place = res.place;
        this.rating = res.b_rating;
      })
    }
  }

  createDish() {
    const dish: DishRequest = {
      name: this.name,
      place: this.place,
      rating: this.rating,
    };
    this.dishesService.createDish(dish).subscribe(
      () => {
        this.router.navigate(['./dishes']);
      }, (error) => {
        this.errorMessage = error.error.error;
      }
    )
  }

  updateDish() {
    if (this.id) {
      const dish: DishRequest = {
        name: this.name,
        place: this.place,
        rating: this.rating,
      };
      this.dishesService.updateDish(+this.id, dish).subscribe(
        () => {
          this.router.navigate(['./dishes']);
        }, (error) => {
          this.errorMessage = error.error.error;
        }
      )
    }
  }

  inputValue() {
    this.audioElements.forEach(audioElement => {
      audioElement.nativeElement.currentTime = 0;
      audioElement.nativeElement.pause();
    })
    this.audioElements.forEach(audioElement => {
      if (+audioElement.nativeElement.id === this.rating) {
        audioElement.nativeElement.play();
      }
    })
  }
}
