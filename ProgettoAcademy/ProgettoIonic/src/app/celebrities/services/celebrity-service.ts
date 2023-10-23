import { Injectable } from "@angular/core";
import { CelebrityInterface } from "../interfaces/celebrity-interface";

@Injectable({
    providedIn:'root',
})
export class CelebrityService{
    celebrityList:CelebrityInterface[] = [
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

    getCelebrityList():CelebrityInterface[] {
        return this.celebrityList;
    }

    
    getSingleCelebrity(selectedId:string|null):CelebrityInterface{
        const celebrity:CelebrityInterface | undefined = this.celebrityList.find(celebrity => celebrity.id == selectedId);
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
        const celebrityToUpdateIdx:number = this.celebrityList.findIndex((item:CelebrityInterface) => item.id == celebrity.id)
        if(celebrityToUpdateIdx != -1) {
            this.celebrityList[celebrityToUpdateIdx] = celebrity;
        }
    }

}