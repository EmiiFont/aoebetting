import { BaseDbConnection } from './BaseDbConnection';
import { ConnectionOptions } from 'typeorm';

import { Bet } from '../entity/Bet';
import { User } from '../entity/User';
import { BetType } from '../entity/BetType';
import dbconfig from '../config/db.config';
import { Competitor } from '../entity/Competitor';
import { Match } from '../entity/Match';
import { UserBet } from '../entity/UserBet';
import { Player } from '../entity/Player';

class PostgresDBConnection extends BaseDbConnection {
    constructor() {
        
        const postgresDBConnOptions: ConnectionOptions = {
            "type": "postgres",
            "host": dbconfig.host ,
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
               Match,
               Competitor,
               UserBet,
               Player
            ]

        }

        super(postgresDBConnOptions)
    }
}

export { PostgresDBConnection }