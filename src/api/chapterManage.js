import request from '@/utils/request';

export function getChapterInfo() {
    return request({
        url: '/v1/chapter/regulate',
        method: 'get'
    })
}