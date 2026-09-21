import { Component, output, signal } from '@angular/core';
import { form, FormField, min, required } from '@angular/forms/signals';

import { BookInput } from '../../models/book.model';
import { getInitialBookInput } from '../../../utils/book.utils';

@Component({
  imports: [FormField],
  selector: 'app-book-form',
  styleUrl: './book-form.scss',
  templateUrl: './book-form.html',
})
export class BookForm {
  readonly save = output<BookInput>();

  readonly model = signal<BookInput>(getInitialBookInput());

  readonly bookForm = form(this.model, (book) => {
    required(book.title);
    required(book.author);
    min(book.pages, 1);
  });

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (this.bookForm().invalid()) return;

    this.save.emit(this.model());
    this.bookForm().reset(getInitialBookInput());
  }
}
