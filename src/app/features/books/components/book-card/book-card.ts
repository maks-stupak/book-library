import { Component, input, output } from '@angular/core';

import { Book } from '../../models/book.model';

@Component({
  imports: [],
  selector: 'app-book-card',
  styleUrl: './book-card.scss',
  templateUrl: './book-card.html',
})
export class BookCard {
  readonly book = input.required<Book>();

  readonly edit = output<string>();
  readonly remove = output<string>();
}
