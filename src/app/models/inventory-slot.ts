import { Moment } from 'moment';

export class InventorySlot {
  time: Moment;
  slots: number;

  constructor(init?: Partial<InventorySlot>) {
    Object.assign(this, init);
  }
}
