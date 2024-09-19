import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractDbService } from '../../data/databaseServices/abstractdb.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()

export abstract class AbstractService<T extends {id: string}> {
  constructor(protected readonly db: AbstractDbService<T>) {}

  abstract create(obj: Partial<T>): T

  findAll(): T[] {
    return this.db.getAll();
  }

  findOne(id: string) {
    const item = this.db.getOne(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  update(id: string, obj: Partial<T>): T {
    const item = this.findOne(id);
    return this.db.update(id, {...item, ...obj});
  }

  remove(id: string) {
    return this.db.delete(id);
  }
}
