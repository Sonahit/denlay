import app from '../../packages/auth/app';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

const port = process.env.PORT || 3001;
async function boot() {
  const addr = await app.listen(port);

  console.log(`Documentation at ${addr}/docs`);
}

boot();
