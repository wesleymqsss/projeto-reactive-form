import { MaritalStatusEnum } from "../enums/marital-status.enum";

export const maritalStatusDescriptionMap: { [key in MaritalStatusEnum]: string } = {
    [MaritalStatusEnum.MARRIED]: 'Casado',
    [MaritalStatusEnum.SINGLE]: 'Solteiro',
    [MaritalStatusEnum.DIVORCED]: 'Divorciado',
};

export const maritalStatusArray = Object.keys(maritalStatusDescriptionMap).map(Number).map((key)=>{
    return {code: key, description: maritalStatusDescriptionMap[key as MaritalStatusEnum], };
});
