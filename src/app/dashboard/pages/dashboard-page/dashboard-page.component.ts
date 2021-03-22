import { Component, OnInit } from '@angular/core';
import {User} from "@app/models/user";
import {AuthService} from "@app/core/services/auth.service";
import {UserService} from "@app/core/services/user.service";
import {WithLoading} from "@app/mixins/WithLoading";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent extends WithLoading() implements OnInit {
  public user: User;

  constructor(
    private auth: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    const user$ = this.userService.get(this.auth.getUser().id);
    this.withLoading(user$).subscribe(user => this.user = user);
  }
}
