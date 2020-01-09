class APIResponse extends Error {
    constructor(status, code, errors, data) {
        super();
        Error.captureStackTrace(this, this.constructor);

        this.status = status || '500';
        this.code = code || 500;
        this.errors = errors || null;
        this.data = data || null;
    }
}

module.exports = APIResponse;
