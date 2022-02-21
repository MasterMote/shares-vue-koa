const Router = require('koa-router');

const login = new Router();

login.post("/", async (ctx) => {
    let res = ctx.request.body
    if (
        res.id === 'admin' &&
        res.password === '123456'
    ) {
        let params = {
            code: '200',
            success: true,
            msg: '登录成功',
            data: {
                isCorrect: true,
                token: '2222'
            }
        };
        ctx.body = params;
    } else {
        let params = {
            code: '200',
            msg: '密码错误或用户名不存在',
            success: true,
            data: {
                isCorrect: false
            }
        };
        ctx.body = params;
    }

})

module.exports = login;