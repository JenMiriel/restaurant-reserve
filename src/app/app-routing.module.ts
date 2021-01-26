import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';
import { ViewInventoryComponent } from './pages/view-inventory/view-inventory.component';
import { CreateInventoryComponent } from './pages/create-inventory/create-inventory.component';

const routes: Routes = [
  {
    path: '',
    component: CreateReservationComponent,
  },
  {
    path: 'view-inventory',
    component: ViewInventoryComponent,
  },
  {
    path: 'create-inventory',
    component: CreateInventoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
