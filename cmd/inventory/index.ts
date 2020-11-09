import app from '../../internal/app/inventory/app';

const port = process.env.PORT || 3000;
async function boot() {
  const addr = await app.listen(port);

  console.log(`Documentation at ${addr}/docs`);
}

boot();
