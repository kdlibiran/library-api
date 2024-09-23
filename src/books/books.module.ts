import { Module } from '@nestjs/common';
import { BooksService } from './books.service'; //For Book without Author
import { BooksWithAuthorsService } from './books-with-authors.service'; //For Book with Author
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { BooksAuthorsRepository } from 'src/books_authors/books-authors.repository';
@Module({
  imports: [],
  controllers: [BooksController],
  providers: [
    {
      provide: 'BooksService',
      useClass: BooksWithAuthorsService //Change this for different implementation
    },
    {
      provide: 'BooksRepository',
      useClass: BooksRepository
    },
    {
      provide: 'BooksAuthorsRepository',
      useClass: BooksAuthorsRepository
    }
  ],
})
export class BooksModule {}
