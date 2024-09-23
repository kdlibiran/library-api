import { Author } from "src/types/data.interface";

export interface AuthorsOptionalService {
  addBook?(bookId: string, authorId: string): Author;
  removeBook?(bookId: string, authorId: string): void;
}