import request from '@/utils/request';


export function getNoticeInfo(data) {
    return request({
        url: '/v1/announcement/admin',
        method: 'get',
        params: {
            from: data
        }
    })
}