import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {ProfilePage} from './profile.page';
import {ProfileName} from './components/name';

import {ProfilePageRoutingModule} from './profile-routing.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ProfilePageRoutingModule,
    ],
    declarations: [ProfilePage, ProfileName]
})

export class ProfileModule {}