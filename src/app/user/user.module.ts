import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ProfilePageComponent} from '@app/user/pages/profile-page/profile-page.component';
import {UserRoutingModule} from '@app/user/user-routing.module';
import {TextareaAutosizeModule} from "ngx-textarea-autosize";
import {ProfileGeneralTabComponent} from './pages/profile-page/tabs/profile-general-tab/profile-general-tab.component';
import { ProfilePasswordTabComponent } from './pages/profile-page/tabs/profile-password-tab/profile-password-tab.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileGeneralTabComponent,
    ProfileGeneralTabComponent,
    ProfilePasswordTabComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    TextareaAutosizeModule,
  ],
  exports: []
})
export class UserModule {
}
