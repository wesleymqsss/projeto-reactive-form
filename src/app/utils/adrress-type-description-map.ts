import { AddressTypeEnum } from "../enums/address-type.enum";

export const adrressTypeDescriptionMap: { [key in AddressTypeEnum]: string } = {
  [AddressTypeEnum.ALTERNATIVE]: 'Alternativo',
  [AddressTypeEnum.RESIDENTIAL]: 'Residencial',
  [AddressTypeEnum.WORK]: 'Trabalho',
};
