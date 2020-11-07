module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  seeds: [__dirname + '/src/database/seeders/database.seeder.ts'],
  factories: [__dirname + '/src/database/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/src/database/migrations',
  },
  synchronize: true
};
