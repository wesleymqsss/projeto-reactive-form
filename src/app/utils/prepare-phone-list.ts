import { PhoneTypeEnum } from "../enums/phone-type.enum";
import { IPhone } from "../interfaces/user/phone.interface";
import { PhoneList } from "../types/phone-list";
import { PhoneTypeDescriptionMap } from "./phone-type-description-map";

export const preparePhoneList = (originalUserPhoneList: PhoneList, isDisplayPhone: boolean, callback: (phone: { type: number; typeDescription: string; phoneNumber: string; }) => void) => {
    Object.keys(PhoneTypeDescriptionMap).map(Number).forEach((phoneType: number) => {
        const phoneFound = originalUserPhoneList?.find((userPhone: IPhone) => userPhone.type === phoneType);
        let phoneNumber = '';

        if (isDisplayPhone) {
            phoneNumber = phoneFound ? formatPhoneNumberToDisplay(phoneFound) : '-'
        }
        else {
            phoneNumber = phoneFound ? formatPhoneNumberToEdit(phoneFound): '';
        }
        callback({
            type: phoneType,
            typeDescription: PhoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
            phoneNumber
        });
    });
}

const formatPhoneNumberToDisplay = (phone: IPhone) => {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`
}

const formatPhoneNumberToEdit = (phone: IPhone) => {
    return `${phone.internationalCode}${phone.areaCode}${phone.number}`.replace(/[+\-]/g, '');
}