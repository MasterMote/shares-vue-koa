import request from '@/utils/request'

// 登录
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
}

// 登出
export function logout() {
    return request({
        url: '/user/logout',
        method: 'get'
    })
}

//获取用户信息
export function getInfo(token) {
    return request({
        url: '/user/getInfo',
        method: 'get',
        params: { token }
    })
}