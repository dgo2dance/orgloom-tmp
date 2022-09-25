import {
  wxRequest,
  wxUpload
} from '../utils/wxRequest';


var env = "-test"; //-dev 或者 -test
  //   var api = 'http://localhost:9100/dev';
       var api ='https://www.orgloom.cc/api'


/**
 * api -demo
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */

const getDiscoverList = (params) => wxRequest(params, api + '/goods/list?cateidOne=1&cateidTwo=0&price=0&sales=2');

/**
 *用户模块接口 
  */
const wxJsCode2Session = (params) => wxRequest(params, api + "/api/wechat/jscode2session");//微信的jscode换取sessionKey
const user2session = (params) => wxRequest(params, api + "/api/wechat/user2session?jsoncallback=?");
const userOpenId = (params) => wxRequest(params, api + "/sys/user/openid");//通过code  获取openid 及 sessionID
const listUser = (params) => wxRequest(params, api + "/sys/user/jinselistUser");//获取所有用户

const uploadimage = (params) => wxUpload(params,api+'/t/user/img/upload');  //上传图片

const editHead = (params) => wxUpload(params,api+'/t/user/img/editHead');  //编辑头像


const listimage = (params) => wxRequest(params,api+'/t/user/img/listimage');  //查询图片

const listimageId = (params) => wxRequest(params,api+'/t/user/img/listimageid');  //根据传入用户ID查询图片

const deleteimage = (params) => wxRequest(params, api + "/t/user/img/delete");  //删除图片


const createPerson = (params) => wxRequest(params, api + "/sys/user");// 微信端邀请用户加入后  创建用户
const getPerson = (params) => wxRequest(params, api + "/sys/user/detail");// 微信端邀请用户加入后  获取用户
const getPersonId = (params) => wxRequest(params, api + "/sys/user/detailid");// 微信端邀请用户加入后  获取用户

const deletePerson = (params) => wxRequest(params, api + "/sys/user/delete");// 微信端邀请用户加入后  删除用户
const updatePerson = (params) => wxRequest(params, api + "/sys/user/wxupdate"); //更新用户


// const addCompany = (params) => wxRequest(params, api + "/t/salary/company/add");//添加公司

/**
*  光迹  新版所有接口  begin---------------------------------------------------------------------------------
 */
const listIndexPage = (params) => wxRequest(params, api + "/app/jingwai/company/indexPage");//获取所有公司

const listCompany = (params) => wxRequest(params, api + "/app/jingwai/company/page");//获取所有公司
const detailCompany = (params) => wxRequest(params, api + "/app/jingwai/company/info");//获取公司详情
const searchCompany = (params) => wxRequest(params, api + "/app/jingwai/company/search"); // 搜索公司

const isFollow = (params) => wxRequest(params, api + "/admin/jingwai/follow/isFollow"); // 是否关注
const addFollow = (params) => wxRequest(params, api + "/admin/jingwai/follow/add"); // 添加关注及取消关注
const listFollow = (params) => wxRequest(params, api + "/admin/jingwai/follow/list"); // 添加关注及取消关注


const getFree = (params) => wxRequest(params, api + "/app/jingwai/free/info");//获取自由圈人列表
const updateFree = (params) => wxRequest(params, api + "/app/jingwai/free/update");//更新自由圈人信息

const listFree = (params) => wxRequest(params, api + "/app/jingwai/free/listPass");//获取自由圈人列表--老版本查询
const listMyFree = (params) => wxRequest(params, api + "/app/jingwai/free/list");//获取自由圈人列表--list  根据用户ID进行查询

const listOrgTree = (params) => wxRequest(params, api + "/app/jingwai/org/listPass"); //获取组织列表
const addOrgPerson = (params) => wxRequest(params, api + "/admin/jingwai/org/add");// 添加组织人员
const addCompany = (params) => wxRequest(params, api + "/admin/jingwai/company/add");//添加公司


const addFree = (params) => wxRequest(params, api + "/admin/jingwai/free/add");//连系人加入人员



const getPhoneNumber = (params) => wxRequest(params, api + "/admin/base/open/getPhoneNumber");//获取手机号并登录
const updateUserName = (params) => wxRequest(params, api + "/admin/base/open/updateUserName");//更新用户名

const getPersonDetail = (params) => wxRequest(params, api + "/app/jingwai/org/info");// 获取人员详情接口
const getSessionKey = (params) => wxRequest(params, api + "/admin/base/open/getSessionKey");//获取session key 并保存

const listPost = (params) => wxRequest(params, api + "/app/jingwai/say/page");  // 评论获取接口
const getPost = (params) => wxRequest(params, api + "/app/jingwai/say/info");  // 评论获取接口
const deletePost = (params) => wxRequest(params, api + "/app/jingwai/say/delete");  // 删除获取接口


const listPostIndex = (params) => wxRequest(params, api + "/app/jingwai/say/pageIndex");  // 首页评论获取接口




const upload = (params) => wxUpload(params, api + "/admin/base/comm/upload");  // 上传图片接口
const addSay = (params) => wxRequest(params, api + "/admin/jingwai/say/add");  // 添加post接口
const addComment = (params) => wxRequest(params, api + "/admin/jingwai/say/add");  // 添加回复接口
const listSayComment = (params) => wxRequest(params, api + "/app/jingwai/say/listComment");  // 获取回复列表接口


const addSayImage = (params) => wxRequest(params, api + "/admin/jingwai/sayImage/add");  // 添加图片接口


const getContact = (params) => wxRequest(params, api + "/admin/jingwai/getContact/add");  // 获取连系人接口
const getPoints = (params) => wxRequest(params, api + "/admin/jingwai/points/info");  // 获取积分接口
const getMessage = (params) => wxRequest(params, api + "/admin/jingwai/message/list");  // 获取消息列表接口

const messageDetail = (params) => wxRequest(params, api + "/admin/jingwai/message/info");  // 获取消息详情接口

const messageCheck = (params) => wxRequest(params, api + "/admin/jingwai/message/check");  // 消息处理接口


const getMyPoints = (params) => wxRequest(params, api + "/admin/jingwai/points/myPoints");  // 获取我的积分





/**
*  光迹  新版所有接口  end-----------------------------------------------------------------------------------
 */


module.exports = {
  getDiscoverList:getDiscoverList, 

  wxJsCode2Session:wxJsCode2Session,
  user2session:user2session,
  userOpenId:userOpenId,
  listUser:listUser,
  createPerson:createPerson,
  getPerson:getPerson,
  deletePerson:deletePerson,
  updatePerson:updatePerson,

  getPersonId:getPersonId,
  uploadimage:uploadimage,
  listimage:listimage,
  listimageId:listimageId,
  deleteimage:deleteimage,
  editHead:editHead,


  listCompany:listCompany,
  detailCompany:detailCompany,

  getPhoneNumber:getPhoneNumber,
  listFree:listFree,
  listOrgTree:listOrgTree,
  getPersonDetail:getPersonDetail,
  listIndexPage:listIndexPage,
  searchCompany:searchCompany,
  isFollow:isFollow,
  addFollow:addFollow,
  addFree:addFree,
  updateFree:updateFree,
  getFree:getFree,
  listFollow:listFollow,
  listMyFree:listMyFree,
  getSessionKey:getSessionKey,
  listPost:listPost,
  upload:upload,
  addSay:addSay,
  addSayImage:addSayImage,
  addComment:addComment,
  listSayComment:listSayComment,
  addOrgPerson:addOrgPerson,
  addCompany:addCompany,
  getPost:getPost,
  getContact:getContact,
  getPoints:getPoints,
  getMessage:getMessage,
  messageDetail:messageDetail,
  messageCheck:messageCheck,
  updateUserName:updateUserName,
  getMyPoints:getMyPoints,
  listPostIndex:listPostIndex,
  deletePost:deletePost

}
