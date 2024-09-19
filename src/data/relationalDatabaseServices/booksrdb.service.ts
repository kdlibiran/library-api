import { Injectable } from '@nestjs/common';
import { Data } from '../database/data-reader.service';
import { Book } from '../../types/data.interface'; 
import { RelationalDbService } from './relationaldb.service';

@Injectable()
export class BooksRdbService extends RelationalDbService<Book> {
    constructor() {
        super(Data.books);
    }

    addRelatedEntity(entityId: string, relatedId: string): void {
        const book = this.getOne(entityId);
        book.authors.push(relatedId);
        this.update(book.id, book);
    }

    removeRelatedEntity(entityId: string, relatedId: string): void {
        const book = this.getOne(entityId);
        book.authors = book.authors.filter(id => id !== relatedId);
        this.update(book.id, book);
    }
}