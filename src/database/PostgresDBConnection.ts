import { BaseDbConnection } from './BaseDbConnection';
import { ConnectionOptions } from 'typeorm';

import { Bet } from '../entity/Bet';
import { User } from '../entity/User';
import { BetType } from '../entity/BetType';
import dbconfig from '../config/db.config';
import { Competitor } from '../entity/Competitor';
import { Match } from '../entity/Match';
import { UserBet } from '../entity/UserBet';
import { MatchInformation } from '../entity/MatchInformation';

class PostgresDBConnection extends BaseDbConnection {
    constructor() {
        
        const postgresDBConnOptions: ConnectionOptions = {
            "type": "postgres",
            "host": process.env.DB_HOST ,
            "port": parseInt(process.env.DBPORT ?? "5432"),
            "username":  process.env.DB_USER,
            "password":  process.env.DB_PASS,
            "database":  'aoebetting',
            "synchronize": true,
            "logging":process.env.NODE_ENV?.trim() == "dev",
            "entities": [
               Bet,
               BetType,
               User,
               Match,
               MatchInformation,
               Competitor,
               UserBet,
            ]

        }

        super(postgresDBConnOptions)
    }
}

export { PostgresDBConnection }