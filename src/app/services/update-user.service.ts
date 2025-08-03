import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/user/user.interface";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UpadteUserService{
    updateUser(newUser: IUser){
        return new Observable<{status: number, body: IUser;}>((observer) => {
            setTimeout(()=> {
                observer.next({ status: 200, body: structuredClone(newUser) });
                observer.complete();
            }, 800);
        }).pipe(
            map((updateUserResponse) => {
                return updateUserResponse.body;
            })
        );
    }
}