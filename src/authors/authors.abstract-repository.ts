import { Injectable } from '@nestjs/common';
import { Author } from 'src/types/data.interface';

@Injectable()
export abstract class AuthorsAbstractRepository{
    abstract create(obj: Author): Author;
    abstract findOne(id: string): Author;
    abstract findAll(): Author[];
    abstract update(id: string, obj: Author): Author;
    abstract delete(id: string): void;
}