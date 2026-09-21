import { Component, inject } from '@angular/core';

import { BooksStore } from '../../state/books.store';
import { BookInput } from '../../models/book.model';
import { BookList } from '../../components/book-list/book-list';
import { BookForm } from '../../components/book-form/book-form';

@Component({
  imports: [BookForm, BookList],
  providers: [BooksStore],
  selector: 'app-library-page',
  styleUrl: './library-page.scss',
  templateUrl: './library-page.html',
})
export class LibraryPage {
  protected readonly store = inject(BooksStore);

  protected editBook(id: string): void {
    console.log('Edit book:', id);
  }

  protected removeBook(id: string): void {
    this.store.removeBook(id);
  }

  protected addBook(book: BookInput): void {
    this.store.addBook(book);
  }
}
