import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/application/app.module';

describe('PdfController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pdf/create-and-return (GET)', () => {
    return request(app.getHttpServer())
      .get('/pdf/create-and-return')
      .send({
        userName: 'Vladyslav Mykolyshyn',
        instructorName: 'Vitalik Matvieiev',
        durationOfCourseInHours: 10,
      })
      .expect(201)
      .expect('Content-Type', 'application/pdf');
  });

  afterAll(async () => {
    await app.close();
  });
});
