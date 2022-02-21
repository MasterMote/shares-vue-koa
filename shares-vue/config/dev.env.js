'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_API: '"/shares"',
  VUE_APP_GATEWAY_URL: '"http://127.0.0.1:3005"',
})