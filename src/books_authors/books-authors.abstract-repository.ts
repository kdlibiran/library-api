import { Injectable } from '@nestjs/common';
import { BookAuthor } from '../types/data.interface';

@Injectable()
export abstract class BooksAuthorsAbstractRepository{
  abstract create(obj: BookAuthor): BookAuthor; 
  abstract findAllByBookId(bookId: string): string[];
  abstract findAllByAuthorId(authorId: string): string[];
  abstract delete(bookId: string, authorId: string): void;
  abstract deleteAllByBookId(bookId: string): void;
  abstract deleteAllByAuthorId(authorId: string): void;
}
