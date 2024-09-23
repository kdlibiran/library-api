import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorsRepository } from './authors.repository';
import { DatabaseModule } from 'src/data/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [AuthorsController],
  providers: [
    {
      provide: 'AuthorsRepository',
      useClass: AuthorsRepository
    },
    {
      provide: 'AuthorsService',
      useClass: AuthorsService
    }
  ],
})
export class AuthorsModule {}


