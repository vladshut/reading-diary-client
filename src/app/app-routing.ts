import { Routes, RouterModule } from '@angular/router';
import { env } from '@env/env';

const appRoutes: Routes = [
  {
    path: '', children: [
      {path: '', loadChildren: './auth/auth.module#AuthModule'},
      {path: 'books', loadChildren: './books/books.module#BooksModule'},
      {path: 'reading-report', loadChildren: './reading-report/reading-report.module#ReadingReportModule'},
      {path: 'public-report', loadChildren: './public-report/public-report.module#PublicReportModule'},
      {path: 'user', loadChildren: './user/user.module#UserModule'},
    ]
  },

  // otherwise redirect to home
  {path: '**', redirectTo: '/login'}
];

export const AppRouterModule = RouterModule.forRoot(appRoutes, {enableTracing: !env.production, onSameUrlNavigation: 'reload'});
