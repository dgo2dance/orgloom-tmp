import api from '../../api/api';
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
const db = wx.cloud.database();
const config = require("../../config.js");
const _ = db.command;
import biz from '../../utils/biz';



Page({

      /**
       * 页面的初始数据
       */
      data: {
            first_title: true,
            place: '',
            ec: {
                },
            free:{},
            photos:'',
            show: false,
            personDetail:'',
            company:{},
            itemShow: [{name: 'A',value: '看电影'},{name: 'B',value: '去唱歌'},
            {name: 'C',value: '吃吃喝喝'},{name: 'D',value: '旅游'},
            {name: 'E',value: '聚会'},{name: 'F',value:'游戏'},{name: 'G',value: '运动'},{name: 'H',value: '其他'}],
            itemYou: [{name: 'A',value: '看脸'},{name: 'B',value: '看品味'},
            {name: 'C',value: '看感觉'},{name: 'D',value: '无所谓'}],
            mydesc:'',
            message:''
      },

      showPopup() {
            this.setData({ show: false });
          },
      
          setmyDesc:function(e) {
            this.setData({
                mydesc: e.detail.value
            })
          },


      // 获取连系人提交
      async getContact() {

            if(biz.checkLogin()){
                  
                  const json = await api.getContact({
                        method:'post',
                        query: {
                          freeId:this.data.id,
                          message:this.data.mydesc
                      }
                      });
                  
                  console.log("getContact:"+JSON.stringify(json));
                  
                      if (json.code == 1000) {
                        this.setData({
                              message:'提交申请已成功，对方同意后，你将以消息方式收到对方的联系方式'
                        });

                        this.setData({
                              show:true
                        })

                      }  else{

                        this.setData({
                              message:json.message
                        });

                        this.setData({
                              show:true
                        })

                        // wx.showToast(json.message);

                      }
                
        
            }else{
                             var comp = this.selectComponent(".login")
                              if (comp) {
                                    comp.show()
                                    } else {
                                    console.log("fatal:can't find login dialog")
                              }
                              return  

            }





          },
        
          onClose() {
            this.setData({ show: false });
          }
          ,


  async getFree(id) {
      const json = await api.getFree({
        query: {
          id:id
      }
      });
  
      console.log("getFree:"+JSON.stringify(json));
  
      if (json.code == 1000) {

                  

            // for(var j=0; j<json.data.friendshow.split(",").length;j++){

            //       for(var i=0; i<this.data.itemShow.length;i++){
            //           if(json.data.friendshow.split(",")[j]==this.data.itemShow[i].name){
            //                 if(typeof(json.data.friendShowValue)!="undefined"){
            //           json.data.friendShowValue=   json.data.friendShowValue+","+this.data.itemShow[i].value;
            //                 }else{
            //                   json.data.friendShowValue=this.data.itemShow[i].value; 
            //                 }
            //           }
            //            }
            //     }
          
            //     for(var m=0; m<json.data.you.split(",").length;m++){

            //           for(var n=0; n<this.data.itemYou.length;n++){
            //               if(json.data.you.split(",")[m]==this.data.itemYou[n].name){
            //                   if(typeof(json.data.youValue)!="undefined"){
            //               json.data.youValue= json.data.youValue+","+this.data.itemYou[n].value;
            //                   } else{
            //               json.data.youValue= this.data.itemYou[n].value;         
            //                   }
            //               }
            //                }
            //         }


      this.setData({
       free: json.data
      });
  
   
      
      //   // 设置教育状态
      //   for(var m=0; m<this.data.countries.length;m++){
      //       if(json.data.education==this.data.countries[m]){
  
                 
      //       }
      //   }
      


  
      } else {}
    },

   async listImage(id) {
      const json = await api.listimageId({
        query: {
             page:0,
             size:0,
             id:id
        }
      });
  
      console.log("listImage:"+JSON.stringify(json));
  
      if (json.code == 200) {
        this.setData({
            photos: json.data.list
      });
       
      /*
       for(var i = 0; i < json.data.length; i++){
    
       }
       */
  
      } else {}
    },

      onLoad(e) {
      //    this.getuserdetail();
      console.log(" ---person----",e.id);
    
            this.data.id = e.id;

       //     this.listImage(e.id);
          this.getFree(e.id)

           
      },
      changeTitle(e) {
            let that = this;
            that.setData({
                  first_title: e.currentTarget.dataset.id
            })
      },

      previewPhoto: function (e) {
            console.log("preview photo--"+e.currentTarget.dataset.src);
            wx.previewImage({
                urls: e.currentTarget.dataset.src.split('_'),
                current: e.currentTarget.id
            });
        },

      //获取发布信息
      getPublish(e) {
            let that = this;
            db.collection('publish').doc(e).get({
                  success: function(res) {
                        that.setData({
                              collegeName: JSON.parse(config.data).college[parseInt(res.data.collegeid) + 1],
                              publishinfo: res.data
                        })
                        that.getSeller(res.data._openid, res.data.bookinfo._id)
                  }
            })
      },
      //获取卖家信息
      getSeller(m, n) {
            let that = this;
            db.collection('user').where({
                  _openid: m
            }).get({
                  success: function(res) {
                        that.setData({
                              userinfo: res.data[0]
                        })
                        that.getBook(n)
                  }
            })
      },
      //获取书本信息
      getBook(e) {
            let that = this;
            db.collection('books').doc(e).get({
                  success: function(res) {
                        that.setData({
                              bookinfo: res.data
                        })
                  }
            })
      },
      //回到首页
      home() {
            wx.switchTab({
                  url: '/pages/index/index',
            })
      },
      //购买检测
      buy() {
            let that = this;
            /*
            if (!app.openid) {
                  wx.showModal({
                        title: '温馨提示',
                        content: '该功能需要注册方可使用，是否马上去注册',
                        success(res) {
                              if (res.confirm) {
                                    wx.navigateTo({
                                          url: '/pages/login/login',
                                    })
                              }
                        }
                  })
                  return false
            }
            if (that.data.publishinfo.deliveryid == 1) {
                  if (that.data.place == '') {
                        wx.showToast({
                              title: '请输入您的收货地址',
                              icon: 'none'
                        })
                        return false
                  }
                  that.getStatus();
            }
            */
            that.getStatus();
      },
      //获取订单状态
      getStatus() {
            let that = this;
            let _id = that.data.publishinfo._id;
            that.paypost();

            /*
            db.collection('publish').doc(_id).get({
                  success(e) {
                        if (e.data.status == 0) {
                              that.paypost();
                        } else {
                              wx.showToast({
                                    title: '该书刚刚被抢光了~',
                                    icon: 'none'
                              })
                        }
                  }
            })*/
      },
      //支付提交
      paypost() {
            let that = this;
            wx.showLoading({
                  title: '正在解锁',
            });
            // 利用云开发接口，调用云函数发起订单
            wx.cloud.callFunction({
                  name: 'pay',
                  data: {
                        $url: "pay", //云函数路由参数
                        goodId: that.data.publishinfo._id
                  },
                  success: res => {
                        wx.hideLoading();
                        that.pay(res.result)
                  },
                  fail(e) {
                        wx.hideLoading();
                        wx.showToast({
                              title: '支付失败，请及时反馈或稍后再试',
                              icon: 'none'
                        })
                  }
            });
      },
      //实现小程序支付
      pay(payData) {
            let that = this;
            //官方标准的支付方法
            wx.requestPayment({
                  timeStamp: payData.timeStamp,
                  nonceStr: payData.nonceStr,
                  package: payData.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***
                  signType: 'MD5',
                  paySign: payData.paySign, //签名
                  success(res) {
                        that.setStatus();
                  },
            })
      },
      //修改卖家在售状态
      setStatus() {
            let that = this
            wx.showLoading({
                  title: '正在处理',
            })
            // 利用云开发接口，调用云函数发起订单
            wx.cloud.callFunction({
                  name: 'pay',
                  data: {
                        $url: "changeP", //云函数路由参数
                        _id: that.data.publishinfo._id,
                        status: 1
                  },
                  success: res => {
                        console.log('修改订单状态成功')
                        that.creatOrder();
                  },
                  fail(e) {
                        wx.hideLoading();
                        wx.showToast({
                              title: '发生异常，请及时和管理人员联系处理',
                              icon: 'none'
                        })
                  }
            })
      },
      //创建订单
      creatOrder() {
            let that = this;
            db.collection('order').add({
                  data: {
                        creat: new Date().getTime(),
                        status: 1, //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                        price: that.data.publishinfo.price, //售价
                        deliveryid: that.data.publishinfo.deliveryid, //0自1配
                        ztplace: that.data.publishinfo.place, //自提时地址
                        psplace: that.data.place, //配送时买家填的地址
                        bookinfo: {
                              _id: that.data.bookinfo._id,
                              author: that.data.bookinfo.author,
                              edition: that.data.bookinfo.edition,
                              pic: that.data.bookinfo.pic,
                              title: that.data.bookinfo.title,
                        },
                        seller: that.data.publishinfo._openid,
                        sellid: that.data.publishinfo._id,
                  },
                  success(e) {
                        that.history('购买书籍', that.data.publishinfo.price, 2, e._id)
                  },
                  fail() {
                        wx.hideLoading();
                        wx.showToast({
                              title: '发生异常，请及时和管理人员联系处理',
                              icon: 'none'
                        })
                  }
            })
      },
      //路由
      go(e) {
            wx.navigateTo({
                  url: e.currentTarget.dataset.go,
            })
      },
      //地址输入
      placeInput(e) {
            this.data.place = e.detail.value
      },
      onShareAppMessage() {
            return {
                  title: '这本《' + this.data.bookinfo.title + '》只要￥' + this.data.publishinfo.price + '元，快来看看吧',
                  path: '/pages/detail/detail?scene=' + this.data.publishinfo._id,
            }
      },
      //历史记录
      //记录两次，一次相当于使用微信支付充值，一次是用于购买书籍付款
      history(name, num, type, id) {
            let that = this;
            db.collection('history').add({
                  data: {
                        stamp: new Date().getTime(),
                        type: 1, //1充值2支付
                        name: '微信支付',
                        num: num,
                        oid: app.openid,
                  },
                  success: function(res) {
                        db.collection('history').add({
                              data: {
                                    stamp: new Date().getTime(),
                                    type: type, //1充值2支付
                                    name: name,
                                    num: num,
                                    oid: app.openid,
                              },
                              success: function(res) {
                                    wx.hideLoading();
                                    that.sms();
                                    that.tip();
                                    wx.redirectTo({
                                          url: '/pages/success/success?id=' + id,
                                    })
                              }
                        })
                  },
            })
      },
      //短信提醒
      sms() {
            let that = this;
            wx.cloud.callFunction({
                  name: 'sms',
                  data: {
                        mobile: that.data.userinfo.phone,
                        title: that.data.bookinfo.title,
                  },
                  success: res => {
                        console.log(res)
                  },
            })
      },
      //邮件提醒收货
      tip() {
            let that = this;
            wx.cloud.callFunction({
                  name: 'email',
                  data: {
                        type: 1, //1下单提醒2提醒收货
                        email: that.data.userinfo.email,
                        title: that.data.bookinfo.title,
                  },
                  success: res => {
                        console.log(res)
                  },
            })
      },
      //为了数据安全可靠，每次进入获取一次用户信息
      getuserdetail() {
            if (!app.openid) {
                  wx.cloud.callFunction({
                        name: 'regist', // 对应云函数名
                        data: {
                              $url: "getid", //云函数路由参数
                        },
                        success: re => {
                              db.collection('user').where({
                                    _openid: re.result
                              }).get({
                                    success: function(res) {
                                          if (res.data.length !== 0) {
                                                app.openid = re.result;
                                                app.userinfo = res.data[0];
                                                console.log(app)
                                          }
                                          console.log(res)
                                    }
                              })
                        }
                  })
            }
      },
      //生成海报
      creatPoster() {
            let that = this;
            let pubInfo = {
                  id: that.data.publishinfo._id,
                  name: that.data.publishinfo.bookinfo.title,
                  pic: that.data.publishinfo.bookinfo.pic.replace('http', 'https'),
                  origin: that.data.publishinfo.bookinfo.price,
                  now: that.data.publishinfo.price,
            }
            wx.navigateTo({
                  url: "/pages/poster/poster?bookinfo=" + JSON.stringify(pubInfo)
            })
      },
      //客服跳动动画
      kefuani: function() {
            let that = this;
            let i = 0
            let ii = 0
            let animationKefuData = wx.createAnimation({
                  duration: 1000,
                  timingFunction: 'ease',
            });
            animationKefuData.translateY(10).step({
                  duration: 800
            }).translateY(0).step({
                  duration: 800
            });
            that.setData({
                  animationKefuData: animationKefuData.export(),
            })
            setInterval(function() {
                  animationKefuData.translateY(20).step({
                        duration: 800
                  }).translateY(0).step({
                        duration: 800
                  });
                  that.setData({
                              animationKefuData: animationKefuData.export(),
                        })
                        ++ii;
                  console.log(ii);
            }.bind(that), 1800);
      },
      onReady() {
      //      this.kefuani();
      }
})