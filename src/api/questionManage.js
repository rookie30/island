import request from '@/utils/request';

export function getQuestionInfo(data) {
    return request({
        url: '/v1/exercise',
        method: 'post',
        data
    })
}