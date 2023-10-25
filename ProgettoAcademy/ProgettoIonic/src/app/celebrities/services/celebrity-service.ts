import { Injectable } from "@angular/core";
import { AllCelebritiesDtoInterface, CelebrityInterface } from "../interfaces/celebrity-interface";
import { Observable, Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root',
})
export class CelebrityService{
    private _baseUrl = "";

    constructor(private readonly _http:HttpClient){
        this._baseUrl = environment.baseUrl;
    }

    getCelebrityList():Observable<CelebrityInterface[]> {
        return this._http.get<AllCelebritiesDtoInterface>(`${this._baseUrl}/celebrities?page=0&size=25&order_by=id`).pipe(
            map((item:AllCelebritiesDtoInterface) => {
            return item.celebrities;
        }))
    }

    getSingleCelebrity(selectedId:string|null):Observable<CelebrityInterface>{
        return this._http.get<CelebrityInterface>(`${this._baseUrl}/celebrities/${selectedId}`);
    }

    createCelebrity(celebrity: CelebrityInterface):Observable<CelebrityInterface> {
        return this._http.post<CelebrityInterface>(`${this._baseUrl}/celebrities`, celebrity);
    }

    updatecelebrity(celebrity:CelebrityInterface):Observable<CelebrityInterface>{
        console.log(celebrity.id);
        return this._http.put<CelebrityInterface>(`${this._baseUrl}/celebrities/${celebrity.id}`, celebrity);
    }

    deleteCelebrity(celebrityId:string):Observable<unknown>{
        return this._http.delete(`${this._baseUrl}/celebrities/${celebrityId}`);
    }

}