import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DatabaseModule } from 'src/data/database.module';
import { BooksRepository } from './books.repository';
@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [
    {
      provide: 'BooksService',
      useClass: BooksService
    },
    {
      provide: 'BooksRepository',
      useClass: BooksRepository
    }
  ],
})
export class BooksModule {}
