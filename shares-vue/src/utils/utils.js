import qs from 'qs'

/**
 * @namespace
 * @readonly
 * @prop {String} GET - GET
 * @prop {String} POST - POST
 * @prop {String} JSONP - JSONP
 */
export const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    JSONP: 'JSONP'
}

/**
 * 请求默认超时时间
 * @const
 * @type {Number}
 * @default
 */
export const REQ_TIME_OUT = 2 * 60 * 1000

/**
 * 是否序列化post,put,patch时的数据
 * 此参数在使用axios时会确定Content-Type的值
 * ture: application/x-www-form-urlencoded, false:application/json;charset=utf-8
 */
export const IS_SERIALIZER_PARAMS = true

const toString = Object.prototype.toString

export function paramsSerializer(params = {}) {
    return qs.stringify(params, {
        indices: false
    })
}

export function isPlainObject(obj) {
    return toString.call(obj) === '[object Object]'
}