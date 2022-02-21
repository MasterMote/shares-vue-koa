const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(__dirname)
const router = new Router({
    prefix: '/shares'
})

files.filter(file => file.search(/.js$/))
    .forEach(file => {
        const file_name = file.substring(0, file.length - 3);
        const file_entity = require(path.join(__dirname, file));
        if (file_name !== 'index') {
            router.use(`/${file_name}`, file_entity.routes())
        }
    })

// console.log(router)

module.exports = router