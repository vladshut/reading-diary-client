import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "@app/models/user";

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {
  @Input() user: User;
  @Input() isCurrentUser: boolean;
  @Input() isFollowee: boolean;
  @Input() isFollower: boolean;

  @Output() follow = new EventEmitter<string>();
  @Output() unfollow = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  emitFollow() {
    this.user.followers_count ++;
    this.follow.emit(this.user.id);
  }

  emitUnfollow() {
    this.user.followers_count --;
    this.unfollow.emit(this.user.id);
  }
}
