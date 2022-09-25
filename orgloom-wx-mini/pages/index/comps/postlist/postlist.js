const ctr = require('./controller.js')
const kawa = require('../../../../kawa.js')
const util = require('../../../../utils/util.js')

// const bColor = util.alphaColor(kawa.Theme.TabSelectedColor || kawa.Theme.MainColor, 0.09)
const tColor = kawa.Theme.TabSelectedColor || kawa.Theme.MainColor

// pages/home/comps/postlist/postlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filter: {
      type: String,
      value: "",
    },
    tags: {
      type: Array,
      value: [],
    },
    event: {
      type: String,
      value: "",
      observer:function(value){ //每次父组件向子组件传值的时候都会调用这个函数
        console.log("----obser",value) // 旧数据和新数据
         this.FnEvent(value)
       }
    },
    ids:{
      type: String,
      value: "",
      observer:function(value){ //每次父组件向子组件传值的时候都会调用这个函数
         console.log("----obser",value) // 旧数据和新数据
          this.Fn(value)
        }
    }
  },

  lifetimes: {
    attached: function () {
      ctr.setup(this)
      ctr.onLoad(this.data)
    },
  },

  attached: function () {
    ctr.setup(this)
    ctr.onLoad(this.data)
  },

  /**
   * 组件的初始数据
   */
  data: {
    theme: {
      images: kawa.Theme.Image,
      adminColor: kawa.Theme.MainColor,
  //    levelColor: util.lightenColor(kawa.Theme.MainColor, 30),
      mainColor: kawa.Theme.MainColor,
  //    tabColor: `background:${bColor}; color:${tColor};`,
      favroColor: kawa.Theme.FavorColor || kawa.Theme.MainColor,
    },
    tagStyle: '',
    tagSelected: -1,
    tagArray: [],
    loading: false,
    hasmore: true,
    companyId:1,
    pagination:'',
    pageNum:'',
    event:''
  },

  observers: {
    'tags': function (tags) {
      var tags = tags.slice()
      tags.unshift({ text: "全部话题" })
      this.setData({ tagArray: tags })
    },
    'id': function (id){
      console.log("---id 传值----",id)
      this.setData({ companyId: id })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    Fn(e){
        console.log('....ok....',e);
          if(!(!e && typeof(e)!="undefined" && e!=0)){
        this.setData({
         companyId: e,
        });
      }

    },

    FnEvent(e){
      console.log('....ok....',e);
        if(!(!e && typeof(e)!="undefined" && e!=0)){
      this.setData({
       event: e,
      });
    }

  },

    onPullDownRefresh: function() {
      ctr.onPullDownRefresh()
    },

    onReachBottom: function() {
      ctr.onReachBottom()
    },

    switch:function(e){
      ctr.switchC(e)
    },

    // 点击头像
    clickAvatar: function (e) {
      ctr.onClickAvatar(e)
    },

    // 点击帖子
    clickItem: function (e) {
      ctr.onClickItem(e)
    },

    // 点击评论
    commentClick: function (e) {
      ctr.onClickComment(e)
    },

    // 点击点赞
    favorClick: function (e) {
      ctr.onClickFavor(e)
    },

    // 点击菜单
    clickMenu: function (e) {
     // ctr.onClickMenu(e)
    },

    // 点击话题标签
    clickTag: function (e) {
      ctr.onClickTopic(e)
    },
    onLoad: function(){
      console.log("----companyId--postList-",id)
    
    }
  }
})
