import { Injectable } from '@nestjs/common';
import { Book } from 'src/types/data.interface';

@Injectable()
export abstract class BooksAbstractRepository{
    abstract create(obj: Book): Book;
    abstract findOne(id: string): Book;
    abstract findAll(): Book[];
    abstract update(id: string, obj: Book): Book;
    abstract delete(id: string): void;
}