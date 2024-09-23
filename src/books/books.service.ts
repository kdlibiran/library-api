import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, Author } from '../types/data.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksAbstractRepository } from './books.abstract-repository';
import { BooksAbstractService } from './books.abstract-service';
import { Inject } from '@nestjs/common';

@Injectable()
export class BooksService extends BooksAbstractService{
  constructor(
    @Inject('BooksRepository') 
    private readonly booksRepository: BooksAbstractRepository,
  ) {
    super();
  }

  findOne(id: string): Book {
    return this.booksRepository.findOne(id);
  }

  findAll(): Book[] {
    return this.booksRepository.findAll();
  }

  create(createBookDto: CreateBookDto): Book {
    const id = uuidv4();
    return this.booksRepository.create({id, ...createBookDto});
  }

  update(id: string, obj: UpdateBookDto): Book {
    const item = this.findOne(id);
    return this.booksRepository.update(id, {...item, ...obj});
  }

  remove(id: string): void {
    this.booksRepository.delete(id);
  }
}
