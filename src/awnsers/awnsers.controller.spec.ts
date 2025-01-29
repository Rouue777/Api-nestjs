import { Test, TestingModule } from '@nestjs/testing';
import { AwnsersController } from './awnsers.controller';
import { AwnsersService } from './awnsers.service';

describe('AwnsersController', () => {
  let controller: AwnsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwnsersController],
      providers: [AwnsersService],
    }).compile();

    controller = module.get<AwnsersController>(AwnsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
