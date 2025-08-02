import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";
import { PhoneList } from "../../types/phone-list";
import { AddressList } from "../../types/address-list";
import { DependentsList } from "../../types/dependents-list";
import { convertPtBrDateToDateObj } from "../../utils/convert-pt-br-date-to-date-obj";
import { preparePhoneList } from "../../utils/prepare-phone-list";
import { PhoneTypeEnum } from "../../enums/phone-type.enum";
import { prepareAdrressList } from "../../utils/prepare-address-list";
import { requiredAddressValidator } from "../../utils/user-form-validators/required-address-validators";
import { IDependent } from "../../interfaces/user/dependent.interface";

export class UserFormController {
    userForm!: FormGroup;

    private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    private _fb = inject(FormBuilder);
    constructor() {
        this.createUserForm()
    }

    get contactInformations(): FormGroup{
        return this.userForm.get('contactInformations') as FormGroup;
    }

    get generalInformations(): FormGroup {
        return this.userForm.get('generalInformations') as FormGroup;
    }

    get phoneList(): FormArray {
        return this.userForm.get('contactInformations.phoneList') as FormArray;
    }

    get addressList(): FormArray {
        return this.userForm.get('contactInformations.addressList') as FormArray;
    }

    get dependentsList(): FormArray {
        return this.userForm.get('dependentsList') as FormArray;
    }

    fulfillUserForm(user: IUser) {
        this.resetUserForm();

        this.fulfillGeneralInformations(user);

        this.fulfillPhoneList(user.phoneList);

        this.fulfillAddressList(user.addressList);

        this.fulfillDependentsList(user.dependentsList);

        this.userForm.markAllAsTouched();

        this.userForm.updateValueAndValidity();

        console.log(this.userForm);
    }


    removeDependent(index: number) {
        this.dependentsList.removeAt(index);
        this.dependentsList.markAsDirty();

    }

    addDependent() {
        this.dependentsList.push(this.createDependentGroup());
        this.dependentsList.markAsDirty();
    }

    private createDependentGroup(dependent: IDependent | null = null){
        if(!dependent){
            this._fb.group({
                name: ['', Validators.required],
                age: ['', Validators.required],
                document: ['', Validators.required],
            });
        }

        return this._fb.group({
             name: [dependent?.name, Validators.required],
                age: [dependent?.age, Validators.required],
                document: [dependent?.document, Validators.required],
        })

    }

    private resetUserForm() {
        this.userForm.reset();

        this.generalInformations.reset();

        this.phoneList.reset();
        this.phoneList.clear();

        this.addressList.reset();
        this.addressList.clear();

        this.dependentsList.reset();
        this.dependentsList.clear();

    }

    private fulfillGeneralInformations(user: IUser) {
        const newUser = {
            ...user,
            birthDate: convertPtBrDateToDateObj(user.birthDate)
        };

        this.generalInformations?.patchValue(newUser);
    }

    private fulfillPhoneList(userPhoneList: PhoneList) {
        preparePhoneList(userPhoneList, false, (phone) => {
            const phoneValidators = phone.type === PhoneTypeEnum.EMERGENCY ? [] : [Validators.required];

            this.phoneList.push(this._fb.group({
                type: [phone.type],
                typeDescription: [phone.typeDescription],
                number: [phone.phoneNumber, phoneValidators],
            }));
        })

        console.log('form phoneList', this.phoneList.value)

    }

    private fulfillAddressList(userAddressList: AddressList) {
        prepareAdrressList(userAddressList, false, (address) => {
            this.addressList.push(this._fb.group({
                type: [address.type],
                typeDescription: [{ value: address.typeDescription, disabled: true }],
                street: [address.street],
                complement: [address.complement],
                country: [address.country],
                state: [address.state],
                city: [address.city],
            }, {
                validators: requiredAddressValidator
            }));
        })
    }

    private fulfillDependentsList(userDependentsList: DependentsList) {
        userDependentsList.forEach((dependents) => {
            this.dependentsList.push(this.createDependentGroup(dependents));
        })
    }

    private createUserForm() {
        this.userForm = this._fb.group({
            generalInformations: this._fb.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
                country: ['', Validators.required],
                state: ['', Validators.required],
                maritalStatus: [null, Validators.required],
                monthlyIncome: [null, Validators.required],
                birthDate: [null, Validators.required]
            }),
            contactInformations: this._fb.group({
                phoneList: this._fb.array([]),
                addressList: this._fb.array([]),
            }),
            dependentsList: this._fb.array([]),
        })
    }


}