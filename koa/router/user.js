const Router = require('koa-router');

const router = new Router();

router.get("/getInfo", async (ctx) => {
  ctx.body = '2222'
})

module.exports = router;