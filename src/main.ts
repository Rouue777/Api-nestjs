import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';


async function bootstrap() {

  //instanciar o prisma
try {
  
  //instanciar prisma 
  let prisma = new PrismaClient()

  await prisma.$connect();

  console.log('Conexão com o banco de dados estabelecida com sucesso!')

  const app = await NestFactory.create(AppModule);
  await app.listen(3333);

} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error);
}
 

}
bootstrap();
