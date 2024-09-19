import { Injectable } from '@nestjs/common';
import { AbstractObject } from '../../types/data.interface';
import { AbstractDbService } from '../databaseServices/abstractdb.service';

@Injectable()
export abstract class RelationalDbService<T extends AbstractObject> extends AbstractDbService<T> {
    constructor(data: { [key: string]: T } = {}) {
        super(data);
    }
    abstract addRelatedEntity(entityId: string, relatedId: string): void;
    abstract removeRelatedEntity(entityId: string, relatedId: string): void;
}