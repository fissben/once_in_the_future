'use strict';
const cluster = require('cluster');

class Server {

    /**
     * Run cluster-workers depends on number of cores
     * @param fastify
     */
    run(fastify) {

        if (cluster.isMaster) {
            const numCPUs = require('os').cpus().length;
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();

            }
        } else {
            this.listen(fastify);
        }


        return this;
    }

    /**
     * run logger loop only on master node (as a low-consuming action)
     * @param loopFunction
     */
    connectToMaster(loopFunction) {
        if (cluster.isMaster) {
            loopFunction();
        }
    }

    /**
     *
     * @param fastify
     */
    listen(fastify) {
        (async () => {
            try {
                await fastify.listen(process.env.NODE_PORT, process.env.NODE_HOST);
                fastify.log.debug(`server listening on ${fastify.server.address().port}`)
            } catch (err) {
                fastify.log.error(err);
                process.exit(1)
            }
        })();
    }

}

module.exports = new Server();
