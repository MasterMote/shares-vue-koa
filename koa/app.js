const Koa = require('koa'); // 引入koa
const router = require('./router/index');
const parser = require('koa-body')

const app = new Koa(); // 创建koa应用

app.use(parser());
app.use(router.routes());

// 启动服务监听本地3005端口
app.listen(3005, () => {
    console.log('应用已经启动，http://localhost:3005');
})