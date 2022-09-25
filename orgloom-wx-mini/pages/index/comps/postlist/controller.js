const api = require('../../../../utils/api.js')
const apiNew = require('../../../../api/api.js')

const util = require('../../../../utils/util.js')
const biz = require('../../../../utils/biz.js')

// const meu = require('../../../../utils/meu.js')

const app = getApp()
const PAGE_SIZE = 20

var view = undefined

// Home Controller 
function setup(_view) {
  view = _view
  // taglist style
  const meta = app.globalData.meta
  if(meta && meta.app_expand_tag) {
    view.setData({ tagStyle: 'flex-wrap: wrap;'})
  }
}

function onUnload() {
  view = undefined
}

// First Load
function onLoad(opt) {
  var companyId=view.data.ids;
  console.log("-----onLoad---post   con---",companyId);
  // fetch post
  var filter = view.data.filter
  fetchPostList(filter, "")
}

// 下拉刷新
function onPullDownRefresh() {
  if (view.data.loading) {
    return
  }
  var filter = view.data.filter
  var tagIndex = view.data.tagSelected
  var tag = ""
  if (tagIndex > 0) {
    tag = view.data.tagArray[tagIndex].id
  }
  fetchPostList(filter, tag)
}

function fetchPostList(filter, tag) {
  if (view.data.loading) {
    return
  }

  view.setData({loading: true, hasmore: true })
  view.setData({posts: [] })

  var params = {
    since_id: 0,
    limit: PAGE_SIZE,
    filter: filter,
    tag: tag,
  }

  console.log("-----filter------params----"+JSON.stringify(params));

  if(filter=="val"){
    filter=1
  } else{
    filter=0
  }
  
  getList(1,filter);
  /*
  api.getPostList(params).then(resp => {
    wx.stopPullDownRefresh()
    var hasmore = resp.data && resp.data.length === PAGE_SIZE
    view.setData({ loading: false, hasmore: hasmore })
    view.setData({ posts: massage(resp.data)})
  }).catch(err => {
    wx.stopPullDownRefresh()
    view.setData({ loading: false })
    wx.showToast({
      title: '加载失败:' + err.code, icon: 'none'
    })
    console.log("refresh list:", err)
  })
  */
}

function onReachBottom() {
  console.log("----------lllll----bottom");
  more();

}
function pageTotal(rowCount, pageSize) {  
  if (rowCount == null || rowCount == "") {
  return 0;
  } else {
          if (pageSize != 0 && rowCount % pageSize == 0) {
          return parseInt(rowCount / pageSize);          
          }  

          if (pageSize != 0 && rowCount % pageSize != 0) {
          return parseInt(rowCount / pageSize) + 1;
          }
  }
}


function more() {
  console.log("----------lllll----bottom------more");

  let that = this;
  console.log("---more---",view.data.pagination);
  let totalPage=pageTotal ( view.data.pagination.total ,  view.data.pagination.size);

  if (view.data.pagination.page >= totalPage) {
        return false
  }else{
  console.log("---more--1-");
  let page = view.data.pagination.page+ 1;
  var filter = view.data.filter
  if(filter=="val"){
    filter=1
  } else{
    filter=0
  }

   getList(page,filter);

  }
  
}

async function switchC(e){
//  getList(1,e);
}

async function getList(page,e) {
  console.log("---view  data--getsay Index-",view.data);
  console.log("---view  data--getsay Index-",e);
//  if(biz.checkLogin()){

if(e==0&&!biz.checkLogin()){
  console.log("----1--biz---");
  view.setData({ loading: false});

  view.setData({ posts:[]});
  return;
} else{
  console.log("----2--biz---");

}

  console.log("----biz.checkLogin()----"+biz.checkLoginTest());

  var { companyId} = view.data;

  let that=this;
  
  const json =await apiNew.listPostIndex({
    method:"post",
    query: {
              page:page,
              size:10,
              catId:e,
              userId:wx.getStorageSync("userInfo").id


      }
  });

  console.log("getPostList:"+JSON.stringify(json));
//  console.log("gePostList:json.data.length"+json.data.length);

  if (json.code == 1000) {
    console.log("get list--post---post---");

      for(var i = 0; i < json.data.list.length; i++){
       
        if(json.data.list[i].userName==null){
          json.data.list[i].userName='';
        //  json.data.list[i].userName='匿名'+Math.round(Math.random()*(300-6)+6);
        }
     //  json.data.list[i].createTime=json.data.list[i].createTime.replace('T', " ").slice(0,10);
  
       }


    view.setData({ loading: false});
  //  var styled = massage(resp.data)
    view.setData({ posts:view.data.posts.concat(json.data.list)});
  
    view.setData({ pagination:json.data.pagination,
          pageNum:json.data.pagination.page});




  } 
}


function onClickItem(e) {
  var idx = e.currentTarget.dataset.idx
  var post = view.data.posts[idx]
  console.log("-----clickItem---",idx);
  console.log("-----clickItem-post--",post);
  util.sendRequest('post', {
    idx: idx,
    post: post
  })
  
  wx.navigateTo({
    url: '/pages/thread/thread?id='+post.id,
  })
}

function onClickAvatar(e) {
  var idx = e.currentTarget.dataset.idx
  var post = view.data.posts[idx]
  if (post.author) {
    util.sendRequest('user', {
      idx: idx,
      data: post.author
    })
    wx.navigateTo({
      url: '/pages/user/user/user',
    })
  } else {
    wx.showToast({
      title: '用户不存在', icon: 'none'
    })
  }
}

function onClickFavor(e) {
  var idx = e.currentTarget.dataset.idx
  var item = view.data.posts[idx]
  var key = 'posts[' + idx + '].stats'

  if (!item.stats) {
    item.stats = { favored: false, favors: 0, comments: 0 }
  }

  if (item.stats.favored && item.stats.favored > 0) {
    console.log("delete favor")
    api.deletePostFavor(item.id).then(resp => {
      item.stats.favored = false,
        item.stats.favors -= 1
      view.setData({ [key]: item.stats })
      console.log("delete favor:", resp.statusCode)
    })
  } else {
    console.log("create favor")
    api.createPostFavor(item.id).then((resp) => {
      item.stats.favors += 1
      item.stats.favored = true
      view.setData({ [key]: item.stats })
      console.log("favor succ:", resp.statusCode)
    }).catch(err => {
      console.log("favor err:", err)
    })
  }
}

function onClickComment(e) {
  var idx = e.currentTarget.dataset.idx
  var post = view.data.posts[idx]
  util.sendRequest('post', {
    idx: idx,
    post: post
  })
  wx.navigateTo({
    url: '/pages/thread/thread',
  })
}

// function onClickMenu(e) {
//   var idx = e.currentTarget.dataset.idx
//   var item = view.data.posts[idx]
//   var menu = meu.create(item)

//   var user = app.globalData.userInfo
//   var isAuthor = user && item.author && user.id == item.author.id
//   var isAdmin = user && user.admin

//   // 添加删除菜单
//   if (isAuthor || isAdmin) {
//     menu.items.push("删除")
//     menu.actions.push(function() {
//       deletePost(idx)
//     })
//   }

//   // show menu
//   wx.showActionSheet({
//     itemList: menu.items,
//     success: function (res) {
//       console.log(res.tapIndex) // 用户点击的按钮，从上到下的顺序，从0开始
//       var fn = menu.actions[res.tapIndex]
//       fn()
//     },
//     fail: function (res) {
//       console.log(res.errMsg)
//     }
//   })
// }

// 总是产生一个Feed广告位置，由 Ad 组件自身决定是否显示
function getAdIndex() {
  // 只有第一屏才展示
  if (view.data.posts && view.data.posts.length != 0) {
    return -1
  }
  // insert banner ad at [4, 16]
  return Math.floor(Math.random() * 16) + 4
}

function massage(posts) {
  // insert banner ad at [4, 16]
  var adIndex = getAdIndex()
  var result = []
  var author = app.globalData.userInfo

  for (var i = 0; i < posts.length; i++) {
    var post = posts[i]
    var hide = (post.status >> 2) & 1

    // 如是本人的帖子则不隐藏
    if (post.author && author && post.author.id == author.id) {
      hide = false
    }

    // 如果是需要审核的帖子，即使本人也不显示直到已审核
    // 因为微信审核人员会傻缺的以为你没有审核系统...
    if ((post.status >> 3) & 1) {
      hide = true
    }

    // 如果是管理员则总显示
    if (author && author.admin) {
      hide = false
    }

    if (!hide) {
      result.push(biz.parsePost(post))
    }
    if ( i == adIndex) {
        result.push({ad: true})
    }
  }
  return result
}


function deletePost(idx) {
  var posts = view.data.posts
  var post = posts[idx]
  api.deletePost(post.id).then(resp => {
    posts.splice(idx, 1)
    view.setData({posts: posts})
    wx.showToast({
      title: '删除成功',
    })
    console.log("删除成功")
  }).catch(err => {
    console.log("删除失败")
    wx.showToast({
      title: '删除失败:' + err.code, icon: 'none'
    })
  })
}

function onClickTopic(e) {
  // 高亮选项
  var idx = e.target.dataset.idx;
  view.setData({ tagSelected: idx })

  var tag = ""
  if (idx > 0) {
    tag = view.data.tagArray[idx].id
  }
  // 刷新列表
  fetchPostList("", tag)
}

module.exports = {
  setup: setup,
  onLoad: onLoad,
  onUnload: onUnload,
  onPullDownRefresh: onPullDownRefresh,
  onReachBottom: onReachBottom,
  onClickItem: onClickItem,
  onClickAvatar: onClickAvatar,
  onClickFavor: onClickFavor,
  onClickComment: onClickComment,
  onClickTopic: onClickTopic,
  switchC:switchC
}