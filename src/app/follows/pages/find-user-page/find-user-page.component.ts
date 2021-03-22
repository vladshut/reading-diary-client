import { Component, OnInit } from '@angular/core';
import {User} from "@app/models/user";
import {UserService} from "@app/core/services/user.service";
import {WithLoading} from "@app/mixins/WithLoading";
import {Pagination} from "@app/models/pagination";
import {AuthService} from "@app/core/services/auth.service";

@Component({
  selector: 'app-find-user-page',
  templateUrl: './find-user-page.component.html',
  styleUrls: ['./find-user-page.component.css']
})
export class FindUserPageComponent extends WithLoading() implements OnInit {

  pagination: Pagination<User>;
  query: string = '';
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
  }

  public goToPage(page: number = 1) {
    this.loadUsers(this.buildFilter(page));
  }

  onSearch() {
    this.loadUsers(this.buildFilter());
  }

  isSearchEnabled() {
    return this.query && this.query.length > 3;
  }

  private loadUsers(filter: {query: string, page: number}) {
    if (!filter.query || filter.query.length < 4) {
      return;
    }

    const $users = this.userService.list(filter);
    this.withLoading($users).subscribe(pagination => this.pagination = pagination);
  }

  private buildFilter(page: number = 1) {
    return {page, query: this.query};
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
