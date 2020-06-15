'use strict';
const uuid = require ('uuid');
/**
 * Using VO for strict  message contract
 */
class messageVO {

    constructor(ts, text){
        this._id = uuid.v4();
        this._ts = ts;
        this._text = text;
    }

    get ts() {
        return this._ts;
    }

    set ts(value) {
        this._ts = value;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    get id(){
        return this._id;
    }
}

module.exports =  messageVO;
