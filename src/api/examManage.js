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