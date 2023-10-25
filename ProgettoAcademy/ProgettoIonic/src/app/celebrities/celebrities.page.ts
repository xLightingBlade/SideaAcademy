import { Component, Output } from '@angular/core';
import { CelebrityService } from './services/celebrity-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CelebrityInterface } from './interfaces/celebrity-interface';
import { EmittedObject } from '../shared/interfaces/emitted-object-interface';
import { CommonList } from '../shared/interfaces/common-list';
import { ToastController } from '@ionic/angular';
import { Actions } from '../shared/interfaces/actions-enum';

@Component({
  selector: 'app-celebrities',
  templateUrl: 'celebrities.page.html',
  styleUrls: ['celebrities.page.scss']
})
export class CelebritiesPage {
  @Output() celebrityList:CommonList[] = [];
  selectedCelebrityId:string="";

  constructor(
    private _celebritiesService:CelebrityService,
    private _activateRoute:ActivatedRoute,
    private _celebritiesRouter:Router,
    private _toastController:ToastController) {
      this._refreshCelebrities();
  }

  ionViewWillEnter() {
    this._refreshCelebrities();
  }
  
  private _refreshCelebrities(){
    this._celebritiesService.getCelebrityList().subscribe((celebs:CelebrityInterface[]) => {
      this.celebrityList = celebs.map((celeb:CelebrityInterface) => {
        return {
          id:celeb.id,
          name:celeb.name,
        }
      })
    });
  }

  public selectActionForCelebrity(emittedObject:EmittedObject){
    this.selectedCelebrityId = emittedObject.id;
    console.log("caught Celebrity id : "+this.selectedCelebrityId);
    switch(emittedObject.actionSelected) {
      case Actions.Detail : {
        this._goToCelebrityDetail(this.selectedCelebrityId);
        break;
      }
      case Actions.Edit : {
        this._goToCelebrityEdit(this.selectedCelebrityId);
        break;
      }
      case Actions.Delete : {
        this._deleteCelebrity(this.selectedCelebrityId);
        break;
      }
      case Actions.Create : {
        this._goToCelebrityCreation();
      }
    }
  }

  private _goToCelebrityDetail(id:string) {
    console.log("redirecting to Celebrity detail");
    this._celebritiesRouter.navigate(['detail',id], {relativeTo:this._activateRoute});
  }

  private _goToCelebrityEdit(id:string) {
    console.log("redirecting to Celebrity editing");
    this._celebritiesRouter.navigate(['edit',id], {relativeTo:this._activateRoute});
  }

  
  private _goToCelebrityCreation() {
    console.log("Redirecting to movie creation");
    this._celebritiesRouter.navigate(['create'], {relativeTo:this._activateRoute});
  }

  private _deleteCelebrity(id:string) {
    this._celebritiesService.deleteCelebrity(id).subscribe((item:unknown) => {
      this.presentToastAfterDelete();
      this._refreshCelebrities();
    });
  }

    //valutare di renderlo un metodo comune
    async presentToastAfterDelete() {
      const toast = await this._toastController.create({
        message: 'Celebrity successfully deleted',
        duration: 3000,
        position: 'bottom',
        cssClass:'delete-toast'
      });
  
      await toast.present();
    }

}
