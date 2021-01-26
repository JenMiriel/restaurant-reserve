import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { InventorySlot } from '../../models/inventory-slot';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-create-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  createInventoryForm: FormGroup;

  reservationSlots = [...Array(6).keys()];
  operatingTimes = Array<string>();
  allInventorySlots = Array<InventorySlot>();

  constructor(private formBuilder: FormBuilder,
              private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.buildInventoryForm();
    this.generateOperatingTimes();
    this.getAllInventory();
  }

  buildInventoryForm(): void {
    this.createInventoryForm = this.formBuilder.group({
      formTime: ['', Validators.required],
      formSlots: ['', Validators.required]
    });
  }

  generateOperatingTimes(): void {
    const amTimes = [10, 11];
    const pmTimes = [...Array(11).keys()];
    const minuteIncrements = ['00', '15', '30', '45'];
    if (amTimes){
      for (const time of amTimes) {
        for (const minute of minuteIncrements) {
          this.operatingTimes.push(time + ':' + minute + ' am');
        }
      }
    }
    if (pmTimes){
      for (const time of pmTimes) {
        const formattedTime = (time.toString() === '0') ? '12' : time;
        for (const minute of minuteIncrements) {
          this.operatingTimes.push(formattedTime + ':' + minute + ' pm');
        }
      }
    }

  }

  getAllInventory(): void {
    this.inventoryService.getInventory()
  }

  onSubmit(): void {
    if (this.createInventoryForm.valid) {
      const payload = this.createInventoryForm.value;
      console.log('payload: ', payload);
      const newInventorySlot = new InventorySlot({
        time: moment(payload.formTime, 'hh:mm:ss'),
        slots: payload.slots
      });
      (this.inventoryService.saveInventorySlot(newInventorySlot));
    }
  }

  resetForm(): void {
    this.createInventoryForm.reset();
  }
}
