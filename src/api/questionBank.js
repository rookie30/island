import request from "@/utils/request";

/**
 * 获取题库信息
 * @param {*} data 
 */
export function getList(data) {
    return request({
        'url': '/v1/library?currentPage=' + data.currentPage + 
        '&tag_id=' + data.tag_id + '&name=' + data.name,
        'method': 'get'
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

/**
 * 题库编辑
 * @param {*} data 
 */
export function editQuestionBank(data) {
    return request({
        url: '/v1/library/modify',
        method: 'post',
        data
    })
}