import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormBasePageComponent } from './pages/form-base-page/auth-form-base-page.component';
import { AuthGuard, UnAuthGuard } from '../core/guards';
import { AutologinPageComponent } from './pages/autologin-page/autologin-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { ContentLayoutComponent } from '../shared/layouts/content/content-layout.component';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import { FullLayoutComponent } from '../shared/layouts/full/full-layout.component';

const CONTENT_ROUTES: Routes = [
  {path: '', component: AuthFormBasePageComponent, data: {mode: 'login'}, canActivate: [UnAuthGuard]},
  {path: 'login', component: AuthFormBasePageComponent, data: {mode: 'login'}, canActivate: [UnAuthGuard]},
  {path: 'register', component: AuthFormBasePageComponent, data: {mode: 'registration'}, canActivate: [UnAuthGuard]},
  {path: 'forgot-password', component: AuthFormBasePageComponent, data: {mode: 'forgot_password'}, canActivate: [UnAuthGuard]},
  {path: 'reset-password', component: AuthFormBasePageComponent, data: {mode: 'reset_password'}, canActivate: [UnAuthGuard]},
  {path: 'autologin', component: AutologinPageComponent, canActivate: [UnAuthGuard]},
  {path: 'logout', component: LogoutPageComponent, canActivate: [AuthGuard]},

];

const FULL_ROUTES: Routes = [];

const routes: Routes = [
  {path: '', component: ContentLayoutComponent, data: {title: 'content Views'}, children: CONTENT_ROUTES},
  {path: '', component: FullLayoutComponent, data: {title: 'full Views'}, children: FULL_ROUTES},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
