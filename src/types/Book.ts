export interface Book {
  id: number;
  title: string;
  coverUrl: string | null;
  author: Author;
}
export interface Author {
    id: number;
    firstName: string;
    lastName: string;
  }
  