import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo('Create [POST /]');
  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      // .expect(200)
      // .expect('Hello World!')
      .then((res) => {
        console.log(res);
      })
      ;
  });
});
