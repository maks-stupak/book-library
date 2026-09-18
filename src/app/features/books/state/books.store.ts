import { Injectable, signal } from '@angular/core';

import { Book, BookInput } from '../models/book.model';

@Injectable()
export class BooksStore {
  private readonly booksState = signal<readonly Book[]>([]);

  readonly books = this.booksState.asReadonly();

  addBook(book: BookInput): void {
    this.booksState.update((books) => [
      ...books,
      {
        ...book,
        id: crypto.randomUUID(),
      },
    ]);
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
    this.booksState.set(
      books.map((book) => ({
        ...book,
        id: crypto.randomUUID(),
      })),
    );
  }
}
