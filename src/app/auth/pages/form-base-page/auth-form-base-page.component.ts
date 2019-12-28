import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

enum Mode {
  Login = 'login',
  Registration = 'registration',
  ForgotPassword = 'forgot_password',
  ResetPassword = 'reset_password',
}

@Component({
  selector: 'app-form-base-page',
  templateUrl: './auth-form-base-page.component.html',
  styleUrls: ['./auth-form-base-page.component.css']
})
export class AuthFormBasePageComponent implements OnInit {
  modes = Mode;
  mode: Mode;
  
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.mode = data.mode;
    });
  }
}
