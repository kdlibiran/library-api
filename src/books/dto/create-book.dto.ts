import {
    IsString,
    IsArray,
    MinLength
} from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { Book } from 'src/types/data.interface';

export class CreateBookDto extends OmitType(Book, ["id"]) {
    @IsArray({
        message: 'Authors has to be an array.'
    })
    @IsString({
        each: true,
        message: 'Authors has to be an array of strings.'
    })
    @MinLength(1, {
        message: 'There has to be at least one author.'
    })
    readonly authors: string[];
}

