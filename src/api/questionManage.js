import request from '@/utils/request';

/**
 * 获取题目信息
 * @param {*} data 
 */
export function getQuestionInfo(data) {
    return request({
        url: '/v1/exercise',
        method: 'post',
        data
    })
}

export function editQuestionInfo(data) {
    return request({
        url: '/v1/exercise/modify',
        method: 'post',
        data
    })
}

export function createQuestionInfo(data) {
    return request({
        url: '/v1/exercise/add',
        method: 'post',
        data
    })
}