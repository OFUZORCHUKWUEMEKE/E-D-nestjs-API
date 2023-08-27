import { DataSource } from 'typeorm';
import configuration from '../common/config/config';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const config = configuration()
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                url: config.POSTGRES_URL,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];