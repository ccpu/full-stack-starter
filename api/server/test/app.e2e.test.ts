import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import type { App } from 'supertest/types';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from './../src/app.module';

// Constants
const HTTP_STATUS_OK = 200;

// eslint-disable-next-line test/prefer-lowercase-title
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    await request(app.getHttpServer()).get('/').expect(HTTP_STATUS_OK).expect('Hello World! (1)');
  });
});
