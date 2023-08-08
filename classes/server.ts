import express from 'express'

export default class Server {

    public app : express.Application;
    public port: number = 80;
    

    constructor() {
        this.app = express();
    }

    start( callback: () => void){
        this.app.listen(this.port, callback );
    }
    

}