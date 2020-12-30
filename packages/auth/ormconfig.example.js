const { join } = require('path');

const dotenv = require('dotenv');

dotenv.config({path: join(__dirname, '..', '..', '.env')});

module.exports =  {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  seeds: [__dirname + '/**/database/seeders/database.seeder.ts'],
  factories: [__dirname + '/**/database/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/**/database/migrations',
  },
  synchronize: true,
};
