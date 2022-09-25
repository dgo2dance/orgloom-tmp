const app = getApp();
const config = require("../../config.js");
import api from '../../api/api';

Page({

      /**
       * 页面的初始数据
       */
      data: {
            showShare: false,
            poster: JSON.parse(config.data).share_poster,
            photos:'',
            head:'/images/avator.png',
            userinfo:''
            /*
            photos:['http://img1.imgtn.bdimg.com/it/u=1915011011,2156126360&fm=26&gp=0.jpg',
            'http://img1.imgtn.bdimg.com/it/u=1915011011,2156126360&fm=26&gp=0.jpg',
            'http://img1.imgtn.bdimg.com/it/u=1915011011,2156126360&fm=26&gp=0.jpg',

            'http://img1.imgtn.bdimg.com/it/u=1915011011,2156126360&fm=26&gp=0.jpg',

            'http://img1.imgtn.bdimg.com/it/u=1915011011,2156126360&fm=26&gp=0.jpg'],*/

      },


      onLoad() {
            //     this.listkind();
            //      this.getbanner();
            //      this.getList();
             //     this.getPerson();
                  this.onShow();
                  
             //     this.listImage();
         
            },



      edithead(e){
            console.log("editHead----"+e.currentTarget.dataset.id);

            var that = this;
            wx.chooseImage({
                count: 10,
                sizeType: ['compressed'],
                success: res => {
                 //  let prePhotosLen = that.data.photos.length;
                 //   that.photos = that.data.photos.concat(res.tempFilePaths);

                  this.editHead(res.tempFilePaths[0]);
                
                }
            });

      }, 
      onShow() {
            console.log("-----"+app.globalData.userInfo);

            var timestamp = Date.parse(new Date());
            var data_expiration = wx.getStorageSync("data_expiration");
            if (data_expiration) {
            if (timestamp > data_expiration) {
            wx.clearStorageSync()
            }
            } else {
            }
            

            this.setData({
            /*      userinfo:app.globalData.userInfo, */
                  token: wx.getStorageSync("sessionid"),
                  userinfo:wx.getStorageSync("userInfo")
            })
      },
      go(e) {
            if (e.currentTarget.dataset.status == '1') {

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
                  */
            }
            let callbackObj = {
                  callbackUrl: '/pages/my/my',
                  mode: 'redirectTo'
              }
            wx.setStorageSync('callbackObj',callbackObj);
            wx.navigateTo({
                  url: e.currentTarget.dataset.go
            })
      },
      //展示分享弹窗
      showShare() {
            this.setData({
                  showShare: true
            });
      },
      //关闭弹窗
      closePop() {
            this.setData({
                  showShare: false,
            });
      },
      //预览图片
      preview(e) {
            wx.previewImage({
                  urls: e.currentTarget.dataset.link.split(",")
            });
      },
      onShareAppMessage() {
            return {
                  title: JSON.parse(config.data).share_title,
                  imageUrl: JSON.parse(config.data).share_img,
                  path: '/pages/index/index'
            }

      },

        //获取用户图片列表
  async listImage() {
      const json = await api.listimage({
        query: {
             page:0,
             size:0 
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

    async clickMyFollow(){
          wx.navigateTo({
            url: '/pages/myFollow/myFollow',
          });
    },


    async clickMyFree(){
      wx.navigateTo({
        url: '/pages/myFree/myFree',
      });
},

async clickMyJiFen(){
      wx.navigateTo({
        url: '/pages/reflect/reflect',
      });
},


           //删除图片
  async deleteImage(id) {
      const json = await api.deleteimage({
        query: {
             id:id 
        }
      });
  
      console.log("deleteimage:"+JSON.stringify(json));
  
      if (json.code == 200) {
      
            this.listImage();

  
      } else {}
    },




async editHead(tempFilePaths) {
      const json = await api.editHead(tempFilePaths);

      console.log("editHead  parse code:"+JSON.parse(json).code);


      if(JSON.parse(json).code == 200){
            this.getPerson();
      }
     },
     


async upload(tempFilePaths) {
            const json = await api.uploadimage(tempFilePaths);

            console.log("updloadImage  parse code:"+JSON.parse(json).code);


            if(JSON.parse(json).code == 200){
                  this.listImage();
            }
           },
           
    
      up: function (e) {
            var that = this;
            wx.chooseImage({
                count: 10,
                sizeType: ['compressed'],
                success: res => {
                 //  let prePhotosLen = that.data.photos.length;
                 //   that.photos = that.data.photos.concat(res.tempFilePaths);

                  this.upload(res.tempFilePaths[0]);
                  /*
                    that.setData({
                        photos: that.photos
                    });
                    wx.setStorageSync('photos', that.photos);
    
                    for (let i = prePhotosLen, len = that.data.photos.length; i < len; i++){
                        wx.getImageInfo({
                            src: that.data.photos[i],
                            success: function (res) {
                                that.photosSize[i] = {
                                    width: res.width,
                                    height: res.height,
                                };
                                that.setData({
                                    photosSize: that.photosSize,
                                });
                                wx.setStorageSync('photosSize', that.photosSize);
                            },
                        });
                    }
                    */
                }
            });
        },


        async getPerson(id) {
            const json = await api.getPerson({
              query: {
                
            }
            });
        
            console.log("getPersonDetail:"+JSON.stringify(json));
        
            if (json.code == 200) {
              this.setData({
              personDetail: json.data
            });
            /*
            if(json.data.head.length>0){
            this.setData({
                  head: json.data.head
                });
            }*/
            } else {}
          },
        

  bingLongTap(e){
      console.log("long press");
  
      var $tag=e.currentTarget.dataset;

      console.log("long tap"+e.currentTarget.dataset.id);
      var that=this;
      wx.showModal({
            title: '删除当前图片',
            content: '是否确认删除当前图片',
            success: function (res) {
                  　　　　　　if (res.cancel) {
                  　　　　　　　　//点击取消,默认隐藏弹框
                  　　　　　　} else {
                        
                        that.deleteImage(e.currentTarget.dataset.id);

                  　　　　　　　}
                  /*
            success(res) {
                  if (res.confirm) {
                        this.deleteImage(e.currentTarget.dataset.id);

                  }
            }*/
      }
      })
  
    },


    uploadAlbum: function () {
      var that = this;
      var photos = that.data.photos;
      var photosPath = [];
      for (let j = 0, len = photos.length; j < len; j++){
        photosPath[j] = photos[j].split('//')[1];
      }

      wx.showLoading({
          title: '正在上传',
      });

      /*
      app.initQiniu();
      qcloudPromisified({
        url: 'https://weshot.wowge.org/album/new',
        data: {
          albumName: that.data.albumName,
          memory: that.data.memory,
          photos: photosPath,
          feelings: that.data.feelings,
          music: that.data.music,
          createOn: Date.now(),
        },
        method: 'POST'
      })
      .then(() => {
        let flag = 0, count =0;
        for (let i = 0, len = photos.length; i < len; i++){
          count++;
          qiniuUploadPromisified({
              filePath: photos[i],
          })
            .then(res => {
              wx.showToast({
                title: '第' + (i + 1) + '张完成上传',
                icon: 'loading',
                duration: 20000
              })
              flag++;
              if (flag === count) {
                wx.hideLoading();
                wx.switchTab({
                  url: '../albums/albums'
                });
              }
            })
        }
      })
      .catch(err => {
        //console.log(err);
      })
      */
  },

})