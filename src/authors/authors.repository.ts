import { Injectable } from '@nestjs/common';
import { Author, IAuthors } from 'src/types/data.interface';
import { AuthorsAbstractRepository } from './authors.abstract-repository';
import { Data } from 'src/data/database/data-reader.service';

@Injectable()
export class AuthorsRepository extends AuthorsAbstractRepository{
    private readonly authors: IAuthors = Data.authors;
    
    create(obj: Author): Author {
        this.authors[obj.id] = obj;
        return obj;
    }
    findOne(id: string): Author {
        return this.authors[id];
    }
    findAll(): Author[] {
        return Object.values(this.authors);
    }
    update(id: string, obj: Author): Author {
        this.authors[id] = obj;
        return obj;
    }
    delete(id: string): void {
        delete this.authors[id];
    }
}