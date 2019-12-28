import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteBadge, RouteInfo } from './sidebar.metadata';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { AuthService } from '@app/core/services/auth.service';
import { env } from '@env/env';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[];
  public badgeClass = 'badge text-secondary ml-sm-2';
  public isProd = env.production;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private i18n: I18n,
  ) {
  }

  ngOnInit() {
    $.getScript('./assets/js/app-sidebar.js');
    this.menuItems = this.getRoutes().filter(menuItem => menuItem);
  }

  private setBadge(route: RouteInfo, badge: { id: string, badge: RouteBadge }) {
    if (route.id === badge.id) {
      route.badge = badge.badge;
    } else if (route.submenu && route.submenu.length > 0) {
      route.submenu.forEach(subRoute => this.setBadge(subRoute, badge));
    }
  }

  private getRoutes(): RouteInfo[] {
    return [
      {
        path: '/',
        title: this.i18n('Dashboard'),
        icon: 'icon-home'
      },
      {
        path: '/books/list',
        title: this.i18n({value: 'Books', description: 'sidebar', id: 'books'}),
        icon: 'fas fa-book',
        id: 'books',
      },
    ];
  }
}
