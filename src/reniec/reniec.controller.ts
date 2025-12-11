import { Body, Controller, Get, Param } from '@nestjs/common';
import { ReniecService } from './reniec.service';
import { FindReniecDto } from './dto/find-reniec.dto';

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

  @Get('person')
  findPerson(@Body() body: FindReniecDto) {
    return this.reniecService.findByDto(body);
  }
}
