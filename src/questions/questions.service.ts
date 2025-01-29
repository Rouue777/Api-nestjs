import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Awnser, } from 'src/awnsers/entities/awnser.entity';

@Injectable()
export class QuestionsService {
  // contructor para injetar dependencias
  constructor(private readonly prisma: PrismaService) { }

  async create(createQuestionDto: CreateQuestionDto, req: any) {
    return await this.prisma.questions.create({
      data: {
        ...createQuestionDto,
        userId: req.sub.sub.id
      }
    })
    
  }
  async findAll() {
        //retornando todos os registros da table Questions
        return await this.prisma.questions.findMany({
          include: {
            answers: true, user: {
              select: {
                name: true,
              }
            }
          }
        }
          
        );
      }

  async findOne(id: number) {
        //retornando um registro da table Questions
        return await this.prisma.questions.findUnique({
          where: {
            id: id,

          },
          include: {
            answers: true, user: true
          }
        });
      }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
        //atualizando um registro da table Questions
        return await this.prisma.questions.update({
          where: { id },
          data: updateQuestionDto,
        })
      }

  async remove(id: number) {
        return await this.prisma.questions.delete({
          where: {
            id: id,
          },
        });
      }
    }
