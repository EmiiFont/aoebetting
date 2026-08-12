import * as express from "express";
import { Request, Response } from "express";
import { IPlayerService, PlayerService } from "../services/playerService";

export class PlayerController {
  public path = "/player";

  public router = express.Router();
  private _playerService: IPlayerService;

  constructor() {
    this.initRoutes();
    this._playerService = new PlayerService();
  }

  public initRoutes() {
    this.router.get(this.path, this.index);
    //this.router.get(this.path + '/:id', this.getPlayer);
    this.router.post(this.path, this.search);
    this.router.get(this.path + "/autoAdd", this.autoAdd);
  }

  index = async (req: Request, res: Response) => {
    const page = req.query.page != undefined ? parseInt(req.query.page.toString()) : 0;
    const count = req.query.count != undefined ? parseInt(req.query.count.toString()) : 10;
    const search = req.query.search != undefined ? req.query.search.toString() : "";

    console.log(search);
    const result = await this._playerService.getPlayers(page, count, search, "");

    res.send(result);
  };

  autoAdd = async (req: Request, res: Response) => {
    const result = await this._playerService.autoAddPlayers(10).catch((e) => console.log(e));
    res.send(result);
  };

  getPlayer = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const result = await this._playerService.getPlayer(id);

    if (!result) {
      res.status(404).send({
        error: "Match not found",
      });
    }
    res.send(result);
  };

  search = async (req: Request, res: Response) => {
    const searchParam: any = req.body;
    const result = await this._playerService.searchPlayer(searchParam.name);

    if (!result) {
      res.status(404).send({
        error: "Match not found",
      });
    }
    res.send(result);
  };
}
