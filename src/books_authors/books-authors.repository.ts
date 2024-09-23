import { Injectable } from '@nestjs/common';
import { BookAuthor } from '../types/data.interface';
import { BooksAuthorsAbstractRepository } from './books-authors.abstract-repository';
import { Data } from 'src/data/database/data-reader.service';
@Injectable()
export class BooksAuthorsRepository implements BooksAuthorsAbstractRepository{
    private booksAuthors: BookAuthor[] = Data.books_authors;

    create(obj: BookAuthor): BookAuthor {
        this.booksAuthors.push(obj);
        return obj;
    }

    findAllByBookId(bookId: string): string[] {
        return this.booksAuthors.filter(bookAuthor => bookAuthor.bookId === bookId).map(bookAuthor => bookAuthor.authorId);
    }

    findAllByAuthorId(authorId: string): string[] {
        return this.booksAuthors.filter(bookAuthor => bookAuthor.authorId === authorId).map(bookAuthor => bookAuthor.bookId);
    }
    
    delete(bookId: string, authorId: string): void {
        this.booksAuthors = this.booksAuthors.filter(
            bookAuthor => !(bookAuthor.bookId === bookId && bookAuthor.authorId === authorId)
        );
    }

    deleteAllByBookId(bookId: string): void {
        this.booksAuthors = this.booksAuthors.filter(bookAuthor => bookAuthor.bookId !== bookId);
    }

    deleteAllByAuthorId(authorId: string): void {
        this.booksAuthors = this.booksAuthors.filter(bookAuthor => bookAuthor.authorId !== authorId);
    }
}

