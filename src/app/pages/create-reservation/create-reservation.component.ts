import { Component, OnInit  } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';


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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildReservationForm();
    // this.reserveForm.controls[formTime].disable();
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
    this.form.reset();
  }

}
