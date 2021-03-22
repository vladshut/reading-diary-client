import { Component, OnInit } from '@angular/core';
import {AuthService} from "@app/core/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "@app/models/user";
import {UserService} from "@app/core/services/user.service";
import {WithLoading} from "@app/mixins/WithLoading";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent extends WithLoading() implements OnInit {
  public user: User;
  public currentUser: User;

  followersIds: string[] = [];
  followeesIds: string[] = [];

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    super();

    const userId = this.route.snapshot.paramMap.get('userId');
    this.userService.get(userId).subscribe(user => this.user = user);
    this.currentUser = this.auth.getUser();
  }

  ngOnInit() {
    this.userService.followeesIds(this.currentUser.id).subscribe(ids => this.followeesIds = ids);
    this.userService.followersIds(this.currentUser.id).subscribe(ids => this.followersIds = ids);
  }

  follow(userId: string) {
    const $follow = this.userService.follow(userId);
    this.withLoading($follow).subscribe(() => this.followeesIds.push(userId));
  }

  unfollow(userId: string) {
    const $unfollow = this.userService.unfollow(userId);
    this.withLoading($unfollow).subscribe(() => {
      this.followeesIds.splice(this.followeesIds.indexOf(userId), 1);
    });
  }

  isFollowee(userId: string): boolean {
    return this.followeesIds.indexOf(userId) !== -1;
  }

  isFollower(userId: string): boolean {
    return this.followersIds.indexOf(userId) !== -1;
  }
}
