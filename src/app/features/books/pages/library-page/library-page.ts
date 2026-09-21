import { Component, computed, inject, signal } from '@angular/core';

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

  protected readonly editingBookId = signal<string | null>(null);

  protected readonly editingBook = computed(() => {
    const id = this.editingBookId();
    return id ? (this.store.books().find((book) => book.id === id) ?? null) : null;
  });

  protected addBook(book: BookInput): void {
    this.store.addBook(book);
  }

  protected editBook(id: string): void {
    this.editingBookId.set(id);
  }

  protected updateBook(book: BookInput): void {
    const id = this.editingBookId();

    if (!id) return;

    this.store.updateBook(id, book);
    this.editingBookId.set(null);
  }

  protected cancelEditing(): void {
    this.editingBookId.set(null);
  }

  protected removeBook(id: string): void {
    this.store.removeBook(id);

    if (this.editingBookId() === id) this.editingBookId.set(null);
  }
}
