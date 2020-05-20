import request from "@/utils/request";

/**
 * 获取管理员信息
 * @param {*} data 
 */
export function getAdminList(data) {
    return request({
        url: '/v1/user/list?currectPage=' + data.currectPage
        + '&type=' + data.type + '&status=' + data.status,
        method: 'get',
        data
    })
}

/**
 * 禁用管理员账号
 * @param {*} data 
 */
export function disableAccount(data) {
    return request({
        url: '/v1/user/ban/' + data,
        method: 'get'
    })
}

/**
 * 启用管理员账号
 * @param {*} data 
 */
export function activateAccount(data) {
    return request({
        url: '/v1/user/activate/' + data,
        method: 'get'
    })
}

/**
 * 创建管理员账号
 * @param {*} data 
 */
export function createAdminAccount(data) {
    return request({
        url: '/v1/user/distribute',
        method: 'post',
        data
    })
}

/**
 * 获取未分配管理员信息
 */
export function getFreeAdmin() {
    return request({
        url: '/v1/user/preassign',
        method: 'get'
    })
}