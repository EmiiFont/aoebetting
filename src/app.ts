 import express, { Application } from 'express';

 import { PostgreDBConnection } from './database/PostgreDBConnection'
 import dotenv from 'dotenv';

class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.app = express()
        this.port = appInit.port

        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
        
        //load environment variables
        dotenv.config();

        const dbConn: PostgreDBConnection = new PostgreDBConnection();
       
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
    
    public createDatabase(){

    }

    public listen() {
        let message = process.env.NODE_ENV?.trim() == "dev" ? 'App in DEVELOPMENT' :  'App in PRODUCTION';
        this.app.listen(this.port, () => {
            console.log(`${message} listening on the http://localhost:${this.port}`)
        })
    }
}

export default App
