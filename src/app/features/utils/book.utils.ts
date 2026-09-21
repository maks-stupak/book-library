import { BookInput } from '../books/models/book.model';

export function getInitialBookInput(): BookInput {
  return {
    title: '',
    author: '',
    pages: 1,
  };
}
