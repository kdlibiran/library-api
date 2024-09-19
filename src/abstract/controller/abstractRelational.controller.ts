import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AbstractRelationalService } from '../service/abstractRelational.service';
import { AbstractObject } from '../../types/data.interface';
@Controller('authors')
export abstract class AbstractController<T extends AbstractObject,U extends AbstractObject> {
  constructor(protected abstractService: AbstractRelationalService<T,U>) {}

  abstract create(createAuthorDto: Partial<T>): T;
  abstract update(id: string, updateAuthorDto: Partial<T>) : T;
  abstract addRelated(id: string, relatedId: string) : T;
  abstract removeRelated(id: string, relatedId: string) : T;

  @Get()
  findAll() : T[] {
    return this.abstractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : T {
    return this.abstractService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) : void {
    return this.abstractService.remove(id);
  }
}
