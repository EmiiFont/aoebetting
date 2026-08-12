import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UserBetStat } from "../entity/UserBetStats";
import { BaseDbConnection } from "./BaseDbConnection";
import { ConnectionOptions } from "typeorm";

import { Bet } from "../entity/Bet";
import { User } from "../entity/User";
import { BetType } from "../entity/BetType";
import dbconfig from "../config/db.config";
import { Competitor } from "../entity/Competitor";
import { Match } from "../entity/Match";
import { UserBet } from "../entity/UserBet";
import { MatchInformation } from "../entity/MatchInformation";
import { Player } from "../entity/Player";
import { Team } from "../entity/team";
import { TeamPlayer } from "../entity/teamPlayer";
import { MatchCompetitor } from "../entity/matchCompetitor";

class PostgresDBConnection extends BaseDbConnection {
  constructor() {
    const postgresDBConnOptions: ConnectionOptions = {
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(String(process.env.DB_PORT)),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: process.env.NODE_ENV?.trim() == "dev",
      entities: [
        Bet,
        BetType,
        User,
        Match,
        MatchInformation,
        MatchCompetitor,
        Competitor,
        UserBet,
        Player,
        Team,
        TeamPlayer,
        UserBetStat,
      ],
    };

    super(postgresDBConnOptions);
  }
}

export { PostgresDBConnection };
