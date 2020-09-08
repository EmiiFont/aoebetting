import { BaseDbConnection } from './BaseDbConnection';
import { ConnectionOptions } from 'typeorm';
import {createConnection} from "typeorm";

import { PORT } from './constants';

class PostgreDBConnection extends BaseDbConnection {
    constructor() {
        const postgreDBConnOptions: ConnectionOptions = {

            "type": "postgres",
            "host": "localhost",
            "port": PORT,
            "username": "test",
            "password": "test",
            "database": "test",
            "synchronize": true,
            "logging": true,
            "entities": [
                "src/entity/**/*.ts"
            ]

        }

        super(postgreDBConnOptions)
        createConnection(super.connectionOptions);
    }

}

export { PostgreDBConnection }