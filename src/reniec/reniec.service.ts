import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Reniec } from './entities/reniec.entity';
import { FindReniecDto } from './dto/find-reniec.dto';
import { parseDDMMYYYY } from 'src/utils/parseDate';
import { DocNamesDto } from './dto/doc-names.dto';

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

  async findByDto(dto: FindReniecDto) {
    const person = await this.reniecRepository.findOneBy({
      dni: dto.numeroDocumento,
    });

    if (!person) {
      throw new HttpException('Person not found', 404);
    }
    const { dni, ...rest } = person;

    const parsePerson = {
      id: -1,
      tipoDocumento: dto.tipoDocumento,
      numeroDocumento: dni,
      telefono: null,
      nombres: rest.nombres,
      apellidoPaterno: rest.apellidoPaterno,
      apellidoMaterno: rest.apellidoMaterno,
      fechaNacimiento: parseDDMMYYYY(rest.fechaNacimiento),
      fechaInscripcion: parseDDMMYYYY(rest.fechaInscripcion),
      fechaEmision: parseDDMMYYYY(rest.fechaEmision),
      fechaCaducidad: parseDDMMYYYY(rest.fechaCaducidad),
      ubigeoNacimiento: rest.ubigeoNacimiento,
      ubigeoDireccion: rest.ubigeoDomicilio,
      direccion: rest.direccion,
      estadoCivil: rest.estadoCivil,
      genero: rest.sexo === '1' ? 'MASCULINO' : 'FEMENINO',
      madre: rest.madre,
      padre: rest.padre,
    };

    return {
      status: 200,
      message: 'Person found',
      data: parsePerson,
    };
  }

  async findByDocNames(dto: DocNamesDto) {
    const isDni = !!dto.dni;

    if (isDni) {
      const person = await this.reniecRepository.findOneBy({
        dni: dto.dni,
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

    const { nombres, apellidos } = dto;

    const [apellidoPaterno, apellidoMaterno] = apellidos!.split(' ');

    const person = await this.reniecRepository.findOneBy({
      nombres: Like(`%${nombres}%`),
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
    });

    if (!person) {
      throw new HttpException('Person not found', 404);
    }

    return {
      status: 200,
      message: 'Person found',
      data: person,
    };
  }
}
