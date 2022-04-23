import { rest } from 'msw';
import { ITransfer, ITransferHistory } from '@bank-el/interfaces';

interface login {
  username: string;
}

const mockTransfers: ITransferHistory = {
  transfers: [
    {
      id: '1',
      type: 'outgoing',
      date: '2020-04-23T14:48:00.000Z',
      amount: 100,
      fromOrToName: 'Aleks',
    },
    {
      id: '2',
      type: 'incoming',
      date: '2020-04-15T14:48:00.000Z',
      amount: 200,
      fromOrToName: 'Krystian',
    },
    {
      id: '3',
      type: 'outgoing',
      date: '2020-04-03T14:48:00.000Z',
      amount: 300,
      fromOrToName: 'Michał',
    },
    {
      id: '4',
      type: 'incoming',
      date: '2020-03-22T14:48:00.000Z',
      amount: 400,
      fromOrToName: 'Hubert',
    },
    {
      id: '5',
      type: 'outgoing',
      date: '2020-03-15T14:48:00.000Z',
      amount: 500,
      fromOrToName: 'Aleksander',
    },
    {
      id: '6',
      type: 'incoming',
      date: '2020-03-06T14:48:00.000Z',
      amount: 600,
      fromOrToName: 'Michał',
    },

    {
      id: '7',
      type: 'outgoing',
      date: '2020-02-07T14:48:00.000Z',
      amount: 700,
      fromOrToName: 'Hubert',
    },
  ],
};

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_SERVER}/api/account`,
    (_req, res, ctx) => {
      return res(
        ctx.json({
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
      return res(
        ctx.json({
          isCorrect: true,
          transferID: Math.floor(Math.random() * 1000 + 10),
          accountBalance: 6666,
          message: 'Mock transfer was created',
        })
      );
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

  rest.post<login>(
    `${process.env.NEXT_PUBLIC_SERVER}/login`,
    (req, res, ctx) => {
      const { username } = req.body;

      return res(
        ctx.json({
          id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
          username,
          firstName: 'John',
          lastName: 'Maverick',
        })
      );
    }
  ),
];
