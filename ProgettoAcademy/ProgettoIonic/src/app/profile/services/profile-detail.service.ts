import { Injectable } from "@angular/core";
import { ProfileDetails } from "../interfaces/profile-detail-interface";

@Injectable({
    providedIn:'root'
})
export class ProfileDetailService{
    nickname:string = '_coolNicknameHere_';
    name:string = 'Gabriele';
    surname:string = 'Nigro';
    //per ora string
    birthday:string = '24/03/2002'
    mail:string = 'blabbla@gmail.com';

    getNickname():string{
        return this.nickname;
    }
    getName():string{
        return this.name;
    }
    getSurname():string{
        return this.surname;
    }
    getBirthday():string{
        return this.birthday;
    }
    getMail():string{
        return this.mail;
    }

    getDetails():ProfileDetails{
        return {
            name:this.name,
            surname:this.surname,
            nickname:this.nickname,
            birthday:this.birthday,
            mail:this.mail,
        }
    }
}