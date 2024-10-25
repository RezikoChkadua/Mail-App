import { DataSource } from 'typeorm';

import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: process.env.POSTGRESS_PORT ? Number(process.env.POSTGRESS_PORT) : 5432,
  username: process.env.POSTGRESS_USER || 'postgres',
  database: process.env.POSTGRESS_DB_NAME || 'postgres',
  password: process.env.POSTGRESS_PASSWORD || '1234',
  logging: false,
  synchronize: true,
  entities: [__dirname + '/models/**.ts'],
  extra: {
    ssl: false,
  },
});

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
};
