import app from '../../packages/inventory/app';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

const port = process.env.PORT || 3000;
async function boot() {
  const addr = await app.listen(port, '0.0.0.0');

  console.log(`Documentation at ${addr}/docs`);
}

boot();
