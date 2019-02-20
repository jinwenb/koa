let fs = require('fs');
let url = require('url');
let path = require('path')

module.exports = (filename) => async (ctx, next) => {
    let {pathname} = url.parse(ctx.req.url);
    let name  =path.join(filename,pathname);
    let _err;
    await new Promise((resolve, reject) => {
        fs.stat(name, (err) => {
            if (err) {
                _err = err;
            }
                resolve()
        })
    });
    if(_err){
      return await next()
    }

        ctx.body = fs.createReadStream(name)

};