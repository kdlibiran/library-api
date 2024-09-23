import { Inject, Injectable } from '@nestjs/common';
import { AuthorsAbstractService } from './authors.abstract-service';
import { AuthorsAbstractRepository } from './authors.abstract-repository';
import { Author, Book } from '../types/data.interface';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthorsService extends AuthorsAbstractService {
  constructor(
    @Inject('AuthorsRepository')
    private authorsRepository: AuthorsAbstractRepository
  ) {
    super()
  }

  create(obj: CreateAuthorDto): Author {
    const id = uuidv4();
    return this.authorsRepository.create({id, ...obj});
  }

  findOne(id: string): Author {
    return this.authorsRepository.findOne(id);
  }

  findAll(): Author[]{
    return this.authorsRepository.findAll()
  }


  update(id: string, obj: UpdateAuthorDto): Author {
    const item = this.authorsRepository.findOne(id);
    return this.authorsRepository.update(id, {...item, ...obj});

  }

  remove(id: string): void {
    return this.authorsRepository.delete(id);
  }
}
