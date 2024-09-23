import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { Book } from '../../types/data.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BooksAbstractRepository } from '../books.abstract-repository';
import { BooksAbstractService } from '../books.abstract-service';
import { Inject } from '@nestjs/common';
import { BooksOptionalService } from './books-optional-service.interface';
import { BooksAuthorsAbstractRepository } from 'src/books_authors/books-authors.abstract-repository';
@Injectable()
export class BooksWithAuthorsService extends BooksAbstractService implements BooksOptionalService {
  constructor(
    @Inject('BooksRepository') 
    private readonly booksRepository: BooksAbstractRepository,
    @Inject('BooksAuthorsRepository')
    private readonly bookAuthorRepository?: BooksAuthorsAbstractRepository
  ) {
    super();
  }

  findOne(id: string): Book {
    const book = this.booksRepository.findOne(id);
    const authors = this.bookAuthorRepository.findAllByBookId(id);
    return {...book, authors};
  }

  findAll(): Book[] {
    return this.booksRepository.findAll().map(book => {
      const authors = this.bookAuthorRepository.findAllByBookId(book.id);
      return {...book, authors};
    });
  }

  create(createBookDto: CreateBookDto): Book {
    const id = uuidv4();
    const book = this.booksRepository.create({id, ...createBookDto});
    createBookDto.authors.forEach(authorId => {
      this.bookAuthorRepository.create({bookId: book.id, authorId});
    });
    return book;
  }

  update(id: string, obj: UpdateBookDto): Book {
    const item = this.findOne(id);
    this.bookAuthorRepository.deleteAllByBookId(id);
    obj.authors.forEach(authorId => {
      this.bookAuthorRepository.create({bookId: id, authorId});
    });
    return this.booksRepository.update(id, {...item, ...obj});
  }

  remove(id: string): void {
    this.booksRepository.delete(id);
    this.bookAuthorRepository.deleteAllByBookId(id);
  }

  addAuthor(bookId: string, authorId: string): Book {
    this.bookAuthorRepository.create({bookId, authorId});
    return this.findOne(bookId);
  }

  removeAuthor(bookId: string, authorId: string): Book {
    this.bookAuthorRepository.delete(bookId, authorId);
    return this.findOne(bookId);
  }
}