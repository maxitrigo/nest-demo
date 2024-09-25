import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env.development' });

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT, // el signo delante lo convierte en un tipo number
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: false,
    logging: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
}

export const dataSource = new DataSource(config as DataSourceOptions)
export default registerAs('typeorm', () => config);