import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { DepartmentsModule } from './departments/departments.module';
import { CalendersModule } from './calenders/calenders.module';
import { RequestsModule } from './requests/requests.module';
import { RolesGuard } from './auth/guard/roles.guard';
import { ArticlesModule } from './articles/articles.module';
import { CaslModule } from './casl/casl.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  imports: [
    ConfigModule.forRoot(),
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT, 
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: true,
    }),
    RolesModule,
    DepartmentsModule,
    CalendersModule,
    RequestsModule,
    ArticlesModule,
    CaslModule
  ],
})
export class AppModule {}
