import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service'; //For Author without Book
import { AuthorsWithBooksService } from './authors-with-books.service'; //For Author with Book
import { AuthorsController } from './authors.controller';
import { AuthorsRepository } from './authors.repository';
import { BooksAuthorsRepository } from 'src/books_authors/books-authors.repository';
@Module({
  controllers: [AuthorsController],
  providers: [
    {
      provide: 'AuthorsRepository',
      useClass: AuthorsRepository 
    },
    {
      provide: 'AuthorsService',
      useClass: AuthorsService //Change this for different implementation
    },
    {
      provide: 'BooksAuthorsRepository',
      useClass: BooksAuthorsRepository
    }
  ],
})
export class AuthorsModule {}


