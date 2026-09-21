import { Book, BookInput } from '../books/models/book.model';

export function getBookFormValue(book: Book): BookInput {
  return {
    title: book.title,
    author: book.author,
    pages: book.pages,
  };
}

export function getInitialBookFormValue(): BookInput {
  return {
    title: '',
    author: '',
    pages: 1,
  };
}
