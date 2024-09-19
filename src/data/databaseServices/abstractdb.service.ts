import { Injectable } from '@nestjs/common';
import { AbstractObject } from '../../types/data.interface';

@Injectable()
export abstract class AbstractDbService<T extends AbstractObject> {
    protected data: { [key: string]: T } = {};

    constructor(initialData: { [key: string]: T } = {}) {
        this.data = { ...initialData };
    }

    create(obj: T): T {
        this.data[obj.id] = obj;
        return obj;
    }

    getOne(id: string): T {
        return this.data[id];
    }
    
    getAll(): T[] {
        return Object.values(this.data);
    }

    update(id: string, obj: T): T {
        this.data[id] = obj;
        return obj;
    }

    delete(id: string): void {
        delete this.data[id];
    }
}