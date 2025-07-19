import { Pipe, PipeTransform } from '@angular/core';
import { PhoneTypeEnum } from '../enums/phone-type.enum';

@Pipe({
  name: 'phoneMask',
  standalone: false
})
export class PhoneMaskPipe implements PipeTransform {
  transform(phoneType: number): string {
    console.log('maskPhonelist')
    const phoneMaskMap: { [key in PhoneTypeEnum]: string } = {
      [PhoneTypeEnum.RESIDENTIAL]: '+00 00 0000-0000',
      [PhoneTypeEnum.MOBILE]: '+00 00 00000-0000',
      [PhoneTypeEnum.EMERGENCY]: '+00 00 0000-0000||+00 00 00000-0000',
    }

    return phoneMaskMap[phoneType as PhoneTypeEnum];
  }

}
