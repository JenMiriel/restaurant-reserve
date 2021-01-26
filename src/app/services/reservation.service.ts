import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    const url = `${environment.backendUrl}/reservation`;
    return this.http.get<Reservation[]>(url).pipe();

  }

  saveReservation(reservation: Reservation): Observable<Reservation> {
    const url = `${environment.backendUrl}/reservation`;
    return this.http.post<Reservation>(url, {
      reservation
    }).pipe(map(e => new Reservation(e)));
  }
}

