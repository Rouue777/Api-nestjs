import { Body, Controller, Post, Get, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { Prisma, User, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  //constructor para injetar dependencia
  constructor(private readonly userservice: UserService) { }

  //metodo post para criar user
  @Post('signup')
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userservice.createUser(
      userData
    );
  }

  //metodo para pegar user 

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(
    @Param('id') id: string,
  ): Promise<UserModel | null> {
    return this.userservice.user({ id: Number(id) });
  }

  //metodo para update user
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(@Body() userData: Prisma.UserUpdateInput,
    @Param('id') id: string): Promise<UserModel> {
    return this.userservice.updateUser({ where: { id: Number(id) }, data: userData })
  }

  //metodo para deletar user
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id')id : string): Promise<UserModel>{
    return this.userservice.deleteUser({id: Number(id)})
  }
}
