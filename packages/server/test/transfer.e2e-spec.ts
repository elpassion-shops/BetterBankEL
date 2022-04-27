import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import request from 'supertest';
import { TransferDto } from '@bank-el/dto-shared';

describe('transfer endpoint test', () => {
  let app: INestApplication;

  async function makeNewTransfer(createTransferDto: TransferDto) {
    await request(app.getHttpServer())
      .post('/transfer')
      .send(createTransferDto)
      .expect(201);
  }

  const mockTransfer: TransferDto = {
    amount: 500,
    title: 'Dupa',
    address: 'bla bla',
    sender: 'Janusz Januszowski',
    senderIBAN: '52101010234569456978451234',
    receiver: 'Bil Bilowalny',
    receiverIBAN: '52101010234569456978451234',
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

  describe('#GET /transfers', () => {
    it('should return empty array when no transfers added', async () => {
      return await request(app.getHttpServer())
        .get('/transfers')
        .expect(200)
        .expect([]);
    });
  });

  describe('#POST /transfers', () => {
    it('should add new transfer to database', async () => {
      await makeNewTransfer(mockTransfer);
      const { body: response } = await request(app.getHttpServer())
        .get('/transfers')
        .send();

      expect(response).toEqual([{ id: 1, ...mockTransfer }]);
    });
  });
});
