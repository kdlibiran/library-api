import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AbstractController } from '../abstract/controller/abstractRelational.controller';
import { Book, Author } from '../types/data.interface';

@Controller('books')
export class BooksController extends AbstractController<Book, Author> {
  constructor(private readonly booksService: BooksService) {
    super(booksService);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Post(':id/authors/:authorId')
  addRelated(@Param('id') id: string, @Param('authorId') authorId: string) {
    return this.booksService.linkEntity(id, authorId);
  }

  @Delete(':id/authors/:authorId')
  removeRelated(@Param('id') id: string, @Param('authorId') authorId: string) {
    return this.booksService.unlinkEntity(id, authorId);
  }
}
