import { Injectable } from '@nestjs/common';
import { Author } from '../types/data.interface';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export abstract class AuthorsAbstractService{
  abstract create(obj: CreateAuthorDto): Author; 
  abstract findOne(id: string): Author;
  abstract findAll(): Author[];
  abstract update(id: string, obj: UpdateAuthorDto): Author;
  abstract remove(id: string): void
}
