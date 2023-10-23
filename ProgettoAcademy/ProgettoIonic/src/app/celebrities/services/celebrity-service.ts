import { Injectable } from "@angular/core";
import { CelebrityInterface } from "../interfaces/celebrity-interface";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class CelebrityService{
    private _celebrityList:CelebrityInterface[] = [
        {
            id:"1",
            primaryName:"celebrityFirst",
            birthYear:1990,
            deathYear:2023
        },
        {
            id:"2",
            primaryName:"celebritySecond",
            birthYear:1990,
            deathYear:2023
        },
        {
            id:"3",
            primaryName:"celebrityThird",
            birthYear:1990,
            deathYear:2023
        }
    ]

    private _celebritySubject$ = new Subject<CelebrityInterface[]>();
    $celebrityObservable$ = this._celebritySubject$.asObservable();

    getCelebrityList(){
        this._celebritySubject$.next(this._celebrityList);
    }

    
    getSingleCelebrity(selectedId:string|null):CelebrityInterface{
        const celebrity:CelebrityInterface | undefined = this._celebrityList.find(celebrity => celebrity.id == selectedId);
        if(celebrity) {
            return celebrity;
        }else {
            return {
                id:"Not Found",
                primaryName:"Unavailable",
                birthYear:NaN,
                deathYear:NaN
            }
        }
    }

    updatecelebrity(celebrity:CelebrityInterface){
        const celebrityToUpdateIdx:number = this._celebrityList.findIndex((item:CelebrityInterface) => item.id == celebrity.id)
        if(celebrityToUpdateIdx != -1) {
            this._celebrityList[celebrityToUpdateIdx] = celebrity;
        }
        this._celebritySubject$.next(this._celebrityList);
    }

    deleteCelebrity(celebrityId:string){
        console.log(celebrityId);
        const movieToDeleteIdx:number = this._celebrityList.findIndex((item:CelebrityInterface) => item.id == celebrityId)
        if(movieToDeleteIdx != -1) {
            this._celebrityList.splice(movieToDeleteIdx, 1);
        }
        this._celebritySubject$.next(this._celebrityList);
    }

}