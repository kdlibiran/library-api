import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Inject } from '@nestjs/common';
import { BooksAbstractService } from './books.abstract-service';
import { BooksOptionalService } from './with_authors/books-optional-service.interface';
@Controller('books')
export class BooksController {
  constructor(
    @Inject('BooksService')
    private readonly booksService: BooksAbstractService & BooksOptionalService
  ) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':bookId')
  findOne(@Param('bookId') bookId: string) {
    return this.booksService.findOne(bookId);
  }

  @Patch(':bookId')
  update(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(bookId, updateBookDto);
  }

  @Delete(':bookId')
  remove(@Param('bookId') bookId: string) {
    return this.booksService.remove(bookId);
  }

  @Post(':bookId/authors/:authorId')
  addAuthor(@Param('bookId') bookId: string, @Param('authorId') authorId: string) {
    if (this.booksService?.addAuthor) {
      return this.booksService.addAuthor(bookId, authorId);
    } else {
      return { message: 'addAuthor method is not implemented' };
    }
  }

  @Delete(':bookId/authors/:authorId')
  removeAuthor(@Param('bookId') bookId: string, @Param('authorId') authorId: string) {
    if (this.booksService?.removeAuthor) {
      return this.booksService.removeAuthor(bookId, authorId);
    } else {
      return { message: 'removeAuthor method is not implemented' };
    }
  }
}
