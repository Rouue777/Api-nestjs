import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    //injetando dependencias
    constructor(private readonly userservice: UserService,
        private readonly jwtservice: JwtService
    ) { }

    //metodo para authentificar user
    async signIn(params: Prisma.UserCreateInput) {
        const user = await this.userservice.user({ email: params.email })
        //verificando se o user existe
        if (!user) {
            throw new UnauthorizedException('Usuario não encontrado')
        }
        //verificando se a senha esta correta
        const passwordDecripted = await bcrypt.compare(params.password, user.password)
        if (!passwordDecripted) {
            throw new UnauthorizedException('Credenciais incorretas')
        }

        //criando um payload com id do user
        const payload = { sub: user.id}

        //retornando token com o payload
        return {
            access_token: await this.jwtservice.signAsync(payload),
          };  
      

    }
}
