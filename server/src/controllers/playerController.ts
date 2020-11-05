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
        this.router.get(this.path, this.autoAdd);
    }

    index = async (req: Request, res: Response) => {
        const page = req.query.page != undefined ? parseInt(req.query.page.toString()) : 0;
        const count = req.query.count != undefined ? parseInt(req.query.count.toString()) : 10;;
        
        let result = await this._playerService.getPlayes(page, count);
     
        res.send(result);
    }

    autoAdd = async (req: Request, res: Response) => {
        let result = await this._playerService.autoAddPlayers(10).catch(e => console.log(e));
        res.send(result);
    }

    getPlayer = async (req: Request, res: Response) =>{
        const id = +req.params.id;
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