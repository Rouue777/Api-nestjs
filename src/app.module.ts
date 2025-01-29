import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { QuestionsModule } from './questions/questions.module';
import { AwnsersModule } from './awnsers/awnsers.module';




@Module({
  imports: [ AuthModule, UserModule, DatabaseModule, QuestionsModule, AwnsersModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
