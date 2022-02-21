import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { REQ_TIME_OUT, IS_SERIALIZER_PARAMS, HTTP_METHOD, isPlainObject, paramsSerializer } from '@/utils/utils'


console.log(process.env)
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: REQ_TIME_OUT // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        let { method, data } = config
        if (IS_SERIALIZER_PARAMS && method.toUpperCase() === HTTP_METHOD.POST && (isPlainObject(data) || Array.isArray(data))) {
            config.data = paramsSerializer(data)
        }
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.message_level && parseInt(res.message_level) !== 0) {
            if (res.message_level === -1 && res.message === '发生错误：用户尚未登录，或者是登录已过期。 ') {
                MessageBox.confirm('登录失效， 请您重新登录', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.location.href = '/login'
                })
                return res
            }
            if (res.message_level === -1 && res.message) {
                Message({
                    message: res.message,
                    type: 'error',
                    duration: 2 * 1000
                })
                return res
            }
            // return Promise.reject(new Error(res.message || 'Error'))
        } else if (res.code && res.code !== '200' && res.success !== true) {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service