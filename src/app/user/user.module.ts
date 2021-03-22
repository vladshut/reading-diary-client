import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {UserSettingsPageComponent} from '@app/user/pages/user-settings-page/user-settings-page.component';
import {UserRoutingModule} from '@app/user/user-routing.module';
import {TextareaAutosizeModule} from "ngx-textarea-autosize";
import {UserSettingsGeneralTabComponent} from './pages/user-settings-page/tabs/user-settings-general-tab/user-settings-general-tab.component';
import { UserSettingsPasswordTabComponent } from './pages/user-settings-page/tabs/user-settings-password-tab/user-settings-password-tab.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { UserReportsComponent } from './components/user-reports/user-reports.component';

@NgModule({
  declarations: [
    UserSettingsPageComponent,
    UserSettingsGeneralTabComponent,
    UserSettingsPasswordTabComponent,
    ProfilePageComponent,
    UserProfileComponent,
    UserPreviewComponent,
    UserReportsComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    TextareaAutosizeModule,
  ],
    exports: [
        UserProfileComponent,
        UserPreviewComponent
    ]
})
export class UserModule {
}
