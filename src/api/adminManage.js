import request from "@/utils/request";

export function getAdminList(data) {
    return request({
        url: '/v1/user/list?currectPage=' + data.currectPage
        + '&type=' + data.type,
        method: 'get',
        data
    })
}