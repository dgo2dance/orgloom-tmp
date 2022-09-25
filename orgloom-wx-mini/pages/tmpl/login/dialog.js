const kawa = require('../../../kawa.js')
const api = require('../../../utils/api.js')
const biz = require('../../../utils/biz.js')

const app = getApp()

// pages/tmpl/login/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    color: kawa.Theme.MainColor,
    show: false,
    mode: 0,
    user: {},
    btnEnable: false,
    dialog2: false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    show: function() {
    //  const { user_mode } = app.globalData.meta
      // this.setData({ show: true, mode: user_mode})
      // this.setData({ dialog2: true, mode: user_mode})

      this.setData({ show: true})
      this.setData({ dialog2: true})


    },

    clickClose: function(e) {
      requestClose(this)
    },

    close: function() {
      this.setData({
          dialog2: false,
      });
      this.setData({ show: false})

  },

  setCallbackUrl: function(mode) {
    return new Promise((resolve,reject) => {
        let pages = getCurrentPages(); //获取加载的页面
        let currentPage = pages[pages.length - 1]; //获取当前页面的对象
        let urlPage = ''; // 存储的跳转地址
        let url = currentPage.route; //当前页面url
        let argumentsStr = '';
        let options = currentPage.options; //如果要获取url中所带的参数可以查看options
        for (let key in options) {
                let value = options[key];
                argumentsStr += key + '=' + value + '&';
        }
        if(argumentsStr) {
             argumentsStr = argumentsStr.substring(0, argumentsStr.length - 1);
             urlPage = url + '?' + argumentsStr;
        } else {
            urlPage = url;
        }
        let callbackObj = {
            callbackUrl: `/${urlPage}`,
            mode: mode || 'redirectTo'
        }
         wx.setStorageSync('callbackObj', JSON.stringify(callbackObj));
         resolve();
    })
},


    clickFinish: function(e) {
      this.setCallbackUrl();
      wx.navigateTo({
        url: '../loginOne/loginOne'
      })
  //    finish(this)
    },

    bindUserInfo: function(e) {
      bindUserInfo(this, e)
    },

    getPhoneNumber: function(e) {
      bindPhoneNumber(this, e)
    }
  }
})

function bindUserInfo(view, e) {
  var userInfo = e.detail.userInfo
  if (userInfo) {
    var user = view.data.user
    user.avatar = userInfo.avatarUrl
    user.city = userInfo.city
    user.gender = userInfo.gender
    user.language = userInfo.language
    user.nickname = userInfo.nickName
    view.setData({ user: user })
    enableButton(view)
  }
}

function bindPhoneNumber(view, e) {
  var ecrypted = e.detail.encryptedData
  var iv = e.detail.iv
  if (ecrypted && iv) {
    biz.getPhoneNumber(ecrypted, iv).then(data => {
      console.log("get data success:", data)
      if (!data || !data.purePhoneNumber) {
        wx.showToast({ title: '会话过期, 请重试' })
        return
      }
      var user = view.data.user
      user.phone = data.purePhoneNumber
      view.setData({ user: user })
      enableButton(view)
    }).catch(err => {
      if (err.code && err.code == 2) {
        wx.showToast({ title: '手机号解密失败', icon: 'none' })
      } else {
        wx.showToast({ title: '绑定手机号失败', icon: 'none' })
      }
      console.log(err)
    })
  } else {
    wx.showToast({ title: '绑定手机号失败:0', icon: 'none' })
  }
}

function enableButton(view) {
  const { user, mode } = view.data
  if (!user.nickname) {
    return
  }
  if (mode == 2 && !user.phone) {
    return
  }
  view.setData({ btnEnable: true })
}

function finish(view) {
  const { user, mode } = view.data
  if (!user.nickname) {
    wx.showToast({ title: '请授权绑定昵称', icon: 'none'})
    return
  }

  if (mode == 2 && !user.phone) {
    wx.showToast({ title: '请授权绑定手机号', icon: 'none' })
    return
  }

  // update user 
  api.updateUser(user).then((resp) => {
    // update global cache
    app.globalData.userInfo = resp.data

    // callback
    view.triggerEvent('onOk', resp.data)

    // close dialog
    requestClose(view)
  }).catch(err => {
    console.log(err)
    wx.showToast({ title: '更新用户资料失败', icon: 'none' })
  })
}

function requestClose(view) {
  view.setData({show: false})
}