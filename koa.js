const http = require('http');
module.exports = class Koa {
    constructor() {
        this.middleware = []
    }
    computer(middleware, ctx) {
        return function () {
            return dispatch(0);
            function dispatch(i) {
                let fn = middleware[i];
                return new Promise(function (resolve) {
                    if (!fn) {
                        return resolve()
                    }
                    resolve(fn(ctx, function next() {
                        return dispatch(i + 1)
                    }))
                });

            }
        }
    }

    use(callback) {
        this.middleware.push(callback);
    };

    handleBody(ctx) {
        let {body} = ctx;
        if (typeof  body == 'string') {
            ctx.res.end(body)
        }
        if(typeof body.pipe=='function'){
            body.pipe(ctx.res)
        }
    }

    listen(...arg) {
        let server = http.createServer((req, res) => {
            let ctx = {};
            ctx.req = req;
            ctx.res = res;
            let computer = this.computer(this.middleware, ctx);
            computer().then(() => {
                this.handleBody(ctx)
            })
        });
        server.listen(...arg);
    }

};