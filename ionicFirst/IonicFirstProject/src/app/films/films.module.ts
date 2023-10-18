import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {FilmsPage} from './films.page';
import {FilmsRoutingModule} from './films-routing.module';
import {FilmListComponent} from './components/filmList';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        FilmsRoutingModule,
    ],
    declarations:[FilmsPage, FilmListComponent]
})
export class FilmsModule{}
