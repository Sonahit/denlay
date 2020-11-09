import app from '../app';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { User } from '../database/models/user.entity';
import { sha256 } from '~pkg/utils/hash';
import { req as auth } from '../internal/responders/auth';
import * as faker from 'faker';

const testUser = { email: faker.internet.email(), password: faker.internet.password(10) };

beforeAll(async () => {
  await createConnection();

  const userRep = getRepository(User);
  const user = await userRep.findOne({ where: { email: testUser.email } });
  if (!user) {
    await userRep.save({ email: testUser.email, password: sha256(testUser.password) });
  } else {
    await userRep.save({ ...user, email: testUser.email, password: sha256(testUser.password) });
  }
});

afterAll(async () => {
  await getConnection().close();
  await auth.close();
  await app.close();
});

describe('Authorization', () => {
  it('should connect', () => {
    expect(getConnection().isConnected).toBeTruthy();
  });

  it('should login', async () => {
    const resp = await app.inject({
      method: 'POST',
      url: '/auth',
      payload: testUser,
    });
    expect(() => {
      JSON.parse(resp.body);
    }).not.toThrow();

    const { data } = JSON.parse(resp.body);

    expect(data).toBeDefined();
    expect(data.jwt).toBeDefined();
  });

  it('should reject', async () =>
    expect(
      (
        await app.inject({
          method: 'POST',
          url: '/auth',
          payload: {},
        })
      ).statusCode
    ).toBeGreaterThanOrEqual(400));
});
