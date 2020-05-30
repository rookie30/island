import request from '@/utils/request';


/**
 * 获取考试信息
 */
export function getExamInfo(data) {
    return request({
        url: '/v1/exam',
        method: 'get',
        params: data
    })
}


export function getPaperInfo(data) {
    return request({
        url: 'v1/paper/list',
        method: 'get',
        params: data
    })
}