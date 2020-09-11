import * as express from 'express'
import { Request, Response } from 'express'
import { ApiPlayerService } from '../services/aoe2ApiService';
import { MatchService } from '../services/matchService';
import { MatchDto } from '../model/match';
import { Connection } from 'typeorm';


export class MatchController {
    public path = '/match'

    public router = express.Router();
    private _matchService: MatchService;
    
    constructor() {
        this.initRoutes();
        this._matchService = new MatchService();
    }

    public initRoutes() {
        this.router.get(this.path, this.index);
        this.router.get(this.path + '/:id', this.getMatch);
        this.router.get(this.path, this.setMatchStarted);
        this.router.post(this.path, this.createMatch);
    }

    index = async (req: Request, res: Response) => {
        
        let result = await this._matchService.getMatches(10, 1);

        res.send(result);
    }

    getMatch = async (req: Request, res: Response) =>{
        const id = +req.params.id;
         console.log(id);
        let result =  await this._matchService.getMatchById(id)

        if (!result) {
            res.status(404).send({
                'error': 'Match not found'
            })
        }

        res.send(result);
    }

    createMatch = async (req: Request, res: Response) =>{
        const match: MatchDto = req.body
        
        let result = await this._matchService.addMatch(match);
        res.send(result);
    }

    setMatchStarted = async (req: Request, res: Response) => {
        const id = +req.params.id;
       
        let result = await this._matchService.setMatchStarted(id, false);
        
        res.send(result);
    }


}