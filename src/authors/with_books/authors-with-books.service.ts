import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { Author, Book } from '../../types/data.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorsAbstractRepository } from '../authors.abstract-repository';
import { AuthorsAbstractService } from '../authors.abstract-service';
import { Inject } from '@nestjs/common';
import { AuthorsOptionalService } from './authors-optional-service.interface';
import { BooksAuthorsAbstractRepository } from 'src/books_authors/books-authors.abstract-repository';
@Injectable()
export class AuthorsWithBooksService extends AuthorsAbstractService implements AuthorsOptionalService {
  constructor(
    @Inject('AuthorsRepository') 
    private readonly authorsRepository: AuthorsAbstractRepository,
    @Inject('BooksAuthorsRepository')
    private readonly bookAuthorRepository?: BooksAuthorsAbstractRepository
  ) {
    super();
  }

  findOne(id: string): Author {
    const author = this.authorsRepository.findOne(id);
    const books = this.bookAuthorRepository.findAllByBookId(id);
    return {...author, books};
  }

  findAll(): Author[] {
    return this.authorsRepository.findAll().map(author => {
      const books = this.bookAuthorRepository.findAllByBookId(author.id);
      return {...author, books};
    });
  }

  create(createAuthorDto: CreateAuthorDto): Author {
    const id = uuidv4();
    const author = this.authorsRepository.create({id, ...createAuthorDto});
    createAuthorDto.books.forEach(bookId => {
      this.bookAuthorRepository.create({bookId, authorId: author.id});
    });
    return author;
  }

  update(id: string, obj: UpdateAuthorDto): Author {
    const item = this.findOne(id);
    this.bookAuthorRepository.deleteAllByBookId(id);
    obj.books.forEach(bookId => {
      this.bookAuthorRepository.create({bookId, authorId: id});
    });
    return this.authorsRepository.update(id, {...item, ...obj});
  }

  remove(id: string): void {
    this.authorsRepository.delete(id);
    this.bookAuthorRepository.deleteAllByBookId(id);
  }

  addBook(bookId: string, authorId: string): Author {
    this.bookAuthorRepository.create({bookId, authorId});
    return this.findOne(bookId);
  }

  removeBook(bookId: string, authorId: string): Author {
    this.bookAuthorRepository.delete(bookId, authorId);
    return this.findOne(bookId);
  }
}