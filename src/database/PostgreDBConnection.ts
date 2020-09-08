import { BaseDbConnection } from './BaseDbConnection';
import { ConnectionOptions } from 'typeorm';
import {createConnection} from "typeorm";

import { Bet } from '../entity/Bet';
import { User } from '../entity/User';
import { BetType } from '../entity/BetType';
import dbconfig from '../config/db.config';

class PostgreDBConnection extends BaseDbConnection {
    constructor() {
        
        const postgreDBConnOptions: ConnectionOptions = {
            "type": "postgres",
            "host": dbconfig.host,
            "port": dbconfig.port,
            "username":  dbconfig.username,
            "password":  dbconfig.password,
            "database":  dbconfig.database,
            "synchronize": true,
            "logging":process.env.NODE_ENV?.trim() == "dev",
            "entities": [
               Bet,
               BetType,
               User,
            ]

        }

        super(postgreDBConnOptions)
    }
}

export { PostgreDBConnection }