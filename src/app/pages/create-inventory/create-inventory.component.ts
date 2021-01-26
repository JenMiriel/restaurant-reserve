import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.scss']
})
export class CreateInventoryComponent implements OnInit {

  createInventoryForm: FormGroup;

  reservationSlots = [...Array(6).keys()];
  operatingTimes = Array<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildInventoryForm();
    this.generateOperatingTimes();
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

  onSubmit(): void {
    if (this.createInventoryForm.valid) {
      const payload = this.createInventoryForm.value;
      console.log('payload: ', payload);
      //   const answerFormattedList = new Answers();
      //   const responses = [];
      //   for (const key in payload) {
      //     // tslint:disable-next-line:radix
      //     if (this.questions[parseInt(key) - 1].type === 'select') {
      //       responses.push({question_id: key, option_id: payload[key]});
      //     } else {
      //       responses.push({question_id: key, text: payload[key]});
      //     }
      //   }
      //   answerFormattedList.responses = responses;
      //   this.penguinApi.postAnswersToQuestions(this.userEmail, answerFormattedList);
      // }
    }
  }

  resetForm(): void {
    this.createInventoryForm.reset();
  }
}
