import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-awnser.dto';

export class UpdateAwnserDto extends PartialType(CreateAnswerDto) {}
