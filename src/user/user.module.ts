import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports : [DatabaseModule, QuestionsModule],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService]

})
export class UserModule {}
