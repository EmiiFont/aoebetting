import * as express from 'express'
import { Request, Response } from 'express'
import { ApiPlayerService } from '../services/aoe2ApiService';
import { LiquipediaService } from '../services/liquipediaService';


export class HomeController {
    public path = '/'

    public router = express.Router();
    private _playerService: ApiPlayerService;
    private _liquidPediaApi: LiquipediaService;
    
    constructor() {
        this.initRoutes();
        this._playerService = new ApiPlayerService();
        this._liquidPediaApi = new LiquipediaService();
    }

    public initRoutes() {
        this.router.get('/', this.index)
    }

    index = async (req: Request, res: Response) => {
        
        let result = await this._liquidPediaApi.getMatchList();

        res.send(result);
    }
}