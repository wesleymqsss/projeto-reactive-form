import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneList } from '../../../../types/phone-list';
import { PhoneTypeEnum } from '../../../../enums/phone-type.enum';
import { IPhone } from '../../../../interfaces/user/phone.interface';
import { IphoneToDisplay } from '../../../../interfaces/iphone-to-display.interface';
import { PhoneTypeDescriptionMap } from '../../../../utils/phone-type-description-map';

@Component({
  selector: 'app-phone-list',
  standalone: false,
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.scss'
})
export class PhoneListComponent implements OnChanges {
  phoneListToDisplay: IphoneToDisplay[] = [];
  @Input({ required: true }) userPhoneList: PhoneList | undefined = [];

  ngOnChanges(changes: SimpleChanges): void {
    const PHONE_LIST_LOADED = Array.isArray(changes['userPhoneList'].currentValue);

    if (PHONE_LIST_LOADED) {
      this.preparePhoneListToDisplay();
    }
  }

  preparePhoneListToDisplay() {
    this.phoneListToDisplay = [];
    
    Object.keys(PhoneTypeDescriptionMap).map(Number).forEach((phoneType: number) => {
      const phoneFound = this.userPhoneList?.find((userPhone: IPhone) => userPhone.type === phoneType);

      this.phoneListToDisplay.push({
        type: PhoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
        phoneNumber: phoneFound ? this.formatPhoneNumber(phoneFound) : '-',
      });
    });
  }

  formatPhoneNumber(phone: IPhone) {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`
  }
}
