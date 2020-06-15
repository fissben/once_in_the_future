'use strict';
require('dotenv').config();
const fastify = require('fastify')({logger: true});
const routerHandler =  require('./services/http/router');
const msgDispatcher = require('./services/dispatcher');
const server = require('./services/server');
const router = new routerHandler(fastify); //register router, pass fastify to it



server
    .run(fastify) //run cluster
    .connectToMaster(()=>{msgDispatcher.registerLoop(500);}) //process redis event only on master node
;


