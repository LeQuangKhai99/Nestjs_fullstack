import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
export const getConfig = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'mysql',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'fullstack',
        autoLoadEntities: true,
        synchronize: true,
      }),
    ],
  }).compile();
  return moduleFixture;
}

