import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Reniec } from './entities/reniec.entity';

@Injectable()
export class ReniecService {
  constructor(
    @InjectRepository(Reniec)
    private reniecRepository: Repository<Reniec>,
  ) {}

  async findOne(dni: number) {
    const person = await this.reniecRepository.findOneBy({
      dni: dni.toString(),
    });

    if (!person) {
      throw new HttpException('Person not found', 404);
    }

    const [departamento, provincia, distrito] =
      person.ubigeoDomicilio.split('-');

    const parsePerson = {
      ...person,
      departamento,
      provincia,
      distrito,
      sexo: person.sexo === '1' ? 'MASCULINO' : 'FEMENINO',
    };

    return {
      status: 200,
      message: 'Person found',
      data: parsePerson,
    };
  }

  async findByName(name: string) {
    const [person, count] = await this.reniecRepository.findAndCount({
      where: {
        nombres: Like(`%${name}%`),
      },
    });

    if (!person) {
      throw new HttpException('Person not found', 404);
    }

    return {
      status: 200,
      message: 'Person found',
      data: {
        person,
        count,
      },
    };
  }
}
