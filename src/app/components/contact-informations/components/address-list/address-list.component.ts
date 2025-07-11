import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddressList } from '../../../../types/address-list';
import { AddressTypeEnum } from '../../../../enums/address-type.enum';

export const adrressTypeDescriptionMap: { [key in AddressTypeEnum]: string } = {
  [AddressTypeEnum.ALTERNATIVE]: 'Alternativo',
  [AddressTypeEnum.RESIDENTIAL]: 'Residencial',
  [AddressTypeEnum.WORK]: 'Trabalho',
};


@Component({
  selector: 'app-address-list',
  standalone: false,
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnChanges {
  addressListToDisplay: any[] = [];
  @Input({ required: true }) userAddressList: AddressList | undefined = [];

  ngOnChanges(changes: SimpleChanges) {
    const ADDRESS_LIST_LOADED = Array.isArray(changes['userAddressList'].currentValue);

    if (ADDRESS_LIST_LOADED) {
      this.prepareAddressListToDisplay();
    }
  }

  prepareAddressListToDisplay() {
    this.addressListToDisplay = [];

    Object.keys(adrressTypeDescriptionMap).map(Number).forEach((AddressType: number) => {
      const addressFound = this.userAddressList?.find((userAddress) => userAddress.type === AddressType);

      this.addressListToDisplay.push(this.returnAddressToDisplay(addressFound, AddressType));
    })
  }
  returnAddressToDisplay(address: any, addressType: number): any {
    if (!address) {
      return {
        typeDescription: adrressTypeDescriptionMap[addressType as AddressTypeEnum],
        type: addressType,
        street: '-',
        complement: '-',
        country: '-',
        state: '-',
        city: '-',
      }
    }

    return {
       typeDescription: adrressTypeDescriptionMap[addressType as AddressTypeEnum],
       ...address,
    }

  }



}
