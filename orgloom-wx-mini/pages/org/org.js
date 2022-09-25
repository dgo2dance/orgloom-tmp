const app = getApp()
const db = wx.cloud.database();
const config = require("../../config.js");
const util = require('../../utils/util.js')
const biz = require('../../utils/biz.js')


import api from '../../api/api';
// var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmap;
const _ = db.command;
Page({
      data: {
            college: JSON.parse(config.data).college,
            collegeCur: -2,
            showList: false,
            scrollTop: 0,
            id: 0,
            nomore: false,
            list: [],
            navList:[{"name":"最热","id":0},/*{"name":"附近","id":0},*/{"name":"关注","id":1},{"name":"互联网/IT","id":2},{"name":"制造","id":3},{"name":"医疗","id":4},{"name":"设计","id":5},{"name":"地产","id":6},{"name":"金融","id":6}],
            scrollLeft: 0,
            scrollTop: 0,
            scrollHeight: 0,
            longitude: '', //经度
            latitude: '', //纬度
            province: '', //省
            city: '', //市
            district: '', //区/县
            pageNum:1,
            pages:0,
            loading: false,
            hasmore: true,
      },
        //获取公司列表
  async listUser(cateId,pageNum) {

      let s=await biz.checkLogin();
      console.log("----biz.checkLogin--"+s);
      if(cateId==1&&!s){
            console.log("-------onClickReplyPost--false--");
            var comp = this.selectComponent(".login")
              if (comp) {
            comp.show()
              } else {
            console.log("fatal:can't find login dialog")
          }
          return;
      } 


      let that=this;
      const json = await api.listCompany({
        query: {
              cateId:cateId,
              page:pageNum,
              size:10,
              city:that.data.city
        }
      });

  
      console.log("listUser:"+JSON.stringify(json));

      this.setData({loading: false})

  
      if (json.code == 200) {
        this.setData({
        list: that.data.list.concat( json.data.list),
        pageNum:json.data.pageNum,
        pages:json.data.pages
      });
            /*
       for(var i = 0; i < json.data.length; i++){
  
        if(json.data[i].currentUserFlag=="0"){
       

        }
  
       }
         */
  
      } else {}
    },


    
    onShow:function (options){
      var comp = this.selectComponent(".login")
      if (comp) {
      comp.close();
      }
    },
      onLoad(option) {

            wx.uma.trackEvent('Um_Event_PageView', {
                  Um_Key_PageName: '01-salary-index-page',
                  Um_Key_PageCategory: '01-salary',
                  Um_Key_SourcePage: '',
                  Um_Key_SourceLocation: '',
                  Um_Key_UserID: '',
                  Um_Key_UserLevel: '',
                  Um_Key_Duration: ''
                  });


            qqmap = new QQMapWX({
                  key: 'ODIBZ-YS66F-ZXQJU-JI5OL-Y75RH-KZBDK' // 必填
                })
            let vm = this;
            
            this.setData({loading: true})

            this.listUser(this.data.id,this.data.pageNum);

       

      //     this.listkind();
      //      this.getbanner();
      //      this.getList();
       //     console.log("option  id--"+option.code);
       /*
       console.log("app.global.code"+app.globalData.code);
       if (app.globalData.code=='2001') {
            wx.showModal({
                  title: '温馨提示',
                  content: '请首先完善个人基本信息',
                  success(res) {
                        if (res.confirm) {
                              wx.navigateTo({
                                    url: '/pages/editInfo/add',
                              })
                        }
                  }
            })
            app.globalData.code = '2002';

      }
      */
  
            
      },
      onReady() {
        

          },

          getUserLocation() {
            let vm = this
            qqmap.reverseGeocoder({ //逆地址解析（经纬度 ==> 坐标位置）
              location: {
                latitude: vm.data.latitude,
                longitude: vm.data.longitude
              },
              success(res) {
                console.log(res)
                vm.setData({
                  province:res.result.ad_info.province,
                  city:res.result.ad_info.city,
                  district:res.result.ad_info.district
                });
                vm.listUser(vm.data.id,vm.data.pageNum);
              }
            })
          },

      //监测屏幕滚动
      onPageScroll: function(e) {
            this.setData({
                  scrollTop: parseInt((e.scrollTop) * wx.getSystemInfoSync().pixelRatio)
            })
      },
      //获取上次布局记忆
      listkind() {
            let that = this;
            wx.getStorage({
                  key: 'iscard',
                  success: function(res) {
                        that.setData({
                              iscard: res.data
                        })
                  },
                  fail() {
                        that.setData({
                              iscard: true,
                        })
                  }
            })
      },
      //布局方式选择
      changeCard() {
            let that = this;
            if (that.data.iscard) {
                  that.setData({
                        iscard: false
                  })
                  that.setData({
                        college: JSON.parse(config.data).college,

                  })
                  this.listUser("0");

                  wx.setStorage({
                        key: 'iscard',
                        data: false,
                  })
            } else {
                  that.setData({
                        iscard: true
                  })

                  that.setData({
                        college: JSON.parse(config.data).collegeMan,

                  })

                  this.listUser ("1");
                  wx.setStorage({
                        key: 'iscard',
                        data: true,
                  })
            }
      },
      //跳转搜索
      search() {
            wx.navigateTo({
                  url: '/pages/search/search',
            })
      },
      //学院选择
      collegeSelect(e) {
            this.setData({
                  collegeCur: e.currentTarget.dataset.id - 1,
                  scrollLeft: (e.currentTarget.dataset.id - 3) * 100,
                  showList: false,
            })
            this.getList();
      },
      //选择全部
      selectAll() {
            this.setData({
                  collegeCur: -2,
                  scrollLeft: -200,
                  showList: false,
            })
            this.getList();
      },
      //展示列表小面板
      showlist() {
            let that = this;
            if (that.data.showList) {
                  that.setData({
                        showList: false,
                  })
            } else {
                  that.setData({
                        showList: true,
                  })
            }
      },
      getList() {
            let that = this;
            if (that.data.collegeCur == -2) {
                  var collegeid = _.neq(-2); //除-2之外所有
            } else {
                  var collegeid = that.data.collegeCur + '' //小程序搜索必须对应格式
            }
            db.collection('publish').where({
                  status: 0,
                  dura: _.gt(new Date().getTime()),
                  collegeid: collegeid
            }).orderBy('creat', 'desc').limit(20).get({
                  success: function(res) {
                        wx.stopPullDownRefresh(); //暂停刷新动作
                        if (res.data.length == 0) {
                              that.setData({
                                    nomore: true,
                                    list: [],
                              })
                              return false;
                        }
                        if (res.data.length < 20) {
                              that.setData({
                                    nomore: true,
                                    page: 0,
                                    list: res.data,
                              })
                        } else {
                              that.setData({
                                    page: 0,
                                    list: res.data,
                                    nomore: false,
                              })
                        }
                  }
            })
      },
      more() {
            let that = this;
            console.log("---more---");
            if (that.data.pageNum >= that.data.pages) {
                  return false
            }
            console.log("---more--1-");
            let page = that.data.pageNum+ 1;

            that.listUser(that.data.id,page);



            /*
            if (that.data.collegeCur == -2) {
                  var collegeid = _.neq(-2); //除-2之外所有
            } else {
                  var collegeid = that.data.collegeCur + '' //小程序搜索必须对应格式
            }
            db.collection('publish').where({
                  status: 0,
                  dura: _.gt(new Date().getTime()),
                  collegeid: collegeid
            }).orderBy('creat', 'desc').skip(page * 20).limit(20).get({
                  success: function(res) {
                        if (res.data.length == 0) {
                              that.setData({
                                    nomore: true
                              })
                              return false;
                        }
                        if (res.data.length < 20) {
                              that.setData({
                                    nomore: true
                              })
                        }
                        that.setData({
                              page: page,
                              list: that.data.list.concat(res.data)
                        })
                  },
                  fail() {
                        wx.showToast({
                              title: '获取失败',
                              icon: 'none'
                        })
                  }
            })
            */
      },

      onReachBottom() {
           this.more();
      },
      //下拉刷新
      onPullDownRefresh() {
            let that=this;
            this.setData({
                  pageNum:1,
                  pages:0,
                  list:[],
            })
            this.listUser(that.data.id,that.data.pageNum);
            wx.stopPullDownRefresh();

      },
      gotop() {
            wx.pageScrollTo({
                  scrollTop: 0
            })
      },
      //跳转详情
      detail(e) {
            let that = this;
            wx.navigateTo({
                  url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
            })
      },
      //获取轮播
      getbanner() {
            let that = this;
            db.collection('banner').where({}).get({
                  success: function(res) {
                        that.setData({
                              banner: res.data[0].list
                        })
                  }
            })
      },
      //跳转轮播链接
      goweb(e) {
            if (e.currentTarget.dataset.web){
                  wx.navigateTo({
                        url: '/pages/web/web?url='+e.currentTarget.dataset.web.url,
                  })
            }
      },
      onShareAppMessage() {
            return {
                  title: JSON.parse(config.data).share_title,
                  imageUrl: JSON.parse(config.data).share_img,
                  path: '/pages/index/index'
            }
      },

      switchCate: function(event) {
            console.log("---begin  switchCate---");
            if (this.data.id == event.currentTarget.dataset.id) {
              return false;
            }

            if (this.data.id == event.detail) {
                  return false;
                }
            var that = this;
            var clientX = event.detail.x;
            var currentTarget = event.currentTarget;
            if (clientX < 60) {
              that.setData({
                scrollLeft: currentTarget.offsetLeft - 60
              });
            } else if (clientX > 330) {
              that.setData({
                scrollLeft: currentTarget.offsetLeft
              });
            }
            /*
            this.setData({
              id: event.currentTarget.dataset.id
            });
            */
            this.setData({
                  id: event.detail
                });
        
                  this.setData({
                        pageNum:1,
                        pages:0,
                        list:[],
      })

        //    this.getCategoryInfo();
        this.listUser(that.data.id,that.data.pageNum);

          },


   onClickSearch:function(e) {
            wx.navigateTo({
              url: '/pages/search/search',
            })
      },

            //跳转具体页面
  gotoStockDetail: function (event) {
      var stockName = event.currentTarget.dataset.stockName;
      var stockId = event.currentTarget.dataset.stockId;

      util.sendRequest('company', {
            companyId: stockId,
          })

      wx.navigateTo({
        url: '/pages/stock/stock?name=' + stockName + '&id=' + stockId,
      });
    },

})