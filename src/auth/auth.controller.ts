import { Body, Controller, HttpStatus, Post, HttpCode } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    //contructio para injetar dependencia
    constructor(private readonly authservice: AuthService){}
    //criando path para autenticar user
    @Post('signin')
    //altareando codigo http para retornar um 200 OK ao inves de 201 created
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Body() body: Prisma.UserCreateInput
    ){
        return this.authservice.signIn(body)
    }
    
}
