import { Component, input, linkedSignal, output, signal } from '@angular/core';
import { form, FormField, min, required } from '@angular/forms/signals';

import { Book, BookInput } from '../../models/book.model';
import { getBookFormValue, getInitialBookFormValue } from '../../../utils/book.utils';
import { BookFormMode } from '../../models/book-form.model';

@Component({
  imports: [FormField],
  selector: 'app-book-form',
  styleUrl: './book-form.scss',
  templateUrl: './book-form.html',
})
export class BookForm {
  readonly mode = input<BookFormMode>('add');
  readonly book = input<Book | null>(null);

  readonly save = output<BookInput>();
  readonly cancel = output<void>();

  protected readonly model = linkedSignal<BookInput>(() => {
    const book = this.book();

    return this.mode() === 'edit' && book ? getBookFormValue(book) : getInitialBookFormValue();
  });

  protected readonly bookForm = form(this.model, (book) => {
    required(book.title);
    required(book.author);
    min(book.pages, 1);
  });

  protected submitForm(event: SubmitEvent): void {
    event.preventDefault();
    if (this.bookForm().invalid()) return;

    this.save.emit(this.model());
    if (this.mode() === 'add') this.bookForm().reset(getInitialBookFormValue());
  }

  protected cancelEditing(): void {
    this.cancel.emit();
  }
}
