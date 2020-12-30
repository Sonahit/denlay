import app from '../../packages/auth/app';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3001;
async function boot() {
  const addr = await app.listen(port);

  console.log(`Documentation at ${addr}/docs`);
}

boot();
