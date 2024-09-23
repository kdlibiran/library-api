import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsAbstractService } from './authors.abstract-service';
import { Author } from '../types/data.interface';
import { AuthorsOptionalService } from './with_books/authors-optional-service.interface';
@Controller('authors')
export class AuthorsController{
  constructor(
    @Inject('AuthorsService')
    private authorsService: AuthorsAbstractService & AuthorsOptionalService
  ) {
  }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) : Author {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() : Author[] {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Author {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) : Author {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : {message: string} {
    this.authorsService.remove(id);
    return {message: `Author with id: ${id} deleted successfully`};
  }

  @Post(':id/books/:bookId')
  addBook(@Param('id') id: string, @Param('bookId') bookId: string) : Author | {message: string} {
    if (this.authorsService?.addBook) {
      return this.authorsService.addBook(bookId, id);
    } else {
      return { message: 'addBook method is not implemented' };
    }
  }

  @Delete(':id/books/:bookId')
  removeBook(@Param('id') id: string, @Param('bookId') bookId: string) : Author | {message: string} {
    if (this.authorsService?.removeBook) {
      return this.authorsService.removeBook(bookId, id);
    } else {
      return { message: 'removeBook method is not implemented' };
    }
  }
}
