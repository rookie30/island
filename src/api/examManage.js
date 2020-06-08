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

/**
 * 获取所有试卷信息
 * @param {*} data 
 */
export function getPaperInfo(data) {
    return request({
        url: 'v1/paper/list',
        method: 'get',
        params: data
    })
}

export function createExam(data) {
    return request({
        url: '/v1/exam/add',
        method: 'post',
        data
    })
}

/**
 * 批卷
 */
export function checkPaper(data) {
    return request({
        url: `/v1/record/judge/${data}`,
        method: 'get'
    })
}

/**
 * 获取考试成绩信息
 */
export function getGradeInfo(examId) {
    return request({
        url: `/v1/userexam/grade/${examId}`,
        method: 'get'
    })
}