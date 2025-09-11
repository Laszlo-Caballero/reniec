import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Peruano')
export class Reniec {
  @PrimaryColumn({ name: 'DNI' })
  dni: string;
  @Column({ name: 'APELLIDO_PATERNO' })
  apellidoPaterno: string;

  @Column({ name: 'APELLIDO_MATERNO' })
  apellidoMaterno: string;

  @Column({ name: 'NOMBRES' })
  nombres: string;

  @Column({ name: 'FECHA_NACIMIENTO' })
  fechaNacimiento: string;

  @Column({ name: 'FECHA_INSCRIPCION' })
  fechaInscripcion: string;

  @Column({ name: 'FECHA_EMISION' })
  fechaEmision: string;

  @Column({ name: 'FECHA_CADUCIDAD' })
  fechaCaducidad: string;

  @Column({ name: 'UBIGEO_NACIMIENTO' })
  ubigeoNacimiento: string;

  @Column({ name: 'UBIGEO_DIRECCION' })
  ubigeoDomicilio: string;

  @Column({ name: 'DIRECCION' })
  direccion: string;

  @Column({ name: 'SEXO' })
  sexo: string;

  @Column({ name: 'ESTADO_CIVIL' })
  estadoCivil: string;

  @Column({ name: 'CODIGO_FICHA' })
  codigoFicha: string;

  @Column({ name: 'MADRE' })
  madre: string;

  @Column({ name: 'PADRE' })
  padre: string;
}
