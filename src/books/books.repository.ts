import { Injectable } from '@nestjs/common';
import { Book, IBooks } from 'src/types/data.interface';
import { BooksAbstractRepository } from './books.abstract-repository';
import { Data } from 'src/data/database/data-reader.service';

@Injectable()
export class BooksRepository extends BooksAbstractRepository{
    private readonly books: IBooks = Data.books;
    
    create(obj: Book): Book {
        this.books[obj.id] = obj;
        return obj;
    }
    findOne(id: string): Book {
        return this.books[id];
    }
    findAll(): Book[] {
        return Object.values(this.books);
    }
    update(id: string, obj: Book): Book {
        this.books[id] = obj;
        return obj;
    }
    delete(id: string): void {
        delete this.books[id];
    }
}