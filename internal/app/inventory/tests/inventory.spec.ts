import app from '../app';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { User } from '../database/models/user.entity';
import { sha256 } from '~pkg/utils/hash';
import { plainToClass } from 'class-transformer';
import * as faker from 'faker';
import * as service from '../routes/inventory/service';
import { InventoryItem } from '../database/models/inventory-item.entity';
import { auth } from '../internal/clients/auth';

const testUser = plainToClass(User, { email: faker.internet.email(), password: faker.internet.password(10) });

beforeAll(async () => {
  await createConnection();
  await getConnection().synchronize();
  const userRep = getRepository(User);
  let user = await userRep.findOne({ where: { email: testUser.email } });
  if (!user) {
    user = await userRep.save({ email: testUser.email, password: sha256(testUser.password) });
  } else {
    user = await userRep.save({ ...user, email: testUser.email, password: sha256(testUser.password) });
  }
  testUser.id = user.id;
});

afterAll(async () => {
  await getConnection().close();
  auth.close();
  await app.close();
});

describe('Inventory service', () => {
  it('should get user inventory even if doesnt exist', async () => {
    const inv = await service.getInventory(testUser);

    expect(inv).toBeDefined();
  });

  it("should create item in user's inventory", async () => {
    const inv = await service.getInventory(testUser);

    expect(inv).toBeDefined();

    const item = await service.createItem(inv, {
      cell: 1,
      count: 1,
      description: '',
      name: faker.random.words(5),
    });

    expect(item).toBeDefined();
    expect(item.count).toBe(1);
  });

  it("should place item in user's inventory", async () => {
    const inv = await service.getInventory(testUser);

    expect(inv).toBeDefined();

    const item = await service.createItem(inv, {
      cell: 1,
      count: 1,
      description: '',
      name: faker.random.words(5),
    });

    expect(item).toBeDefined();
    expect(item.count).toBe(1);
    const cell = 5;
    await service.placeItem(inv, { id: item.id, cell });

    const rep = getRepository(InventoryItem);
    const it = (await rep.findOne(item.id)) as InventoryItem;

    expect(it).toBeDefined();
    expect(it.cell).toBe(cell);
  });

  it("should delete item in user's inventory", async () => {
    const inv = await service.getInventory(testUser);

    expect(inv).toBeDefined();

    const item = await service.createItem(inv, {
      cell: 1,
      count: 1,
      description: '',
      name: faker.random.words(5),
    });

    expect(item).toBeDefined();
    expect(item.count).toBe(1);

    expect(service.deleteItem(item)).resolves.toBeTruthy();
  });
});
