import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "@app/models/user";
import {UserService} from "@app/core/services/user.service";
import {WithLoading} from "@app/mixins/WithLoading";
import {AuthService} from "@app/core/services/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends WithLoading() implements OnInit {
  @Input() user: User;
  @Input() isCurrentUser: boolean;
  @Input() isFollowee: boolean;
  @Input() isFollower: boolean;

  @Output() follow = new EventEmitter<string>();
  @Output() unfollow = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private auth: AuthService,
  ) {
    super();
  }

  ngOnInit() {
  }
}
