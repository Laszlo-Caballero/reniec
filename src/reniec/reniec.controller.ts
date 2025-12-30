import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReniecService } from './reniec.service';
import { FindReniecDto } from './dto/find-reniec.dto';
import { DocNamesDto } from './dto/doc-names.dto';

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

  @Post('person')
  findPerson(@Body() body: FindReniecDto) {
    return this.reniecService.findByDto(body);
  }

  @Post('doc-names')
  findByDocNames(@Body() body: DocNamesDto) {
    return this.reniecService.findByDocNames(body);
  }
}
