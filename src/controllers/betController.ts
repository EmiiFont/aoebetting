import * as express from 'express'
import { Request, Response } from 'express'
import { ApiPlayerService } from '../services/aoe2ApiService';
import { MatchService } from '../services/matchService';
import { MatchDto } from '../model/match';
import { Connection, getRepository } from 'typeorm';
import { BetService } from '../services/betService';
import { BetDTO } from '../model/betDto';


export class BetController {
  
    private _betService: BetService;
    private path = '/bet';
    public router = express.Router();

    constructor() {
        this.initRoutes();
        this._betService = new BetService();
    }

    public initRoutes() {
        this.router.get(this.path, this.index);
        this.router.get(this.path + '/:id', this.getByMatch);
        this.router.post(this.path, this.createSystemBet);
    }

    index = async (req: Request, res: Response) => {
       
        res.send({error: 'Nothing implemented'});
    }
    
    createUserBet = async (req: Request, res: Response) =>{
      const userBet: BetDTO = req.body;

    }
   
    createSystemBet = async (req: Request, res: Response) =>{
        const bet: BetDTO = req.body;
        //TODO: get matchUid from body;
        const matchUid = 2;
        
        const betRes = await this._betService.setSystemBet(bet, 2);
        
        res.send(betRes);
    }

    getByMatch = async (req: Request, res: Response) =>{
        const matchuid = +req.params.id;

        //TODO: get matchUid from body;
        const matchUid = 2;
        
        const betRes = await this._betService.getByMatch(matchUid);
 
        res.send(betRes);
    }
}