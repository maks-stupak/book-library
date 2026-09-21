import { Book } from '../models/book.model';

export function serializeBooksToXml(books: readonly Book[]): string {
  const booksXml = books
    .map(
      (book) => `
    <book>
      <title>${book.title}</title>
      <author>${book.author}</author>
      <pages>${book.pages}</pages>
    </book>`,
    )
    .join('');

  return `<library>${booksXml}</library>`;
}
