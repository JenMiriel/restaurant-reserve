import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { InventorySlot } from '../models/inventory-slot';
import {Reservation} from '../models/reservation';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getInventory(): Observable<InventorySlot[]> {
    const url = `${environment.backendUrl}/inventory`;
    return this.http.get<InventorySlot[]>(url).pipe();

  }

  checkInventory(reservation: Reservation): Observable<boolean> {
    const url = `${environment.backendUrl}/inventory`;
    return this.http.post<boolean>(url, {
      reservation
    }).pipe(map(b => b));
  }

  saveInventorySlot(inventorySlot: InventorySlot): Observable<InventorySlot> {
    const url = `${environment.backendUrl}/inventory`;
    return this.http.post<InventorySlot>(url, {
      inventorySlot
    }).pipe(map(e => new InventorySlot(e)));
  }
}
