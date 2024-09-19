import { Module } from '@nestjs/common';
import { AuthorsRdbService } from './relationalDatabaseServices/authorsrdb.service';
import { BooksRdbService } from './relationalDatabaseServices/booksrdb.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthorsRdbService, BooksRdbService],
  exports: [AuthorsRdbService, BooksRdbService],
})
export class DatabaseModule {}