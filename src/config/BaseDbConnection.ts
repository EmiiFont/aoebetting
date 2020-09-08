import { createConnection } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

import { PORT } from './constants';

abstract class BaseDbConnection {
    connectionName: string;
    connectionOptions: ConnectionOptions;
    port: number = PORT;

    constructor(public connOptions: ConnectionOptions) {
        this.connectionOptions = connOptions;
    }

   async setUpConnection(): Promise<Connection>{
        return await createConnection(this.connectionOptions);
    }
    
}

export { BaseDbConnection };