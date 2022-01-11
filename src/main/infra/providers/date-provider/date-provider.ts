import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from './date-provider-interface';

dayjs.extend(utc);

export class DateProvider implements IDateProvider {
  add(quantity: number, measureTime: string): Date {
    switch (measureTime) {
      case 'day':
        return dayjs().add(quantity, 'day').toDate();
      default:
        return null;
    }
  }
}
