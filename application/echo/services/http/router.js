'use strict';


const controllerIndex = require('./controller/ControllerIndex');


class Router {
    constructor(fastify) {
        this.fastifyInstance = fastify;
        this.registerRoutes();
    }

    registerRoutes() {
        this.fastifyInstance.get('/echoAtTime', controllerIndex.index);

    }
}


module.exports = Router;
