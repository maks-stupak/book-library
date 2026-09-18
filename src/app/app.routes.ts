import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/books/pages/library-page/library-page').then((m) => m.LibraryPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
