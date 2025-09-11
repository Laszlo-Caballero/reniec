import { Controller, Get, Param } from '@nestjs/common';
import { ReniecService } from './reniec.service';

@Controller('reniec')
export class ReniecController {
  constructor(private readonly reniecService: ReniecService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reniecService.findOne(+id);
  }
  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.reniecService.findByName(name);
  }
}
