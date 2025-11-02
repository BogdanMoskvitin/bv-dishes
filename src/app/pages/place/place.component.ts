import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceRequest, PlaceResponse } from 'src/app/models/place.interface';
import { PlacesService } from 'src/app/services/places.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
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
  address: string = '';
  b_rating: number | null = null;
  v_rating: number | null = null;
  isPlanktonMem: boolean = false;
  errorMessage: string = '';
  isLoader: boolean = false;

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    this.user = this.userService.getUserName();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.setValue();
  }

  setValue() {
    if (this.id) {
      this.isLoader = true;  
      this.placesService.getPlace(+this.id).subscribe((res: PlaceResponse) => {
        this.name = res.name;
        this.address = res.address;
        this.b_rating = res.b_rating;
        this.v_rating = res.v_rating;
        this.isLoader = false;
      })
    }
  }

  createPlace() {
    let rating = this.user === 'Богдан' ? this.b_rating : this.v_rating;
    if (!rating || !this.name.length) return;
    const place: PlaceRequest = {
      name: this.name,
      address: this.address,
      rating: rating,
    };
    this.placesService.createPlace(place).subscribe(
      () => {
        this.router.navigate(['./places']);
      }, (error) => {
        this.errorMessage = error.error.error;
      }
    )
  }

  updatePlace() {
    let rating = this.user === 'Богдан' ? this.b_rating : this.v_rating;
    if (!this.id || !rating || !this.name.length) return;
    const place: PlaceRequest = {
      name: this.name,
      address: this.address,
      rating: rating,
    };
    this.placesService.updatePlace(+this.id, place).subscribe(
      () => {
        this.router.navigate(['./places']);
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

  deletePlace() {
    if (this.id) {
      this.placesService.deletePlace(+this.id).subscribe()
    }
  }
}
