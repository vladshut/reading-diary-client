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

  private setCount (id: string, count: number) {
    const badge = {id, badge: {value: count, class: this.badgeClass}};
    this.menuItems.forEach(route => this.setBadge(route, badge));
  };

  private getRoutes(): RouteInfo[] {
    return [
      {
        path: '/dashboard',
        title: this.i18n({value: 'Dashboard', description: 'sidebar', id: 'dashboard'}),
        icon: 'fas fa-tachometer-alt'
      },
      {
        path: '/books/list',
        title: this.i18n({value: 'Books', description: 'sidebar', id: 'books'}),
        icon: 'fas fa-book',
        id: 'books',
      },
      {
        title: this.i18n({value: 'Follows', description: 'sidebar', id: 'follows'}),
        icon: 'fas fa-users',
        class: 'has-sub',
        submenu: [
          {
            path: '/follows/followers',
            title: this.i18n({value: 'Followers', description: 'sidebar', id: 'followers'}),
            id: 'followers',
          },
          {
            path: '/follows/followees',
            title: this.i18n({value: 'Following', description: 'sidebar', id: 'following'}),
            id: 'followees',
          },
          {
            path: '/follows/find',
            title: this.i18n({value: 'Search', description: 'sidebar', id: 'search_users'}),
          },
        ],
      },
      {
        path: '/feeds',
        title: this.i18n({value: 'Feeds', description: 'sidebar', id: 'feeds'}),
        icon: 'fas fa-rss',
        id: 'feeds',
      },
      {
        path: '/feeds/published-reports',
        title: this.i18n({value: 'Reports', description: 'sidebar', id: 'reports'}),
        icon: 'far fa-file-alt',
        id: 'reports',
      },
      {
        path: '/feeds/favorites',
        title: this.i18n({value: 'Favorites', description: 'sidebar', id: 'favorite'}),
        icon: 'far fa-star',
        id: 'favorite',
      },
    ];
  }
}
