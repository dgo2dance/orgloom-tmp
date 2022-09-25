/**
 * 境外管理api
 */

import request from '@/utils/request';
import requestUpload from '@/utils/requestUpload';


//公司页面分页列表查询
export function getCompanyList(data) {
    return request({
        url: '/app/jingwai/company/page',
        method: 'post',
        data
    });
}

//公司页面分页列表查询同时获取是否关注
export function getCompanyListPageIs(data) {
    return request({
        url: '/admin/jingwai/company/pageIsFollow',
        method: 'post',
        data
    });
}


// 公司页面详情信息查询
export function getCompanyInfo(params) {
    return request({
        url: '/app/jingwai/company/info',
        method: 'get',
        params
    });
}

// 公司页面详情信息查询
export function getOrgList(data) {
    return request({
        url: '/app/jingwai/org/listPass',
        method: 'post',
        data
    });
}

// 公司页面详情信息查询
export function getFreeList(data) {
    return request({
        url: '/app/jingwai/free/listPass',
        method: 'post',
        data
    });
}

// 公司页面详情信息查询
export function addAdvise(data) {
    return request({
        url: '/app/jingwai/advise/add',
        method: 'post',
        data
    });
}

// 添加自由人
export function addFree(data) {
    return request({
        url: '/admin/jingwai/free/add',
        method: 'post',
        data
    });
}


export function addOrg(data) {
    return request({
        url: '/admin/jingwai/org/add',
        method: 'post',
        data
    });
}




//
// 创建用户
export function createUser(data) {
    return request({
        url: '/admin/base/open/register',
        method: 'post',
        data
    });
}

// 登录
export function loginFront(data) {
    return request({
        url: '/admin/base/open/loginFront',
        method: 'post',
        data
    });
}

// 关注
export function addFollow(data) {
    return request({
        url: '/admin/jingwai/follow/add',
        method: 'post',
        data
    });
}


// 关注
export function isFollow(data) {
    return request({
        url: '/admin/jingwai/follow/isFollow',
        method: 'post',
        data
    });
}

// 加入
export function isAdd(data) {
    return request({
        url: '/admin/jingwai/free/isAdd',
        method: 'post',
        data
    });
}


// 上传图片
export function uploadImageApi(data) {
    console.log("----upload Images---orgHub.js--");
    return requestUpload({
        url: '/admin/base/comm/upload',
        method: 'post',
        data
    });
}