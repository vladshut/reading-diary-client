import {Component, OnInit} from '@angular/core';
import {User} from '@app/models/user';
import {AuthService} from '@app/core/services/auth.service';
import {WithLoading} from "@app/mixins/WithLoading";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent extends WithLoading() implements OnInit {
  user: User;
  currentTab = 'general';

  constructor(
    private auth: AuthService,
  ) {
    super();
    this.user = this.auth.getUser();
  }

  isTab (tab: string): boolean {
    return tab === this.currentTab;
  }

  ngOnInit(): void {
  }
}

