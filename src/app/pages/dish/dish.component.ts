import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishRequest, DishResponse } from 'src/app/models/dish.interface';
import { DishesService } from 'src/app/services/dishes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  @ViewChildren('audioRef') audioElements!: QueryList<ElementRef<HTMLAudioElement>>;

  audioList = [
    {id: 1, src: "assets/sounds/1-plankton.mp3"},
    {id: 2, src: "assets/sounds/2-banane.mp3"},
    {id: 3, src: "assets/sounds/3-hitler.mp3"},
    {id: 4, src: "assets/sounds/4-a.mp3"},
    {id: 5, src: "assets/sounds/5-billy.mp3"},
    {id: 6, src: "assets/sounds/6-angry.mp3"},
    {id: 7, src: "assets/sounds/7-pop.mp3"},
    {id: 8, src: "assets/sounds/8-kumi.mp3"},
    {id: 9, src: "assets/sounds/9-oiia.mp3"},
    {id: 10, src: "assets/sounds/10-happy.mp3"},
  ]
  id: string | null = null;
  user: string | null = null;
  name: string = '';
  place: string = '';
  b_rating: number | null = null;
  v_rating: number | null = null;
  isPlanktonMem: boolean = false;
  errorMessage: string = '';
  isLoader: boolean = false;

  constructor(
    private dishesService: DishesService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.user = this.userService.getUserName();

    this.setValue();
  }

  setValue() {
    if (this.id) {
      this.isLoader = true;  
      this.dishesService.getDish(+this.id).subscribe((res: DishResponse) => {
        this.name = res.name;
        this.place = res.place;
        this.b_rating = res.b_rating;
        this.v_rating = res.v_rating;
        this.isLoader = false;
      })
    }
  }

  createDish() {
    let rating = this.user === 'Богдан' ? this.b_rating : this.v_rating;
    if (!rating || !this.name.length) return;
    const dish: DishRequest = {
      name: this.name,
      place: this.place,
      rating: rating,
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
    let rating = this.user === 'Богдан' ? this.b_rating : this.v_rating;
    if (!this.id || !rating || !this.name.length) return;
    const dish: DishRequest = {
      name: this.name,
      place: this.place,
      rating: rating,
    };
    this.dishesService.updateDish(+this.id, dish).subscribe(
      () => {
        this.router.navigate(['./dishes']);
      }, (error) => {
        this.errorMessage = error.error.error;
      }
    )
  }

  selectRating(index: number) {
    let rating: number | null = null;
    if (this.user === 'Богдан') {
      this.b_rating = index;
      rating = this.b_rating;
    } else {
      this.v_rating = index;
      rating = this.v_rating;
    }
    this.audioElements.forEach(audioElement => {
      audioElement.nativeElement.currentTime = 0;
      audioElement.nativeElement.pause();
    })
    this.audioElements.forEach(audioElement => {
      if (+audioElement.nativeElement.id === rating) {
        audioElement.nativeElement.play();
      }
    })
  }

  deleteDish() {
    if (this.id) {
      this.dishesService.deleteDish(+this.id).subscribe()
    }
  }
}
