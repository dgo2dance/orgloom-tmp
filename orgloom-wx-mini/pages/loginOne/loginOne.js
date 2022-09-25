//获取应用实例
const app = getApp()


import api from '../../api/api';


Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: true
    },


      //获取用户手机号
      getPhoneNumber: function(e) {
        let that = this;
        //判断用户是否授权确认
        if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
              wx.showToast({
                    title: '获取手机号失败',
                    icon: 'none'
              })
              return;
        }
        wx.showLoading({
              title: '获取手机号中...',
        })
        
      

        wx.login({
              success:re=> {
                
                const sessionKey=wx.getStorageSync('session_key');
                const param= {
                  $url: "phone", //云函数路由参数
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv,
                  code: re.code,
                  session_key:sessionKey
            };
            console.log("-----get Phone Numkber--param-",param);
            this.getPhoneNumberUrl(param.encryptedData,param.iv,param.code,param.session_key);
                    // wx.cloud.callFunction({
                    //       name: 'regist', // 对应云函数名
                    //       data: {
                    //             $url: "phone", //云函数路由参数
                    //             encryptedData: e.detail.encryptedData,
                    //             iv: e.detail.iv,
                    //             code: re.code
                    //       },
                    //       success: res => {
                    //             console.log(res);
                    //             wx.hideLoading();
                    //             if (res.result == null) {
                    //                   wx.showToast({
                    //                         title: '获取失败,请重新获取',
                    //                         icon: 'none',
                    //                         duration: 2000
                    //                   })
                    //                   return false;
                    //             }
                    //             //获取成功，设置手机号码
                    //             that.setData({
                    //                   phone: res.result.data.phoneNumber
                    //             })
                    //       },
                    //       fail: err => {
                    //             console.error(err);
                    //             wx.hideLoading()
                    //             wx.showToast({
                    //                   title: '获取失败,请重新获取',
                    //                   icon: 'none',
                    //                   duration: 2000
                    //             })
                    //       }
                    // })
              },
              fail: err => {
                    console.error(err);
                    wx.hideLoading()
                    wx.showToast({
                          title: '获取失败,请重新获取',
                          icon: 'none',
                          duration: 2000
                    })
              }
        })
  },


        async getPhoneNumberUrl(encryptedData,iv,code,session_key){

          const openId=wx.getStorageSync('openid');

        const json = await api.getPhoneNumber({
          method:"post",
          query: {
            encryptedData: encryptedData,
            iv: iv,
            code: code,
            session_key:session_key,
            openid:openId
          }
        });

        if(json.code==1000){
          console.log(json);
                      wx.hideLoading();
                      // if (res.result == null) {
                      //       wx.showToast({
                      //             title: '获取失败,请重新获取',
                      //             icon: 'none',
                      //             duration: 2000
                      //       })
                      //       return false;
                      // }
                      //获取成功，设置手机号码
                      app.globalData.userInfo = json.data.user;

                      var timestamp = Date.parse(new Date());
                      var expiration = timestamp + 3600000*5; //缓存60分钟*5

                      wx.setStorageSync('userInfo',  json.data.user);

                      wx.setStorageSync('data_expiration',  expiration);


                      wx.setStorageSync('sessionid', json.data.token);
                      this.setData({
                            phone: json.data.phone
                      });

                      if(json.data.user.username==null||json.data.user.username.length<=0){
                       await wx.showToast({title:'请设置用户名',duration:2000});
                        wx.navigateTo({url: '/pages/username/username'});
                      } else {
                          this.getCallBackUrl().catch(() =>{
                                wx.switchTab({
                                  url: "/pages/my/my"
                            });
                          })
                      }
                  //     wx.switchTab({
                  //       url: "/pages/my/my"
                  // });
        }
      },

       // 获取本地可以回调的地址
    getCallBackUrl: function() {
      return new Promise((resolve,reject) => {
          const callbackObj = wx.getStorageSync('callbackObj');
          if(callbackObj) {
              let resultObj = JSON.parse(callbackObj);
              let callbackUrl = resultObj.callbackUrl;
              let mode = resultObj.mode;
              mode == 'redirectTo' && wx.redirectTo({url: callbackUrl});
              mode == 'switchTab' && wx.switchTab({url: callbackUrl});
              mode == 'reLaunch' && wx.reLaunch({url: callbackUrl});
              mode == 'navigateTo' && wx.navigateTo({url: callbackUrl});
          } else {
              reject();
          }
      })
  },

    //获取openId
    async getOpenId(code){

        console.log("get openId index-------");
          const json = await api.getSessionKey({
            method:"post",
            query: {
            code:code,
            }
          });

        console.log("get getSessionKey:"+JSON.stringify(json));
        if(json.code == 1000){
        
        
        wx.setStorageSync('openid', json.data.openid);
        wx.setStorageSync('session_key',json.data.session_key);
        
        
        console.log("get session id:----openId---" + wx.getStorageSync('sessionid'));

        console.log("get session key:----session_key---" + wx.getStorageSync('session_key'));

        
    //     wx.switchTab({
    //       url: "/pages/my/my"
    // });



         /*
         this.setData({
              code: json.data.code,
          })
         this.countDown(json.data.code);
  
         */
  
  
    
          }
      },

      

    onLoad: function() {

      wx.login({
        success: res => {
            // 获取到用户的 code 之后：res.code
            console.log("用户的code:" + res.code);
            


            this.getOpenId(res.code);

   

        //    app.globalData.userInfo = e.detail.userInfo;

            // 可以传给后台，再经过解析获取用户的 openid
            // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
            // wx.request({
            //     // 自行补上自己的 APPID 和 SECRET
            //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
            //     success: res => {
            //         // 获取到用户的 openid
            //         console.log("用户的openid:" + res.data.openid);
            //     }
            // });


        }
    });


    //     var that = this;

    //     // if(app.globalData.userInfo){
            
    //     //     wx.switchTab({
    //     //         url: "/pages/iam/iam"
    //     //   });

    //     // }
    //     查看是否授权
    //     wx.getSetting({
    //         success: function(res) {
    //             if (res.authSetting['scope.userInfo']) {
    //                 wx.getUserInfo({
    //                     success: function(res) {
    //                         // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
    //                         // 根据自己的需求有其他操作再补充
    //                         // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
    //                         that.setData({
    //                             userInfo: res.userInfo,
    //                             hasUserInfo: true
    //                           })

    //                         wx.login({
    //                             success: res => {
    //                                 // 获取到用户的 code 之后：res.code
    //                                 console.log("用户的code:" + res.code);
                                    

                    
    //                                 that.getOpenId(res.code);

                           

    //                             //    app.globalData.userInfo = e.detail.userInfo;

    //                                 // 可以传给后台，再经过解析获取用户的 openid
    //                                 // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
    //                                 // wx.request({
    //                                 //     // 自行补上自己的 APPID 和 SECRET
    //                                 //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
    //                                 //     success: res => {
    //                                 //         // 获取到用户的 openid
    //                                 //         console.log("用户的openid:" + res.data.openid);
    //                                 //     }
    //                                 // });


    //                             }
    //                         });
    //                     }
    //                 });
    //             } else {
    //                 // 用户没有授权
    //                 // 改变 isHide 的值，显示授权页面
    //                 that.setData({
    //                     isHide: true
    //                 });
    //             }
    //         }
    //     });


    // if (app.globalData.userInfo) {
    //     this.setData({
    //       userInfo: app.globalData.userInfo,
    //       hasUserInfo: true
    //     })
  
    //   } else if (this.data.canIUse){
    //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //     // 所以此处加入 callback 以防止这种情况
    //     app.userInfoReadyCallback = res => {
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
  
    //     }
    //   } else {
    //     // 在没有 open-type=getUserInfo 版本的兼容处理
    //     wx.getUserInfo({
    //       success: res => {
    //         app.globalData.userInfo = res.userInfo
    //         this.setData({
    //           userInfo: res.userInfo,
    //           hasUserInfo: true
    //         })
    //       }
    //     })
    //   }

    },

    bindGetUserInfo: function(e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            // 获取到用户的信息了，打印到控制台上看下
            console.log("用户的信息如下：");
            console.log(e.detail.userInfo);

            this.setData({
                userInfo:e.detail.userInfo,
                hasUserInfo: true
              })
            
            app.globalData.userInfo = e.detail.userInfo;
            // 调用登录获取appid;
            wx.login({
                success: res => {
                    // 获取到用户的 code 之后：res.code
                    console.log("用户的code:" + res.code);

                    
                    that.getOpenId(res.code);

        //          app.globalData.userInfo = e.detail.userInfo;

              
        
                  console.log("导航之后  看看：");

                    // 可以传给后台，再经过解析获取用户的 openid
                    // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                    // wx.request({
                    //     // 自行补上自己的 APPID 和 SECRET
                    //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                    //     success: res => {
                    //         // 获取到用户的 openid
                    //         console.log("用户的openid:" + res.data.openid);
                    //     }
                    // });

                    
                }
            });


            
           

            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
            that.setData({
                isHide: false
            });
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function(res) {
                    // 用户没有授权成功，不需要改变 isHide 的值
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”');
                    }
                }
            });
        }
    }
})
