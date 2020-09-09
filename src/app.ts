 import express, { Application } from 'express';
 import dotenv from 'dotenv';
 import { PostgresDBConnection } from './database/PostgresDBConnection'

class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        dotenv.config();
        
        this.app = express()
        this.port = appInit.port

        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
        
        const dbConn: PostgresDBConnection = new PostgresDBConnection();
        dbConn.setUpConnection();
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App
