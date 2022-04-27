import { rest } from 'msw';
import {
  ISendTransferResponse,
  ITransfer,
  ITransferHistory,
} from '@bank-el/interfaces';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

export const TransferMock = Factory.Sync.makeFactory<ITransfer>({
  id: Factory.each(() => faker.random.number({ min: 0, max: 10000 })),
  type: Factory.each(() => faker.random.arrayElement(['outgoing', 'incoming'])),
  date: Factory.each(() => faker.date.past().toISOString()),
  amount: Factory.each(() =>
    faker.random.number({ min: 10, max: 5000, precision: 0.01 })
  ),
  title: Factory.each(() => faker.lorem.sentence(5)),
  sender: Factory.each(() => faker.name.findName(undefined, undefined)),
  address: Factory.each(() => faker.address.streetAddress(true)),
  senderIBAN: Factory.each(() => faker.finance.iban(true, 'PL').slice(2, -1)),
  receiver: Factory.each(() => faker.name.findName(undefined, undefined)),
  receiverIBAN: Factory.each(() => faker.finance.iban(true, 'PL').slice(2, -1)),
});

const mockTransfers: ITransferHistory = {
  transfers: TransferMock.buildList(10),
};
console.log(mockTransfers);

interface login {
  username: string;
}

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_SERVER}/api/account`,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          userId: 1,
          accountBalance: 42,
          accountNumber: '61109010140000071219812874',
        })
      );
    }
  ),
  rest.get<ITransferHistory>(
    `${process.env.NEXT_PUBLIC_SERVER}/api/transfers`,
    (_req, res, ctx) => {
      return res(ctx.json(mockTransfers));
    }
  ),

  rest.post<ITransfer>(
    `${process.env.NEXT_PUBLIC_SERVER}/api/transfers/new`,
    (_req, res, ctx) => {
      const sendTransferResponse: ISendTransferResponse = {
        isCorrect: true,
        transferID: Math.floor(Math.random() * 1000 + 10),
        accountBalance: 6666,
        message: 'Mock transfer was created',
      };

      return res(ctx.json(sendTransferResponse));
    }
  ),

  rest.get('https://my.backend/book', (_req, res, ctx) => {
    return res(
      ctx.json({
        title: 'Lord of the Rings',
        imageUrl: '/book-cover.jpg',
        description:
          'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
      })
    );
  }),
];
