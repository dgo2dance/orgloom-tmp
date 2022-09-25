
import api from '../../api/api';

var weeksArray = [];
var that;
var list = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: [],
    items: [{name: 'A',value: '看电影'},{name: 'B',value: '去唱歌'},
    {name: 'C',value: '吃吃喝喝'},{name: 'D',value: '旅游'},
    {name: 'E',value: '聚会'},{name: 'F',value:'游戏'},{name: 'G',value: '运动'},{name: 'H',value: '其他'}],
    valuehe: [],
    itemshe: [{name: 'A',value: '看脸'},{name: 'B',value: '看品味'},
    {name: 'C',value: '看感觉'},{name: 'D',value: '无所谓'}
    ],
    orgId:'',
    radio: '1',
    personName:'',
    personPhone:'',
    id:'',
    personDetail:'',
    birthData:'',

    wechat:'',
    qq:'',
    height:'',
    weight:'',
    mydesc:'',
  },


setWx:function(e) {
  this.setData({
    wechat: e.detail.value
  })
},


setQq:function(e) {
  this.setData({
    qq: e.detail.value
  })
},

setHeight:function(e) {
    this.setData({
        height: e.detail.value
    })
  },

setWeight:function(e) {
    this.setData({
        weight: e.detail.value
    })
  },

  setmyDesc:function(e) {
    this.setData({
        mydesc: e.detail.value
    })
  },


  //创建组织
async updatePerson() {
  const json = await api.updatePerson({
    method:"post",
    query: {
    wechat:this.data.wechat,
    qq:this.data.qq,
    height:this.data.height,
    weight:this.data.weight,
    mydesc:this.data.mydesc,
    }
  });
  console.log("updatePerson:"+JSON.stringify(json));

  if(json.code == 200){

      wx.switchTab({
        url: '../my/my'
      })
  }
 },
 

 //事件处理函数
 submit: function() {
  this.updatePerson();
},


  onChange(event) {
    this.setData({
      radio: event.detail
    });
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
        wechat: json.data.wechat
    });

    this.setData({
      qq: json.data.qq
    });

    this.setData({
      height: json.data.height
    });

    this.setData({
      weight: json.data.weight
    });

    this.setData({
      mydesc: json.data.mydesc
    });

    } else {}
  },

  onLoad: function (options) {
//    console.log("rrrrrr-"+JSON.stringify(options));
    that = this;

    this.getPerson(options.id);
    this.setData({
      id: options.id
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



