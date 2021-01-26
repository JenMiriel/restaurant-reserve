import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservation } from '../../models/reservation';
import * as moment from 'moment';
import { ReservationService } from '../../services/reservation.service';
import {InventoryService} from '../../services/inventory.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit  {

  form: FormGroup;
  reserveForm: FormGroup;

  standardPartySizes = [...Array(10).keys()];
  mockAvailableTimes = ['11:15 am', '11:30 am', '1:00 pm'];

  constructor(private formBuilder: FormBuilder,
              private reservationService: ReservationService,
              private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.buildReservationForm();
  }

  buildReservationForm(): void {
    this.reserveForm = this.formBuilder.group({
      formName: ['', Validators.required],
      formEmail: ['', Validators.required],
      formPartySize: ['', Validators.required],
      formDate: ['', Validators.required],
      formTime: ['', Validators.required],
    });
  }

  onChanges(): void {
    this.reserveForm.get('formDate').valueChanges
      .subscribe(selectedDate => {
        if (selectedDate !== '') {
          this.reserveForm.get('formTime').enable();
        }
        else {
          this.reserveForm.get('formTime').disable();
        }
      });
  }

  onSubmit(): void {
    if (this.reserveForm.valid) {
      const payload = this.reserveForm.value;
      console.log('payload: ', payload);
      const newReservation = new Reservation({
        name: payload.formName,
        email: payload.formEmail,
        partySize: payload.formPartySize,
        date: moment(payload.formDate, 'YYYY-MM-DD'),
        time: moment(payload.formTime, 'hh:mm:ss')
      });
      if (this.inventoryService.checkInventory(newReservation)) {
        this.reservationService.saveReservation(newReservation);
      }

    }
  }

  resetForm(): void {
    this.reserveForm.reset();
  }

}
