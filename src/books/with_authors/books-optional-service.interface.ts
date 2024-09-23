import { Book } from "src/types/data.interface";

export interface BooksOptionalService {
  addAuthor?(bookId: string, authorId: string): Book;
  removeAuthor?(bookId: string, authorId: string): Book;
}