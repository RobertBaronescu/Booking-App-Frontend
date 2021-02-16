import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  transform(date: moment.MomentInput, format: string | undefined) {
    return moment(date).format(format);
  }
}
