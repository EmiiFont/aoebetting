"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor(appInit) {
        this.app = express_1.default();
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
    }
    middlewares(middleWares) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }
    routes(controllers) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
