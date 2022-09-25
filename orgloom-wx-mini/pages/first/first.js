//logs.js
const ctr = require('./controller.js')
const util = require('../../utils/util.js')
const biz = require('../../utils/biz.js')
const kawa = require('../../kawa.js')

Page({
  data: {
    theme: {
      images: kawa.Theme.Image,
      mainColor: kawa.Theme.MainColor,
      tabColor: kawa.Theme.TabSelectedColor || kawa.Theme.MainColor,
      favroColor: kawa.Theme.FavorColor || kawa.Theme.MainColor,
    },
    speaker: {
      title: "",
      link: "",
    },
    menu: {
      show: false,
    },
    meta: {
      app_cover: "",
      app_logo: "",
      app_name: "卡哇微社区",
    },
    hideNewButton: false,
    tab: {
      current: 0, //预设默认选中的栏目
    /*  items: ["全部", "精华", "活跃"], */
      items: ["全部", "精华"],
      itemsTop:["帖子","广场"]
    },
    tags: [],
    signed: false,
  },
  onTabChanged: function(e) {
    var idx = e.detail;
    var tab = this.data.tab
    if (tab.current != idx) {
      tab.current = idx
      this.setData({ tab: tab })
    }
  },
  onLoad: function (opt) {


    wx.uma.trackEvent('Um_Event_PageView', {
      Um_Key_PageName: '01-community-home-page',
      Um_Key_PageCategory: '01-home',
      Um_Key_SourcePage: '',
      Um_Key_SourceLocation: '',
      Um_Key_UserID: '',
      Um_Key_UserLevel: '',
      Um_Key_Duration: ''
      });

    biz.applyTheme(kawa.Theme)
    ctr.setup(this)
    ctr.onLoad(opt)

    // 判断当前用户是否登录，如果登陆了，传入用户ID埋点    如果没登录  随机埋点；



  },

  onUnload: function() {
    ctr.onUnload()
  },

  // 从其它页面返回数据
  onResult: function(data) {
    ctr.onResult(data)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var comp = this.selectComponent(".tabpage")
    if (comp) {
      comp.onPullDownRefresh()
    }
    ctr.onPullDownRefresh()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var comp = this.selectComponent(".tabpage")
    if (comp) {
      comp.onReachBottom()
    }
  },

  clickSearch: function(e) {
    ctr.onClickSearch(e)
  },

  // 签到
  clickSignin : function(e) {
    ctr.onClickSignin(e)
  },

  // 发新贴
  newTopic: function(e) {
    ctr.onClickNewPost(e)
  },

  // 点击公告
  clickSpeaker: function(e) {
    ctr.onClickSpeaker(e)
  },

  // 点击置顶帖
  clickTopList: function(e) {
    ctr.onClickTopList(e)
  },

  // 点击分享
  onShareAppMessage: function (res) {
    return ctr.onClickShare(res)
  },
})

function getTabData(view) {
  var index = view.data.tab.current
  return view.data.tabData[index]
}