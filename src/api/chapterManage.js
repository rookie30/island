import request from '@/utils/request';

export function getChapterInfo() {
    return request({
        url: '/v1/chapter/regulate',
        method: 'get'
    })
}

/**
 * 章节创建
 * @param {*} data 
 */
export function createChapterInfo(data) {
    return request({
        url: '/v1/chapter/add',
        method: 'post',
        data
    })
} 

/**
 * 章节信息编辑
 * @param {*} data 
 */
export function editChapterInfo(data) {
    return request({
        url: '/v1/chapter/modify',
        method: 'post',
        data
    })
}