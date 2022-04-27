import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import * as request from 'supertest';
import { TransferDto } from '@bank-el/dto-shared';

describe('transfer endpoint test', () => {
  let app: INestApplication;

  async function makeNewTransfer(createTransferDto: TransferDto) {
    await request(app.getHttpServer())
      .post('/transfer/new')
      .send(createTransferDto)
      .expect(201);
  }

  const mockTransfer: TransferDto = {
    accountId: 1,
    amount: 500,
    date: '2022-10-02',
    fromOrToName: 'Dupa',
    title: 'Dupa',
    type: 'incoming',
    address: 'bla bla',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('#GET /transfer', () => {
    it('should return empty array when no transfers added', async () => {
      return await request(app.getHttpServer())
        .get('/transfer')
        .expect(200)
        .expect([]);
    });
  });

  describe('#POST /transfer/new', () => {
    it('should add new transfer to database', async () => {
      await makeNewTransfer(mockTransfer);
      const { body: response } = await request(app.getHttpServer())
        .get('/transfer')
        .send();

      expect(response).toEqual([{ id: 1, ...mockTransfer }]);
    });
  });
});
