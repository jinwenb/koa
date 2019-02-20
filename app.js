let koa = require('./koa');
let app = new koa();
let catchKoa = require('./catch');
let path = require('path');
app.use(catchKoa(path.join(__dirname,'src')))
app.use(async (ctx, next) => {
    ctx.body = 'hello';
    console.log(1);
    await  next();
    console.log(3);
});
app.use(async (ctx, next) => {
    console.log(2);
    await new Promise((resolve) => {
        setTimeout(function () {
            resolve(600)
        }, 1000)
    });
    ctx.body = 'hello world';
    await next()
});
app.use(async (ctx, next) => {
    ctx.body = 'hello world2'
});
app.listen(8080, () => {
    console.log("8080run");
});