import { Injectable } from '@nestjs/common';
import { AbstractRelationalService } from '../abstract/service/abstractRelational.service';
import { Author, Book } from '../types/data.interface';
import { AuthorsRdbService } from '../data/relationalDatabaseServices/authorsrdb.service';
import { BooksRdbService } from '../data/relationalDatabaseServices/booksrdb.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthorsService extends AbstractRelationalService<Author, Book> {
  constructor(private readonly authorsDbService: AuthorsRdbService, private readonly booksDbService: BooksRdbService) {
    super(authorsDbService, booksDbService);
  }

  findOne(id: string): Author {
    const item = this.authorsDbService.getOne(id);
    const relatedEntities = this.booksDbService.getAll().filter(entity => entity.id.includes(entity.id));
    return {...item, books: relatedEntities};
  }

  create(obj: CreateAuthorDto): Author {
    const id = uuidv4();
    this.authorsDbService.create({id, ...obj}); // generate id, or other fields not in the DTO
    for (const bookId of obj.books) {
      this.booksDbService.addRelatedEntity(bookId, id);
    }
    return this.findOne(id);
  }

  update(id: string, obj: UpdateAuthorDto): Author {
    const item = this.authorsDbService.getOne(id);
    const updatedItem = this.authorsDbService.update(id, {...item, ...obj});
    if (item.books !== updatedItem.books) {
        item.books.forEach((book) => this.booksDbService.removeRelatedEntity(typeof book == 'string' ? book : book.id, id));
        updatedItem.books.forEach((book) => this.booksDbService.addRelatedEntity(typeof book == 'string' ? book : book.id, id));
    }
    return this.findOne(id);
  }

  remove(id: string): void {
    const item = this.findOne(id);
    this.authorsDbService.delete(id);
    item.books.forEach((book) => this.booksDbService.removeRelatedEntity(typeof book == 'string' ? book : book.id, id));
  }
}
