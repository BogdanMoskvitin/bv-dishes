import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { DishComponent } from './pages/dish/dish.component';
import { AuthGuard } from './guards/auth.guard';
import { PlacesComponent } from './pages/places/places.component';
import { PlaceComponent } from './pages/place/place.component';

const routes: Routes = [
  { path: '', redirectTo: 'dishes', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'dishes', component: DishesComponent, canActivate: [AuthGuard] },
  { path: 'dish', component: DishComponent, canActivate: [AuthGuard] },
  { path: 'dish/:id', component: DishComponent, canActivate: [AuthGuard] },
  { path: 'places', component: PlacesComponent, canActivate: [AuthGuard] },
  { path: 'place', component: PlaceComponent, canActivate: [AuthGuard] },
  { path: 'place/:id', component: PlaceComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
