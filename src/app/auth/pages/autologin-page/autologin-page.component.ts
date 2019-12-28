import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-autologin-page',
  templateUrl: './autologin-page.component.html',
  styleUrls: ['./autologin-page.component.css']
})
export class AutologinPageComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '';
    const token = this.route.snapshot.queryParams['alogin'];
    if (!token) {

        this.router.navigate(['login']);
    }

    this.authService.autologin(token).then(() => {
        this.router.navigate([redirectUrl]);
    });
  }

}
