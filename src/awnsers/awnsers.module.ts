import { Module } from '@nestjs/common';
import { AwnsersService } from './awnsers.service';
import { AwnsersController } from './awnsers.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AwnsersController, ],
  providers: [AwnsersService],
})
export class AwnsersModule {}
