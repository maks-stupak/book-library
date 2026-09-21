import { Book } from '../books/models/book.model';

export function sortBooksByAuthorAndTitle(books: readonly Book[]): Book[] {
  return [...books].sort(
    (a, b) => a.author.localeCompare(b.author) || a.title.localeCompare(b.title),
  );
}
