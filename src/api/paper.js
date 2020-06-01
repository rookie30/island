import request from '@/utils/request';

/**
 * 获取所有试卷信息
 * @param {*} data 
 */
export function getPapers(data) {
    return request({
        url: '/v1/paper/all',
        method: 'get',
        params: data
    })
}

export function getPaperDetail(paper_id) {
    return request({
        url: `/v1/paper/detail/${paper_id}`,
        method: 'get',
    })
}

/**
 * 禁用试卷
 * @param {*} paper_id 
 */
export function banPaper(paper_id) {
    return request({
        url: `/v1/paper/ban/${paper_id}`,
        method: 'get'
    })
}

/**
 * 启用试卷
 * @param {*} paper_id 
 */
export function activatePaper(paper_id) {
    return request({
        url: `/v1/paper/activate/${paper_id}`,
        method: 'get'
    })
}


/**
 * 删除试卷
 * @param {*} paper_id 
 */
export function deletePaper(paper_id) {
    return request({
        url: `/v1/paper/delete/${paper_id}`,
        method: 'get',
    })
}

/**
 * 添加试卷
 * @param {*} data 
 */
export function addPaper(data) {
    return request({
        url: '/v1/paper/assemble',
        method: 'post',
        data
    })
}


// export function modifyPaper() {
//     return request({
//         url: '/v1/announcement/admin',
//         method: 'get',
//         params: data
//     })
// }

/**
 * 获取题目信息
 * @param {*} data 
 */
export function getQuestionInfo(data) {
    return request({
        url: '/v1/exercise/listAll',
        method: 'post',
        data
    })
}

/**
 * 创建试卷模板
 * @param {*}} data 
 */
export function addPaperModel(data) {
    return request({
        url: '/v1/paper/add',
        method: 'post',
        data
    })
}