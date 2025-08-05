import { AddressTypeEnum } from "../enums/address-type.enum";
import { IAddressToDisplay } from "../interfaces/address-to-displa.interface";
import { IAddress } from "../interfaces/user/address.interface";
import { AddressList } from "../types/address-list";
import { adrressTypeDescriptionMap } from "./adrress-type-description-map";

export const prepareAdrressList = (originalUserAddressList: AddressList, isDisplayAddress: boolean, callback: (address: IAddressToDisplay) => void) => {
     Object.keys(adrressTypeDescriptionMap).map(Number).forEach((AddressType: number) => {
        const addressFound = originalUserAddressList.find((userAddress) => userAddress.type === AddressType);
        let address = {} as IAddressToDisplay;

        if(isDisplayAddress){
            address =  returnAddressToDisplay(addressFound, AddressType);
        }else {
            address = returnAddressToEdit(addressFound, AddressType);
        }

        callback({
          ...address,
        });
    });
};

const returnAddressToEdit = (address: IAddress | undefined, addressType: number): IAddressToDisplay => {
    if (!address) {
      return {
        typeDescription: adrressTypeDescriptionMap[addressType as AddressTypeEnum],
        type: addressType,
        street: '',
        complement: '',
        country: '',
        state: '',
        city: '',
      }
    }

    return {
       typeDescription: adrressTypeDescriptionMap[addressType as AddressTypeEnum],
       ...address,
    }

};

const returnAddressToDisplay = (address: IAddress | undefined, addressType: number): IAddressToDisplay => {
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

};