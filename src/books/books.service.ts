import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, Author } from '../types/data.interface';
import { BooksRdbService } from '../data/relationalDatabaseServices/booksrdb.service';
import { AuthorsRdbService } from '../data/relationalDatabaseServices/authorsrdb.service';
import { AbstractRelationalService } from '../abstract/service/abstractRelational.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService extends AbstractRelationalService<Book, Author>{
  constructor(private readonly booksDbService: BooksRdbService, private readonly authorsDbService: AuthorsRdbService) {
    super(booksDbService, authorsDbService);
  }

  findOne(id: string): Book {
    const item = this.booksDbService.getOne(id);
    const authors = item.authors.map((authorId:string) => this.authorsDbService.getOne(authorId));
    return {...item, authors};
  }

  create(createBookDto: CreateBookDto): Book {
    const id = uuidv4();
    this.booksDbService.create({id, ...createBookDto});
    createBookDto.authors.forEach((authorId:string) => this.authorsDbService.addRelatedEntity(authorId, id));
    return this.findOne(id);
  }

  update(id: string, obj: UpdateBookDto): Book {
    const item = this.findOne(id);
    const updatedItem = this.booksDbService.update(id, {...item, ...obj});
    if (item.authors !== updatedItem.authors) {
      item.authors.forEach((author) => this.authorsDbService.removeRelatedEntity(typeof author == 'string' ? author : author.id, id));
      updatedItem.authors.forEach((author) => this.authorsDbService.addRelatedEntity(typeof author == 'string' ? author : author.id, id));
    }
    return this.findOne(id);
  }

  remove(id: string): void {
    const item = this.findOne(id);
    this.booksDbService.delete(id);
    item.authors.forEach((author) => this.authorsDbService.removeRelatedEntity(typeof author == 'string' ? author : author.id, id));
  }
}
