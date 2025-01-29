import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    //constructor para injetar dependencia
    constructor(private readonly prisma: PrismaService) { }

    //function para criar um usuario
    async createUser(data: Prisma.UserCreateInput) {
        //hashiando a senha
        const hashPassword = await bcrypt.hash(data.password, 10)

        //criando copia do data e adicionando senha hasheada ao objeto data
        return this.prisma.user.create({
            data: {...data, password : hashPassword
               
            }
        });
    }

    //function para pegar usuario
    async user(
        UserWhereUniqueInput:  Prisma.UserWhereUniqueInput,
      ): Promise<Omit <User, 'password'> | null> {
        return this.prisma.user.findUnique({
          where: UserWhereUniqueInput,
          select:{
            id: true,
            name: true,
            email: true,
            password: false,
            createdAt: true,
            updatedAt: true,

          }
        });
      }

    //function para update user
    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    //function para deletar user
    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }


}
