import { Injectable } from "@angular/core";
import { UserDto, UserForm } from "../interfaces/user-interfaces";
import { Subject } from "rxjs";
import { Sex, HolidayType } from "../interfaces/user-interfaces";

@Injectable({
    providedIn:'root',
})
export class UserService{
  
    private _users: UserDto[] =[
        {
            id:1,
            name:"NomeUno",
            surname:"CognomeUno",
            sex:0,
            year:1990,
            residence:"Carapelle",
            favoriteTypeHoliday:1,
        },
        {
            id:2,
            name:"NomeDue",
            surname:"CognomeDue",
            sex:1,
            year:1999,
            residence:"Foggia",
            favoriteTypeHoliday:2,
        }

    ]

      
  _usersLength = this._users.length;

  _users$ = new Subject<UserDto[]>();
  usersObservable$ = this._users$.asObservable();

  getUserList(): void {
    this._users$.next(this._users);
  }

  getUserById(id:number): UserDto | undefined{
    return this._users.find((user:UserDto) => user.id === id);
  }

  updateUser(userForm: UserForm): void {
    const newUser = this.formToDto(userForm);
    const userToUpdateIdx = this._users.findIndex((user:UserDto) => user.id === newUser.id);
    if (userToUpdateIdx !== -1) {
      this._users[userToUpdateIdx] = newUser;
    }
    this._users$.next(this._users);
  }

  deleteUser(id: number): void {
    const i = this._users.findIndex((user: UserDto) => user.id == id);
    if (i !== -1) {
      this._users.splice(i, 1);
    }
    this._users$.next(this._users);
  }

  addUser(userForm: UserForm) {
    const newUser = this.formToDto(userForm);
    this._usersLength += 1;
    newUser.id = (this._usersLength)
    this._users.push(newUser);
    this._users$.next(this._users);
  }

  formToDto(form:UserForm):UserDto {
    return {
      id:form.id,
      name:form.name,
      surname:form.surname,
      sex:Number(form.sex),
      year:form.year,
      residence:form.residence,
      favoriteTypeHoliday:Number(form.favoriteTypeHoliday),
      favoritePlace:Number(form.favoritePlace)
    }
  }
  
}