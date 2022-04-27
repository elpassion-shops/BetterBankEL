import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtStrategyMock } from '../src/auth/jwt.mock.strategy';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { LoginModule } from '../src/login/login.module';

describe('Login Endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LoginModule],
    })
      .overrideProvider(JwtStrategy)
      .useClass(JwtStrategyMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('#GET /login/', () => {
    function getMe() {
      return request(app.getHttpServer()).get('/login/');
    }

    it('should return 401 when unauthorized', async () => {
      return getMe().expect(401);
    });

    it('should return 200 when authorized', async () => {
      return asAuthorizedUser(getMe(), getMihauUser()).expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

function getMihauUser() {
  return { nickname: 'Mihau' };
}

function asAuthorizedUser(fn: request.Test, params: { nickname?: string }) {
  return fn.set({
    Authorization: `Bearer ${getToken(params)}`,
  });
}

const getToken = (params: { nickname?: string }) => {
  return jwt.sign(
    {
      nickname: params.nickname || 'reshcode',
      name: 'reshcode@gmail.com',
      picture:
        'https://s.gravatar.com/avatar/a029a89a6e8d72f3004a8e536e897c33?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fre.png',
      updated_at: '2022-04-26T11:58:12.849Z',
      email: 'reshcode@gmail.com',
      email_verified: false,
      iss: 'https://dev-eo4waewq.eu.auth0.com/',
      sub: 'auth0|6267de5469f7db0070851652',
      aud: 'mBfMsUqSIzvnOkYwtT6I2fDAE6FlA851',
      iat: 1650975300,
      exp: 1661011300,
    },
    JwtStrategyMock.SECRET_MOCK
  );
};
