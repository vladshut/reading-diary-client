import { Component, OnInit } from '@angular/core';
import {Pagination} from "@app/models/pagination";
import {User} from "@app/models/user";
import {UserService} from "@app/core/services/user.service";
import {AuthService} from "@app/core/services/auth.service";
import {WithLoading} from "@app/mixins/WithLoading";

@Component({
  selector: 'app-followers-page',
  templateUrl: './followers-page.component.html',
  styleUrls: ['./followers-page.component.css']
})
export class FollowersPageComponent extends WithLoading() implements OnInit {

  pagination: Pagination<User>;
  followersIds: string[] = [];
  followeesIds: string[] = [];
  currentUser: User;

  constructor(
    private userService: UserService,
    private auth: AuthService,
  ) {
    super();
    this.currentUser = auth.getUser();
  }

  ngOnInit() {
    this.userService.followeesIds(this.currentUser.id).subscribe(ids => this.followeesIds = ids);
    this.userService.followersIds(this.currentUser.id).subscribe(ids => this.followersIds = ids);
    this.goToPage(1);
  }

  public goToPage(page: number = 1) {
    this.loadUsers(this.buildFilter(page));
  }

  private loadUsers(filter: { page: number }) {
    const $users = this.userService.followers(this.currentUser.id, filter);
    this.withLoading($users).subscribe(pagination => this.pagination = pagination);
  }

  private buildFilter(page: number = 1) {
    return {page};
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
