import request from '@/utils/request';


export function getPapers(data) {
    return request({
        url: '/v1/paper',
        method: 'post',
        data
    })
}

export function getPaperDetail(paper_id) {
    return request({
        url: `/v1/paper/detail/${paper_id}`,
        method: 'get',
    })
}

export function banPaper(paper_id) {
    return request({
        url: `/v1/paper/ban/${paper_id}`,
        method: 'get'
    })
}


export function deletePaper(paper_id) {
    return request({
        url: `/v1/paper/delete/${paper_id}`,
        method: 'get',
    })
}


// export function addPaper() {
//     return request({
//         url: '/v1/announcement/admin',
//         method: 'get',
//         params: data
//     })
// }


// export function modifyPaper() {
//     return request({
//         url: '/v1/announcement/admin',
//         method: 'get',
//         params: data
//     })
// }