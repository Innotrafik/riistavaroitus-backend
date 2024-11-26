import { Test, TestingModule } from '@nestjs/testing';
import { DangerzonesController } from './dangerzones.controller';

describe('DangerzonesController', () => {
  let controller: DangerzonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DangerzonesController],
    }).compile();

    controller = module.get<DangerzonesController>(DangerzonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
