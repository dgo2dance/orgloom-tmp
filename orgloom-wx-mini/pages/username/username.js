
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
    items: [{name: '跑步',value: '跑步'},{name: '户外',value: '户外'},{name: '摄影',value: '摄影'},{name: '绘画',value: '绘画'},{name: '其他',value: '其他'}],
    valuehe: [],
    itemshe: [{name: '内推',value: '内推'},{name: '技能交流',value: '技能交流'},
    {name: '兴趣交流',value: '兴趣交流'},{name: '单身交友',value: '单身交友'},{name: '其他',value: '其他'}
    ],
    countries:['本科','硕士','博士'],
    trades:['互联网/IT','制造','地产','医疗','设计','金融'],
    sexs:['男','女'],
    stations:['软件前端开发','软件后端开发','软件测试','算法工程师','产品经理','设计','生产人员','人力资源','财务会计'],
    tradeIndex:'',
    typeIndex:'',
    statIndex:'',
    orgId:'',
    radio: '1',
    personName:'',
    personPhone:'',
    province:'',
    city:'',
    companyName:'',
    freeName:'',
    salary:'',
    trade:'',
    station:'',
    show:'',
    you:'',
    id:'',
    introduceRemark:'',
    verifyRemark:'',
    shareDetail:'',
    birthData:'',
    wechat:'',
    multiIndex: [],
    multiArray: [["北京", "安徽", "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", 
    "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", 
    "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾"], ["北京"]],
  },

  testLocation () {
//     wx.chooseLocation({
//       success: (res) => {
//         let form = this.data.form
//    //     const hash = geoHash.encode(res.latitude, res.longitude)
//    //     form.latitude = res.latitude
//    //     form.longitude = res.longitude
//    //     form.geoHash = hash
//    //     form['address'] = res.address + res.name
//         this.setData({
//             address: res.address + res.name
//         })
//         console.log(res)
//       },
//       fail (err) {
//         console.log(err)
//       },
//       cancel (err) {
//         console.log(err)
//       }
//     })
  },


  bindCountryChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
        typeIndex: e.detail.value
    })
},

bindTradeChange: function(e) {
    console.log('pick  trade 发生选择改变，携带值为', e.detail.value);
    this.setData({
        tradeIndex: e.detail.value
    })
},

bindStationChange: function(e) {
    console.log('pick  station 岗位 发生了改变，携带值为', e.detail.value);
    this.setData({
        statIndex: e.detail.value
    })
},

bindMultiPickerChange: function(e) {
    that.setData({
        "multiIndex[0]": e.detail.value[0],
        "multiIndex[1]": e.detail.value[1]
    })
},
bindMultiPickerColumnChange: function(e) {
    switch (e.detail.column) {
    case 0:
        list = []
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
            if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) {
                list.push(that.data.objectMultiArray[i].regname)
            }
        }
        that.setData({
            "multiArray[1]": list,
            "multiIndex[0]": e.detail.value,
            "multiIndex[1]": 0
        })

    }
},


  handleDateChange (e) {
    this.setData({
        'birthData': e.detail.value
    })
},


bindSelectorChangeShow(e){
    console.log("bindSelectorChangeShow"+e.detail.value);

	this.setData({
		show: e.detail.value
	})
  },

  bindSelectorChangeYou(e){
    console.log("bindSelectorChangeYou"+e.detail.value);
	this.setData({
		you: e.detail.value
	})
  },

  // 设置人员name
setName:function(e) {
  console.log('set salary', e.detail.value);
  this.setData({
    salary: e.detail.value
  })
},

setFreeName:function(e) {
    console.log('setName，携带值为', e.detail.value);
    this.setData({
      freeName: e.detail.value
    })
  },
// 设置人员电话
setPhone:function(e) {
  console.log('setWechat，携带值为', e.detail.value);
  this.setData({
    wechat: e.detail.value
  })
},

// 验证信息
textinput:function(e) {
    console.log('set验证信息，携带值为', e.detail.value);
    this.setData({
      verifyRemark: e.detail.value
    })
  },

// 自我描述
textinputDesc:function(e) {
    console.log('set 自描述，携带值为', e.detail.value);
    this.setData({
      introduceRemark: e.detail.value
    })
  },



   
//   beginDateJob:this.data.birthData+" 00:00:00",
//   edu:this.data.countries[this.data.typeIndex],
//   job:this.data.job,
//   salaryForm:this.data.show.join(','),
//   salary:this.data.salary,
//   trade:this.data.trades[this.data.tradeIndex],
//   station:this.data.stations[this.data.statIndex]
  //加入人员
async updateFree() {
  const json = await api.updateUserName({
    method:"post",
    query: {
  
    username:this.data.freeName
  
    }
  });
  console.log("updateUserName:"+JSON.stringify(json));

  if(json.code == 1000){
    

        wx.showToast({
                title: '更新成功',
                icon: 'none',
        })

        wx.switchTab({
            url: "/pages/my/my"
      });
  } else{
      if(json.code== 1001){
        var comp = this.selectComponent(".login")
        if (comp) {
              comp.show()
                } else {
              console.log("fatal:can't find login dialog")
            }
          return  
      }
  }
 },
 

 //事件处理函数
 submit: function() {
  this.updateFree();
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




  async getFree(id) {
    const json = await api.getFree({
      query: {
        id:id
    }
    });

    console.log("getFree:"+JSON.stringify(json));

    if (json.code == 1000) {

                

        //   for(var j=0; j<json.data.friendshow.split(",").length;j++){

        //         for(var i=0; i<this.data.items.length;i++){
        //             if(json.data.friendshow.split(",")[j]==this.data.items[i].name){
        //                   if(typeof(json.data.friendShowValue)!="undefined"){
        //             json.data.friendShowValue=   json.data.friendShowValue+","+this.data.itemShow[i].value;
        //                   }else{
        //                     json.data.friendShowValue=this.data.itemShow[i].value; 
        //                   }
        //             }
        //              }
        //       }
        
        //       for(var m=0; m<json.data.you.split(",").length;m++){

        //             for(var n=0; n<this.data.itemYou.length;n++){
        //                 if(json.data.you.split(",")[m]==this.data.itemYou[n].name){
        //                     if(typeof(json.data.youValue)!="undefined"){
        //                 json.data.youValue= json.data.youValue+","+this.data.itemYou[n].value;
        //                     } else{
        //                 json.data.youValue= this.data.itemYou[n].value;         
        //                     }
        //                 }
        //                  }
        //           }

        this.setData({
            value:json.data.interestClassifys.split(","),
            valuehe: json.data.goalsClassifys.split(","),
 
          });


        this.setData({
        free: json.data
        });

 
    // 设置性别
    this.setData({
        tradeIndex: json.data.sexClassify
                  });
    //   for(var m=0; m<this.data.sexs.length;m++){
    //     if(json.data.sexClassify==this.data.sexs[m]){

    //           this.setData({
    //               typeIndex: m
    //           });
    //     }
    // }

    // 设置国家 城市
    this.setData({
        province: json.data.provinceRemark
      });
    
    this.setData({
        city: json.data.cityRemark
      });


      //设置城市
      
    //   this.setData({
    //     'multiIndex[1]': json.data.cityRemark.substr(0, 1)
    //   });
      
      
    //  for(var m=0;m<multiArray[0].length;m++){
    //     if(multiArray[0][m]==json.data.provinceRemark){
    //         this.setData({
    //             'multiIndex[0]': m
    //           });
              

    //     }

    //  }

    this.setData({
        freeName: json.data.freeName,
        show: json.data.interestClassifys.split(','),
        you: json.data.goalsClassifys.split(','),
        wechat: json.data.wechat,
        verifyRemark:json.data.verifyRemark,
        introduceRemark:json.data.introduceRemark
    
      });




    } else {}
  },
  

  onLoad: function (options) {
    console.log("rrrrrr-"+JSON.stringify(options));
    that = this;

    this.getFree(options.id);

    this.setData({
      id: options.companyId,
      companyName:options.companyName
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



