import { Module } from '@nestjs/common';
import { ReniecService } from './reniec.service';
import { ReniecController } from './reniec.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reniec } from './entities/reniec.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Reniec]),
  ],
  controllers: [ReniecController],
  providers: [ReniecService],
})
export class ReniecModule {}
