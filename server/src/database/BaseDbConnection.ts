import { createConnection } from "typeorm";
import { Connection } from "typeorm/connection/Connection";
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";

abstract class BaseDbConnection {
  connectionOptions: ConnectionOptions;

  constructor(public connOptions: ConnectionOptions) {
    this.connectionOptions = connOptions;
  }

  async setUpConnection(): Promise<Connection> {
    return await createConnection(this.connectionOptions);
  }
}

export { BaseDbConnection };
