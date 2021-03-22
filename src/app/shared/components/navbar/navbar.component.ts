import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@app/core/services/auth.service';
import {User} from "@app/models/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
  @Input() sidebarToggle;
  toggleClass = 'ft-maximize';
  user: User;

  languages = [
    { code: 'en', locale: 'en', flag: 'uk', label: 'English'},
    { code: 'nl', locale: 'nl', flag: 'nl', label: 'Dutch'},
  ];
  showNavbar = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private modalService: NgbModal,
    @Inject(LOCALE_ID) public localeId: string
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  public getCurrentLanguageConfig() {
    return this.languages.find((config) => {
      return config.locale === this.localeId;
    });
  }

  // Open default modal
  open(content) {
    this.modalService.open(content);
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    }
    else
      this.toggleClass = 'ft-maximize'
  }
}
