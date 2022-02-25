const Router = require('koa-router');

const login = new Router();
const UserCollection = require('../db/user')
const ResponseParams = require('../constructor/response')

login.post("/", async (ctx) => {
    const res = ctx.request.body
    const userName = res.userName
    const password = res.password
    let params = null
    if (userName === '' || userName == null) {
        params = new ResponseParams('500', false, '用户名不能为空', {})
        ctx.body = params;
    }
    else if (
        password === '' || password == null
    ) {
        params = new ResponseParams('500', false, '密码不能为空', {})
        ctx.body = params;
    } else {
        const result = await UserCollection.findOne({ userName })
        if (result.password == password) {
            params = new ResponseParams('200', true, '登录成功', { token: 'ADS222' })
        } else {
            params = new ResponseParams('500', false, '密码错误或用户名不存在', {})
        }

        ctx.body = params
    }

})

module.exports = login;