class Logger {
    constructor(context) {
        this._context = context;
    }

    error(message) {
        console.error(`[${this._context}]: ${message}`);
    }

    log(message) {
        console.log(`[${this._context}]: ${message}`);
    }

    info(message) {
        console.info(`[${this._context}]: ${message}`);
    }

}

export default Logger;