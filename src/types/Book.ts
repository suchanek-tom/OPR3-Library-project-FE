export interface Book {
  id: number;
  title: string;
  isbn: string;
  publicationYear: number;
  available: boolean;
  authors?: { id: number; name: string }[];
}
