import { Component, Output } from '@angular/core';
import { CelebrityService } from './services/celebrity-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CelebrityInterface } from './interfaces/celebrity-interface';
import { EmittedObject } from '../movies/interfaces/emitted-object-interface';

@Component({
  selector: 'app-celebrities',
  templateUrl: 'celebrities.page.html',
  styleUrls: ['celebrities.page.scss']
})
export class CelebritiesPage {
  @Output() celebrityList:CelebrityInterface[] = [];
  selectedCelebrityId:string="";

  constructor(
    private _celebritiesService:CelebrityService,
    private _activateRoute:ActivatedRoute,
    private _celebritiesRouter:Router) {
      this.celebrityList = _celebritiesService.getCelebrityList();
  }

  ionViewWillEnter(){
    this.celebrityList=this._celebritiesService.getCelebrityList();
  }
  
  public selectActionForCelebrity(emittedObject:EmittedObject){
    this.selectedCelebrityId = emittedObject.id;
    console.log("caught Celebrity id : "+this.selectedCelebrityId);
    if(emittedObject.actionSelected == "detail") {
      this.goToCelebrityDetail(this.selectedCelebrityId);
    } else if(emittedObject.actionSelected == "edit") {
      this.goToCelebrityEdit(this.selectedCelebrityId);
    } else if(emittedObject.actionSelected == "delete") {
      this.goToCelebrityDelete(this.selectedCelebrityId);
    }
  }

  private goToCelebrityDetail(id:string) {
    console.log("redirecting to Celebrity detail");
    this._celebritiesRouter.navigate(['detail',this.selectedCelebrityId], {relativeTo:this._activateRoute});
  }

  private goToCelebrityEdit(id:string) {
    console.log("redirecting to Celebrity editing");
    this._celebritiesRouter.navigate(['edit',this.selectedCelebrityId], {relativeTo:this._activateRoute});
  }

  private goToCelebrityDelete(id:string) {
    console.log("redirecting to Celebrity deleting");
    this._celebritiesRouter.navigate(['delete',this.selectedCelebrityId], {relativeTo:this._activateRoute});
  }

}
