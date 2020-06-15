require('dotenv').config();
const assert = require('assert');
const messagesService = require('../services/message');


describe('messages', function () {
    describe('sendAndReceiveMsg', function () {
        before(() => {
            //create namespace for this test run
            messagesService.namespace = 'TMP' + Date.now().toString();
        })

        it('should send msg to redis', function (done) {
            let sendTest = require('./redis/send');
            return sendTest.test().then(done()).catch((e) => {
                done(e)
            })

        });

        it('should get msg from redis', function (done) {
            let getTest = require('./redis/get');
            return getTest.test().then(done()).catch((e) => {
                done(e)
            })

        });

        after(() => {
            //clear all arrays inside a test
            messagesService.redisClientInstance.del(messagesService.namespace)
            messagesService.quit()

        });
    });

});

describe('dispatcher', function () {
    //todo: implement dispatcher tests
    describe('loop', function () {
        it('msg should be dispatched throw redis to logger', function () {
            return assert.strictEqual(200, 200);

        });
    });

});
