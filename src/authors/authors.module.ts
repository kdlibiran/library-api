import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { DatabaseModule } from 'src/data/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {
  constructor(private readonly authorsService: AuthorsService) {
    
  }
}
