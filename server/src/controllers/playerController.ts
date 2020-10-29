import * as express from 'express'
import { Request, Response } from 'express'
import { ApiPlayerService } from '../services/aoe2ApiService';
import { IPlayerService, PlayerService } from '../services/playerService';


export class PlayerController {
    public path = '/player'

    public router = express.Router();
    private _playerService: IPlayerService;
    
    constructor() {
        this.initRoutes();
        this._playerService = new PlayerService();
    }

    public initRoutes() {
        this.router.get(this.path, this.index);
        this.router.get(this.path + '/:id', this.getPlayer);
        this.router.post(this.path, this.search);
        // this.router.post(this.path, this.createMatch);
    }

    index = async (req: Request, res: Response) => {
        
        let result = await this._playerService.autoAddPlayers(10);

        res.send(result);
    }

    getPlayer = async (req: Request, res: Response) =>{
        const id = +req.params.id;
         console.log(id);
        let result =  await this._playerService.getPlayer(id);

        if (!result) {
            res.status(404).send({
                'error': 'Match not found'
            })
        }

        res.send(result);
    }

    search = async (req: Request, res: Response) =>{
        const searchParam: any = req.body
        let result =  await this._playerService.searchPlayer(searchParam.name);

        if (!result) {
            res.status(404).send({
                'error': 'Match not found'
            })
        }

        res.send(result);
    }
}