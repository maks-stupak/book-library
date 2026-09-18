import { Component } from '@angular/core';

import { BooksStore } from '../../state/books.store';

@Component({
  imports: [],
  providers: [BooksStore],
  selector: 'app-library-page',
  styleUrl: './library-page.scss',
  templateUrl: './library-page.html',
})
export class LibraryPage {}
