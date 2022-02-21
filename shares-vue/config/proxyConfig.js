const configProxy = require('./dev.env')

const config = {
    VUE_APP_BASE_API: configProxy.VUE_APP_BASE_API.replace(/"/g, ''),
    VUE_APP_GATEWAY_URL: configProxy.VUE_APP_GATEWAY_URL.replace(/"/g, ''),
}
console.log('config: ', config);
module.exports = {
    proxy: {
        [config.VUE_APP_BASE_API]: {
            target: config.VUE_APP_GATEWAY_URL, // 接口域名
            changeOrigin: true, //是否跨域 
        }
    }
}