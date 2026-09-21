import { Component, computed, inject, signal } from '@angular/core';

import { BooksStore } from '../../state/books.store';
import { BookInput } from '../../models/book.model';
import { BookList } from '../../components/book-list/book-list';
import { BookForm } from '../../components/book-form/book-form';
import { LibraryToolbar } from '../../components/library-toolbar/library-toolbar';
import { parseBooksXml } from '../../../utils/book-xml.parser';
import { serializeBooksToXml } from '../../../utils/book-xml.serializer';
import { downloadFile } from '../../../utils/file-download';

@Component({
  imports: [BookForm, BookList, LibraryToolbar],
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

  protected searchBooks(query: string): void {
    this.store.setSearchQuery(query);
  }

  protected sortBooks(): void {
    this.store.sortBooks();
  }

  protected async importBooks(file: File): Promise<void> {
    try {
      const xml = await file.text();
      const books = parseBooksXml(xml);

      this.store.replaceBooks(books);
    } catch {
      window.alert('Unable to import the selected XML file.');
    }
  }

  protected exportBooks(): void {
    const xml = serializeBooksToXml(this.store.books());

    downloadFile(xml, 'books.xml', 'application/xml');
  }
}
