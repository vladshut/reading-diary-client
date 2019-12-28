import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.css']
})
export class LogoutPageComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private router: Router,
  ) { }

  ngOnInit() {
      this.authService.logout();
      this.router.navigate(['login']);
  }
}
