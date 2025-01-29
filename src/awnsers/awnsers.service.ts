import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-awnser.dto';
import { UpdateAwnserDto } from './dto/update-awnser.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AwnsersService {
  //constructor para injetar dependencia
  constructor(private readonly prisma: PrismaService) { }

  //function para criar awnser
  async create(createAnswerDto: CreateAnswerDto, userId: number, questionId: number) {
    return this.prisma.answers.create({
      data: {
        body: createAnswerDto.body,
        user: {
          connect: { id: userId },
        },
        question: {
          connect: { id: questionId },
        },
      },
    });
  }

  //function para mostrar todos awnsers
  async findAll() {
    return await this.prisma.answers.findMany();
  }

  //function para mostrar um answer especifico
  async findOne(id: number) {
    return await this.prisma.answers.findUnique({
      where: {
        id: id,
      },
    });
  }

  //function para update awnser
  async update(id: number, updateAwnserDto: UpdateAwnserDto) {
    return this.prisma.answers.update({
      where: { id },
      data: updateAwnserDto,
    });
  }

  //function para delete awnser 
  async remove(id: number) {
    return this.prisma.answers.delete({
      where: {
        id: id,
      },
    });
  }
}
