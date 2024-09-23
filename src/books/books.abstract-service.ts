import { Injectable } from '@nestjs/common';
import { Book } from '../types/data.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export abstract class BooksAbstractService{
  abstract create(obj: CreateBookDto): Book; 
  abstract findOne(id: string): Book;
  abstract findAll(): Book[];
  abstract update(id: string, obj: UpdateBookDto): Book;
  abstract remove(id: string): void
}
