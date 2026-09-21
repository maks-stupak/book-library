import { computed, Injectable, signal } from '@angular/core';

import { Book, BookInput } from '../models/book.model';
import { filterBooksByTitle } from '../utils/book-filter';
import { sortBooksByAuthorAndTitle } from '../utils/book-sort';

@Injectable()
export class BooksStore {
  private readonly booksState = signal<readonly Book[]>([]);
  private readonly searchQueryState = signal('');

  readonly books = this.booksState.asReadonly();
  readonly searchQuery = this.searchQueryState.asReadonly();

  readonly filteredBooks = computed(() =>
    filterBooksByTitle(this.booksState(), this.searchQueryState()),
  );

  addBook(book: BookInput): void {
    this.booksState.update((books) => [...books, { ...book, id: crypto.randomUUID() }]);
  }

  updateBook(id: string, book: BookInput): void {
    this.booksState.update((books) =>
      books.map((currentBook) => (currentBook.id === id ? { ...book, id } : currentBook)),
    );
  }

  removeBook(id: string): void {
    this.booksState.update((books) => books.filter((book) => book.id !== id));
  }

  replaceBooks(books: readonly BookInput[]): void {
    this.booksState.set(books.map((book) => ({ ...book, id: crypto.randomUUID() })));
  }

  setSearchQuery(query: string): void {
    this.searchQueryState.set(query);
  }

  sortBooks(): void {
    this.booksState.update((books) => sortBooksByAuthorAndTitle(books));
  }
}
