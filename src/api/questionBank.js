import request from "@/utils/request";

/**
 * 初始化题库
 * @param {*} data 
 */
export function getList(data) {
    return request({
        'url': '/v1/library',
        'method': 'get',
        data
    })
}

/**
 * 创建题库
 * @param {*} data 
 */
export function createQB(data) {
    return request({
        url: '/v1/library/add',
        method: 'post',
        data
    })
}

/**
 * 获取题库标签信息
 * @param {*} token 
 */
export function getTagInfo(token) {
    return request({
        url: '/v1/tag/',
        method: 'get',
        params: { token }
    })
}