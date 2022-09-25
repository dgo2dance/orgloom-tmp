
import api from '../../api/api';

var weeksArray = [];
var that;
var list = []
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:'',
    name:'',
    head:'',
    gender:''
  },

  testLocation () {
  //   wx.chooseLocation({
  //     success: (res) => {
  //       let form = this.data.form
  //  //     const hash = geoHash.encode(res.latitude, res.longitude)
  //  //     form.latitude = res.latitude
  //  //     form.longitude = res.longitude
  //  //     form.geoHash = hash
  //  //     form['address'] = res.address + res.name
  //       this.setData({
  //           address: res.address + res.name
  //       })
  //       console.log(res)
  //     },
  //     fail (err) {
  //       console.log(err)
  //     },
  //     cancel (err) {
  //       console.log(err)
  //     }
  //   })
  },

  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo);
    app.globalData.userInfo = res.userInfo;
    this.setData({
        userInfo:res.userInfo
      });
    this.updatePerson();

  },


  //创建组织



 async updatePerson() {
    const json = await api.updatePerson({
      method:"post",
      query: {
      nickname:this.data.userInfo.nickName,
      head:this.data.userInfo.avatarUrl,
      gender:this.data.userInfo.gender,
      avatarurl:this.data.userInfo.avatarUrl,
      /*
      city:this.data.multiIndex[1]+","+this.data.multiArray[1][this.data.multiIndex[1]],
      province:this.data.multiIndex[0]+","+this.data.multiArray[0][this.data.multiIndex[0]],
      */
   
      }
    });
    console.log("updatePerson:"+JSON.stringify(json));
    
    /*
    if(json.code == 200){
  
        wx.navigateTo({
          url: '../editInfo/editInfoSec'
        })
    }
    */
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


async editHead(tempFilePaths) {
const json = await api.editHead(tempFilePaths);

console.log("editHead  parse code:"+JSON.parse(json).code);


if(JSON.parse(json).code == 200){
     this.getPerson();
}
},



 //事件处理函数
 submit: function() {
  wx.navigateTo({
    url: '../editInfo/addInfo'
  })
},


  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },

  onPersonNameChange:function(event) {
    console.log('personName', event.detail.value);

    this.setData({
      personName: event.detail.value
    })

  },

  onPersonPhoneChange:function(event) {

    console.log('personPhone', event.detail.value);
    this.setData({
      personPhone: event.detail.value
    })

  },

  

 

  //事件处理函数
  share: function() {
    wx.navigateTo({
      url: '../org/addOrg'
    })
  },

  onShareAppMessage: function () {
    return {
      title: '纵横排班',
      desc: '邀请你加入',
      path: '/pages/index/index',
     // imgUrl:
    }
  },


  async getPerson(id) {
    const json = await api.getPerson({
      query: {

    }
    });

    console.log("getPersonDetail:"+JSON.stringify(json));

    if (json.code == 200) {
  

    this.setData({
      'userInfo.avatarUrl': json.data.head
    });


    } else {}
  },

  onLoad: function () {
    console.log("rrrrrr-");
    console.log("wx.getStorageSync-----s"+wx.getStorageSync("sessionid"));
    if(wx.getStorageSync("sessionid").length<=0){
        console.log("wx.getStorageSync---no session--s");
    wx.navigateTo({
        url: '../loginOne/loginOne'
      })
    }
    
    that = this;
     // 获取用户信息
     wx.getSetting({
        success: res => {

            console.log("ttt");
            console.log(res.authSetting['scope.userInfo']);
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                app.globalData.userInfo = res.userInfo;
                this.setData({
                    userInfo:res.userInfo
                  })
                console.log("eeeeeee"+JSON.stringify(res.userInfo));
                
                this.updatePerson();
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      });


},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var that = this;
    // GetDepartment_info(that);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})



