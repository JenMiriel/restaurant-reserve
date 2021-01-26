import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';
import { ViewInventoryComponent } from './pages/view-inventory/view-inventory.component';
import { RouterModule } from '@angular/router';
import { CreateInventoryComponent } from './pages/create-inventory/create-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateReservationComponent,
    ViewInventoryComponent,
    CreateInventoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
