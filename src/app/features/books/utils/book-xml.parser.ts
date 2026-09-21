import { BookInput } from '../models/book.model';

export function parseBooksXml(xml: string): BookInput[] {
  const document = new DOMParser().parseFromString(xml, 'application/xml');

  if (document.querySelector('parsererror')) throw new Error('Invalid XML file.');

  return Array.from(document.querySelectorAll('book')).map((book) => {
    const title = book.querySelector('title')?.textContent?.trim();
    const author = book.querySelector('author')?.textContent?.trim();
    const pages = Number(book.querySelector('pages')?.textContent);

    if (!title || !author || !Number.isInteger(pages) || pages < 1)
      throw new Error('Invalid book data.');

    return { title, author, pages };
  });
}
