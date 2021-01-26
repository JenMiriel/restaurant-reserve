import { Moment } from 'moment';

export class Reservation {
  name: string;
  email: string;
  partySize: number;
  date: Moment;
  time: Moment;


  constructor(init?: Partial<Reservation>) {
    Object.assign(this, init);
  }
}
