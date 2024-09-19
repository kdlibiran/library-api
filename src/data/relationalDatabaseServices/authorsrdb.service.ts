import { Injectable } from '@nestjs/common';
import { Data } from '../database/data-reader.service';
import { Author } from '../../types/data.interface'; 
import { RelationalDbService } from './relationaldb.service';

@Injectable()
export class AuthorsRdbService extends RelationalDbService<Author> {
    constructor() {
        super(Data.authors);
    }

    addRelatedEntity(entityId: string, relatedId: string): void {
        const author = this.getOne(entityId)
        author.books.push(relatedId);
        this.update(author.id, author);
    }

    removeRelatedEntity(entityId: string, relatedId: string): void {
        const author = this.getOne(entityId);
        author.books = author.books.filter(id => id !== relatedId);
        this.update(author.id, author);
    }
}