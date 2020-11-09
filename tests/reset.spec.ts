import app from '../src/app';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { User } from '../src/database/models/user.entity';
import { sha256 } from '../src/utils/hash';
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
  await app.close();
});

describe('Reset password', () => {
  it('should connect', () => {
    expect(getConnection().isConnected).toBeTruthy();
  });

  it('should reset password', async () => {});

  it('should not reset password without code', async () => {});
});