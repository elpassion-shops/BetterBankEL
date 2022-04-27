import { rest } from 'msw';
import {
  ISendTransferResponse,
  ITransfer,
  ITransferHistory,
} from '@bank-el/interfaces';

interface login {
  username: string;
}

const mockTransfers: ITransferHistory = {
  transfers: [
    {
      id: 1,
      type: 'outgoing',
      date: '2020-04-23T14:48:00.000Z',
      amount: 42.32,
      title: 'lorem ipsum dipisem',
      sender: 'John Doe',
      address: 'Warsaw, Poland',
      senderIBAN: '94109024023531497238419635',
      receiver: 'Jane Black',
      receiverIBAN: '38109024029344988151812884',
    },
    {
      id: 2,
      type: 'incoming',
      date: '2020-04-20T14:48:00.000Z',
      amount: 100.5,
      title: 'lorem ipsum dipisem',
      address: 'Poznań, Poland',
      sender: 'John Doe',
      senderIBAN: '94109024023531497238419635',
      receiver: 'Jane Black',
      receiverIBAN: '38109024029344988151812884',
    },
    {
      id: 3,
      type: 'incoming',
      date: '2020-04-15T14:48:00.000Z',
      amount: 200.84,
      title: 'lorem ipsum dipisem',
      address: 'Toruń, Poland',
      sender: 'John Doe',
      senderIBAN: '94109024023531497238419635',
      receiver: 'Jane Black',
      receiverIBAN: '38109024029344988151812884',
    },
    {
      id: 4,
      type: 'incoming',
      date: '2020-04-10T14:48:00.000Z',
      amount: 300.09,
      title: 'lorem ipsum dipisem',
      address: 'Warsaw, Poland',
      sender: 'John Doe',
      senderIBAN: '94109024023531497238419635',
      receiver: 'Jane Black',
      receiverIBAN: '38109024029344988151812884',
    },
    {
      id: 5,
      type: 'outgoing',
      date: '2020-04-07T14:48:00.000Z',
      amount: 400.1,
      title: 'lorem ipsum dipisem',
      address: 'Warsaw, Poland',
      sender: 'John Doe',
      senderIBAN: '94109024023531497238419635',
      receiver: 'Jane Black',
      receiverIBAN: '38109024029344988151812884',
    },
    {
      id: 6,
      type: 'outgoing',
      date: '2020-03-24T14:48:00.000Z',
      amount: 500.0,
      title: 'lorem ipsum dipisem',
      address: 'Warsaw, Poland',
      sender: 'John Doe',
      senderIBAN: '94109024023531497238419635',
      receiver: 'Jane Black',
      receiverIBAN: '38109024029344988151812884',
    },
    {
      id: 7,
      type: 'outgoing',
      date: '2020-03-17T14:48:00.000Z',
      amount: 600.99,
      title: 'lorem ipsum dipisem',
      address: 'Warsaw, Poland',
      sender: 'John Doe',
      senderIBAN: '94109024023531497238419635',
      receiver: 'Jane Black',
      receiverIBAN: '38109024029344988151812884',
    },
    {
      id: 8,
      type: 'outgoing',
      date: '2020-06-12T14:48:00.000Z',
      amount: 700.44,
      title: 'lorem ipsum dipisem',
      address: 'Warsaw, Poland',
      sender: 'John Doe',
      senderIBAN: '94109024023531497238419635',
      receiver: 'Jane Black',
      receiverIBAN: '38109024029344988151812884',
    },
  ],
};

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
