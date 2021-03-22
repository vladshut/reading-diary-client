import {NgModule} from '@angular/core';
import {FollowersPageComponent} from './pages/followers-page/followers-page.component';
import {FolloweesPageComponent} from './pages/followees-page/followees-page.component';
import {FollowsRoutingModule} from "@app/follows/follows-routing.module";
import {SharedModule} from "@app/shared/shared.module";
import {FindUserPageComponent} from "@app/follows/pages/find-user-page/find-user-page.component";
import {UserModule} from "@app/user/user.module";


@NgModule({
  declarations: [FollowersPageComponent, FolloweesPageComponent, FindUserPageComponent],
    imports: [
        SharedModule,
        FollowsRoutingModule,
        UserModule,
    ]
})
export class FollowsModule {
}
