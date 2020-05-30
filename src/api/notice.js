import request from '@/utils/request';

export function getNoticeInfo(data) {
    console.log(data);
    return request({
        url: '/v1/announcement/admin',
        method: 'get',
        params: data
    })
}