import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, } from '@nestjs/common';
import { AwnsersService } from './awnsers.service';
import { CreateAnswerDto } from './dto/create-awnser.dto';
import { UpdateAwnserDto } from './dto/update-awnser.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/validationSchema/validation.pipe';

@Controller('answers')
export class AwnsersController {
  constructor(private readonly answersService: AwnsersService) {}

  //criar uma nova awnser
  @Post(':questionId')
  @UseGuards(AuthGuard)
  create(@Body(new ValidationPipe) createAnswerDto: CreateAnswerDto, @Param('questionId') questionId: string, @Request() req: any) {
    console.log(req.sub.sub.id);
    const userId = req.sub.sub.id;
    return this.answersService.create(createAnswerDto, userId, Number(questionId));
  }

  //mostrar todas awnsers 
  @Get()
  findAll() {
    return this.answersService.findAll();
  }
 //mostrar awnser especifico
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  //update awnser
  @Patch(':id')
  update(@Param('id') id: string, @Body( new ValidationPipe) updateAwnserDto: UpdateAwnserDto) {
    return this.answersService.update(+id, updateAwnserDto);
  }

  //delete awnser
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
