import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { v4 as uuidv4 } from 'uuid';
import { AbstractController } from '../abstract/controller/abstractRelational.controller';
import { Author, Book } from '../types/data.interface';

@Controller('authors')
export class AuthorsController extends AbstractController<Author, Book> {
  constructor(protected authorsService: AuthorsService) {
    super(authorsService);
  }

  @Post()
  override create(@Body() createAuthorDto: CreateAuthorDto) : Author {
    return this.authorsService.create({...createAuthorDto});
  }

  @Patch(':id')
  override update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) : Author {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Post(':id/books/:bookId')
  addRelated(@Param('id') id: string, @Param('bookId') bookId: string) : Author {
    return this.authorsService.addRelatedEntity(id, bookId);
    
  }

  @Delete(':id/books/:bookId')
  removeRelated(@Param('id') id: string, @Param('bookId') bookId: string) : Author {
    return this.authorsService.removeRelatedEntity(id, bookId);
  }
}
