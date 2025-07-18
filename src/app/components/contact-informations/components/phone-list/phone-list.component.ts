import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneList } from '../../../../types/phone-list';
import { IPhone } from '../../../../interfaces/user/phone.interface';
import { IphoneToDisplay } from '../../../../interfaces/iphone-to-display.interface';
import { preparePhoneList } from '../../../../utils/prepare-phone-list';

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
    const originalUserPhoneList = this.userPhoneList && this.userPhoneList.length > 0 ? this.userPhoneList : [];
    preparePhoneList(originalUserPhoneList, true, (phone) => {
      this.phoneListToDisplay.push(phone);
    });
  }

  formatPhoneNumber(phone: IPhone) {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`
  }
}
