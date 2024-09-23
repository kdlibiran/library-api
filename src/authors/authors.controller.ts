import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsAbstractService } from './authors.abstract-service';
import { Author } from '../types/data.interface';

@Controller('authors')
export class AuthorsController{
  constructor(
    @Inject('AuthorsService')
    private authorsService: AuthorsAbstractService
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
}
