import { Component, input, output } from '@angular/core';

import { Book } from '../../models/book.model';
import { BookCard } from '../book-card/book-card';

@Component({
  imports: [BookCard],
  selector: 'app-book-list',
  styleUrl: './book-list.scss',
  templateUrl: './book-list.html',
})
export class BookList {
  readonly books = input.required<readonly Book[]>();

  readonly edit = output<string>();
  readonly remove = output<string>();
}
