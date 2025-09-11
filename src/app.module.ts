import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReniecModule } from './reniec/reniec.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DATABASE_URL,
      port: 1433,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      options: {
        encrypt: process.env.ENCRYPT === 'true',
        trustServerCertificate: true,
        cancelTimeout: 0,
      },
    }),
    ReniecModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
