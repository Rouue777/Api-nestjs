import { Test, TestingModule } from '@nestjs/testing';
import { AwnsersService } from './awnsers.service';

describe('AwnsersService', () => {
  let service: AwnsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwnsersService],
    }).compile();

    service = module.get<AwnsersService>(AwnsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
