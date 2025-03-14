import Logger from "app/logger";

class EventSystem {
    constructor() {
        this._ev = {};
        this.logger = new Logger('EventSystem');
    }
    bind (event, callback) {
        (this._ev[event] || (this._ev[event] = [])).unshift(callback);
    }
    trigger (event) {
        const list = this._ev[event] || [];
        const queue = [];
        let i = list.length;
        let res;
    
        for (; i--;) {
            res = list[i].apply(this, [].slice.call(arguments, 1));
        
            if (typeof res !== 'undefined' && res instanceof Promise) {
                queue.push(res);
            }
        }
    
        if (queue.length) {
            return Promise.all(queue);
        }
    
        return this;
    }
    unbind (ev) {
        delete this._ev[ev];
    }
}

export default new EventSystem();