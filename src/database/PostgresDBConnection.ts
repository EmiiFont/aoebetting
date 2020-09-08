import { BaseDbConnection } from './BaseDbConnection';
import { ConnectionOptions } from 'typeorm';

import { Bet } from '../entity/Bet';
import { User } from '../entity/User';
import { BetType } from '../entity/BetType';
import dbconfig from '../config/db.config';

class PostgresDBConnection extends BaseDbConnection {
    constructor() {
        
        const postgresDBConnOptions: ConnectionOptions = {
            "type": "postgres",
            "host": dbconfig.host,
            "port": dbconfig.port,
            "username":  dbconfig.username,
            "password":  dbconfig.password,
            "database":  'aoebetting',
            "synchronize": true,
            "logging":process.env.NODE_ENV?.trim() == "dev",
            "entities": [
               Bet,
               BetType,
               User,
            ]

        }

        super(postgresDBConnOptions)
    }
}

export { PostgresDBConnection }