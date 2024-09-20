import { Injectable } from '@nestjs/common';
import { RelationalDbService } from '../../data/relationalDatabaseServices/relationaldb.service';
import { AbstractObject } from 'src/types/data.interface';
import { AbstractService } from './abstract.service';
@Injectable()

export abstract class AbstractRelationalService<T extends AbstractObject, U extends AbstractObject> extends AbstractService<T> {
  constructor(protected readonly mainDb: RelationalDbService<T>, protected readonly relatedDb: RelationalDbService<U>) {
    super(mainDb);
  }
  abstract override findOne(id: string): T;
  abstract override update(id: string, obj: Partial<T>): T;
  abstract override remove(id: string): void;

  override findAll(): T[] {
    return super.findAll().map(item => {
      return this.findOne(item.id);
    });
  }

  linkEntity(entityId: string, relatedId: string): T {
    this.mainDb.addRelatedEntity(entityId, relatedId);
    this.relatedDb.addRelatedEntity(relatedId, entityId);
    return this.findOne(entityId);
  }

  unlinkEntity(entityId: string, relatedId: string): T {
    this.mainDb.removeRelatedEntity(entityId, relatedId);
    this.relatedDb.removeRelatedEntity(relatedId, entityId);
    return this.findOne(entityId);
  }
}
