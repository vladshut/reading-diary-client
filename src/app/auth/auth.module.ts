import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { AutologinPageComponent } from './pages/autologin-page/autologin-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthFormBasePageComponent } from './pages/form-base-page/auth-form-base-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
import { AuthSocialComponent } from './components/auth-social/auth-social.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AutologinPageComponent,
    LogoutPageComponent,
    ForgotPasswordComponent,
    AuthFormBasePageComponent,
    ResetPasswordComponent,
    VerifyEmailPageComponent,
    AuthSocialComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
