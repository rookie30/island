import request from '@/utils/request';

export function getList(data) {
    return request({
        url: '/v1/user/list?currectPage=' + data.currectPage
        + '&type=' + data.type,
        method: 'get',
        data
    })
}

export function disableAccount(data) {
    return request({
        url: '/v1/user/ban/' + data,
        method: 'get'
    })
}

export function activateAccount(data) {
    return request({
        url: '/v1/user/activate/' + data,
        method: 'get'
    })
}