export interface Book {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly pages: number;
}

export type BookInput = Omit<Book, 'id'>;
