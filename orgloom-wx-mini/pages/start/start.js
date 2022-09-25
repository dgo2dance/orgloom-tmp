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
            id: -1,
            nomore: false,
            list: [],
            listSuggest:[],
            listFollow:[],
           // 0-互联网 1-金融 2-制造 3-医疗 4-地产 5-其他',
            navList:[{"name":"全部","id":-1},/*{"name":"附近","id":0},{"name":"关注","id":1},*/{"name":"互联网/IT","id":0},
            {"name":"金融","id":1},{"name":"传统行业","id":2},{"name":"生物医疗","id":3},{"name":"地产","id":4},{"name":"硬科技","id":5}
            ,{"name":"企业服务","id":6}
            ,{"name":"汽车出行","id":7}
            ,{"name":"消费零售","id":8}
            ,{"name":"咨询","id":9}
            ,{"name":"教育","id":10}
            ,{"name":"文娱体育","id":11}
            ,{"name":"政府机构","id":12}
            ,{"name":"社创","id":13}
            ,{"name":"公益","id":14}
            ,{"name":"海外校园","id":15}
            ,{"name":"国内校园","id":16}
            ,{"name":"新能源","id":17}
            ,{"name":"上市","id":18}
            ,{"name":"其他","id":19}],
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
            pagination:{},
            paginationSuggest:{},
            size:15,
            tab: {
                  current: 0, //预设默认选中的栏目
                  items: [{"name":"关注","id":0},{"name":"所有","id":1}],
                },
      },



        //获取公司列表
  async listSuggest(cateId,page) {
      let that=this;
      console.log("-----listSuggest----page:",page);
      const json = await api.listIndexPage({
        method:"post",
        query: {
              cateId:cateId,
              page:page,
              size:15,
        }
      });
  
      console.log("listSuggest:"+JSON.stringify(json));
  
      if (json.code == 1000) {
            this.paginationSuggest=json.data.pagination;

            let totalPage=this.pageTotal ( this.paginationSuggest.total ,  this.paginationSuggest.size);
            this.pages=totalPage;
        
          this.setData({
          listSuggest: that.data.listSuggest.concat( json.data.list),
          paginationSuggest:json.data.pagination,
          pageNum:json.data.pagination.page,
          pages:json.data.pagination.total
        });

       
      console.log("-----listCompay----",this.list);
       for(var i = 0; i < json.data.length; i++){
  
        if(json.data[i].currentUserFlag=="0"){
       

        }
  
       }
  
      } else {}
    },



         //获取公司列表
  async listMyfollow(e) {

      if(biz.checkLogin()){
            let that=this;
      
            const json = await api.listFollow({
              method:"post",
              query: {
                  'a.userId':wx.getStorageSync("userInfo").id
              }
            });
        
            console.log("listMyfollow:"+JSON.stringify(json));
        
            if (json.code == 1000) {
                  // this.pagination=json.data.pagination;
      
                  // let totalPage=this.pageTotal ( this.pagination.total ,  this.pagination.size);
                  // this.pages=totalPage;
              
                this.setData({
            //     listFollow: that.data.listFollow.concat( json.data),
                listFollow:json.data,

              
              });
      
             
             for(var i = 0; i < json.data.length; i++){
        
              if(json.data[i].currentUserFlag=="0"){
             
      
              }
        
             }
        
            } else {}
      } else{
      
                        //       var comp = this.selectComponent(".login")
                        //       if (comp) {
                        //             comp.show()
                        //             } else {
                        //             console.log("fatal:can't find login dialog")
                        //       }
                        //       return  
                        }
          },



        //获取公司列表
  async listUser(cateId,pageNum) {

     // let s=await biz.checkLogin();
      // console.log("----biz.checkLogin--"+s);
      // if(cateId==1&&!s){
      //       console.log("-------onClickReplyPost--false--");
      //       var comp = this.selectComponent(".login")
      //         if (comp) {
      //       comp.show()
      //         } else {
      //       console.log("fatal:can't find login dialog")
      //     }
      //     return;
      // } 


      let that=this;
      const json = await api.listCompany({
       method:'post',
        query: {
              industryClassify:cateId,
              page:pageNum,
              size:15,
              city:that.data.city
        }
      });

  
      console.log("listUser:"+JSON.stringify(json));

      this.setData({loading: false})

      console.log('-----uuuu-----',json.data.pagination);
      if (json.code == 1000) {
            
          this.pagination=json.data.pagination;

          let totalPage=this.pageTotal ( this.pagination.total ,  this.pagination.size);
          this.pages=totalPage;
      
        this.setData({
        list: that.data.list.concat( json.data.list),
        pagination:json.data.pagination,
        pageNum:json.data.pagination.page,
        pages:json.data.pagination.total
      });

      // this.setData({
      //       pagination:json.data.pagination
          
      //     });
      console.log('-----',this.pagination);
      console.log('-----',this.pageNum);
      console.log('-----',this.pages);
            /*
       for(var i = 0; i < json.data.length; i++){
  
        if(json.data[i].currentUserFlag=="0"){
       

        }
  
       }
         */
  
      } else {}
    },

    pageTotal(rowCount, pageSize) {  
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
},

onTabChanged: function(e) {
      var idx = e.detail;
      var tab = this.data.tab
      if (tab.current != idx) {
        tab.current = idx
        this.setData({ tab: tab })
      }
    },
    
    onShow:function (options){
      var comp = this.selectComponent(".login")
      if (comp) {
      comp.close();
      }
    },
      onLoad(option) {

            // wx.uma.trackEvent('Um_Event_PageView', {
            //       Um_Key_PageName: '01-salary-index-page',
            //       Um_Key_PageCategory: '01-salary',
            //       Um_Key_SourcePage: '',
            //       Um_Key_SourceLocation: '',
            //       Um_Key_UserID: '',
            //       Um_Key_UserLevel: '',
            //       Um_Key_Duration: ''
            //       });


            // qqmap = new QQMapWX({
            //       key: 'ODIBZ-YS66F-ZXQJU-JI5OL-Y75RH-KZBDK' // 必填
            //     })
            // let vm = this;
            
            this.setData({loading: true})

            this.listUser(this.data.id,this.data.pageNum);

            this.listSuggest("0",1);
            this.listMyfollow();
        
  
            
      },

      onShow(option) {

            // wx.uma.trackEvent('Um_Event_PageView', {
            //       Um_Key_PageName: '01-salary-index-page',
            //       Um_Key_PageCategory: '01-salary',
            //       Um_Key_SourcePage: '',
            //       Um_Key_SourceLocation: '',
            //       Um_Key_UserID: '',
            //       Um_Key_UserLevel: '',
            //       Um_Key_Duration: ''
            //       });


            // qqmap = new QQMapWX({
            //       key: 'ODIBZ-YS66F-ZXQJU-JI5OL-Y75RH-KZBDK' // 必填
            //     })
            // let vm = this;
            // this.setData({
            //       listFollow:[]
            // })
            this.listMyfollow();
        
  
            
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
      
     
      more() {
            let that = this;
            console.log("---this  tab---",this.data.tab);
            if(this.data.tab.current==1){
            console.log("---more---",this.pagination);
            let totalPage=this.pageTotal ( this.data.pagination.total ,  this.data.pagination.size);

            if (this.data.pagination.page >= totalPage) {
                  return false
            }else{
            console.log("---more--1-");
            let page = this.data.pagination.page+ 1;

            that.listUser(that.data.id,page);
            }
      }
            else if(this.data.tab.current==0){

            let totalPage=this.pageTotal ( this.data.paginationSuggest.total ,  this.data.paginationSuggest.size);

            if (this.data.paginationSuggest.page >= totalPage) {
                  return false
            }else{
            console.log("---more--1-");
            let page = this.data.paginationSuggest.page+ 1;

            that.listSuggest(0,page);


            }

      }

            

           
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