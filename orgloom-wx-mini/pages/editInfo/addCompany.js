
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
    items: [{name: 'A',value: '奖金'},{name: 'B',value: '股票'}],
    valuehe: [],
    itemshe: [{name: 'A',value: '看脸'},{name: 'B',value: '看品味'},
    {name: 'C',value: '看感觉'},{name: 'D',value: '无所谓'}
    ],
    countries:['本科','硕士','博士'],
    trades:['互联网/IT','金融','传统行业','生物医疗','地产','硬科技',
    '企业服务',
    '汽车出行',
    '消费零售',
    '咨询',
    '教育',
    '文娱体育',
    '政府机构',
    '社创',
    '公益',
    '海外校园',
    '国内校园',
    '新能源',
    '上市',
    '其他'
],


    stations:['软件前端开发','软件后端开发','软件测试','算法工程师','产品经理','设计','生产人员','人力资源','财务会计'],
    tradeIndex:'',
    typeIndex:'',
    statIndex:'',
    orgId:'',
    radio: '1',
    personName:'',
    personPhone:'',
    province:'',
    companyName:'',
    salary:'',
    trade:'',
    station:'',
    show:'',
    you:'',
    id:'',
    mydesc:'',
    shareDetail:'',
    birthData:'',
    multiIndex: [],
    visionRemark:'',
    multiArray: [["北京", "安徽", "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", 
    "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", 
    "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾"], ["北京"]],
    images:[]

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


// images
chooseImage: function(e) {
    console.log("---click images-----");
      var left = 9 - this.data.images.length;
      let that=this;
      wx.chooseImage({
        count: left,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          if (res.tempFilePaths.length > 0) {
            that.clearInput("images");
            that.addNewImage(res.tempFilePaths);
          }
        },
      })
    },
     onClickImage: function(e) {
      var index = e.currentTarget.dataset.idx
      var images = this.data.images
      wx.previewImage({
        urls: images,
        current: images[index],
      })
    },
    
     onDeleteImage: function (e) {
      var index = e.currentTarget.dataset.idx
      var images = this.data.images
      images.splice(index, 1)
      this.setData({images: images})
    },
  
    
     clearInput(keep) {
      if (keep != 'images') {
        this.setData({ images: [] })
      }
      // if (keep != 'video') {
      //   this.setData({ video: {} })
      // }
      // if (keep != 'link') {
      //   this.setData({ link: {} })
      // }
    },
  
    addNewImage(images) {
      var array = this.data.images
      array = array.concat(images)
      this.setData({ images: array })
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
  console.log('set name', e.detail.value);
  this.setData({
    name: e.detail.value
  })
},

setJob:function(e) {
    console.log('setName，携带值为', e.detail.value);
    this.setData({
      job: e.detail.value
    })
  },
// 设置人员电话
setPhone:function(e) {
  console.log('setName，携带值为', e.detail.value);
  this.setData({
    personPhone: e.detail.value
  })
},

setmyDesc:function(e) {
    this.setData({
        mydesc: e.detail.value
    })
  },

  setmyVisionRemark:function(e) {
    this.setData({
        visionRemark: e.detail.value
    })
  },


  // 上传图片
  async  upload(tempFilePaths) {
    const json = await api.upload(tempFilePaths);
  
    console.log("updloadImage  parse code:"+JSON.stringify(json));
  
    if(JSON.parse(json).code == 1000){
      //    this.listImage();
      // 上传完图片后，将图片与post进行关联
   //   json=eval("("+json+")");
   //   json=JSON.parse(JSON.parse(json));
   var msg2 = JSON.parse(json).data;
      return msg2;
  
    }
   },
   
  //添加公司
async addCompany() {
  var imageIcon='';
  console.log("-----this.data.images",this.data.images.length);
  console.log("-----this.data.images",this.data.images[0]);

  if(this.data.images.length>0){
    imageIcon=  await this.upload(this.data.images[0])
  }
  console.log("-----parentId---save--",this.data.parentId);
  var param= {
    method:"post",
    query: {
    name:this.data.name,
    tmpName:this.data.name,
    visionRemark:this.data.visionRemark,
    introRemark:this.data.mydesc,
    industryClassify:this.data.tradeIndex,
    industryClassifyRemark:this.data.trades[this.data.tradeIndex],
    logoIcon:imageIcon,
    followCount:0
    }
  };


  const json = await api.addCompany(param
  );
  console.log("addCompany:"+JSON.stringify(json));

  if(json.code == 1000){
    

        wx.showToast({
                title: '添加成功',
                icon: 'none',
        })

      wx.navigateTo({
        url: '../stock/stock?id=' + json.data.id
      })
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

//   //创建组织
// async addCompany() {
//   const json = await api.addCompany({
//     method:"post",
//     query: {
//     name:this.data.companyName,
//     city:this.data.multiArray[1][this.data.multiIndex[1]],
//     province:this.data.multiArray[0][this.data.multiIndex[0]],
//     comDesc:this.data.mydesc,
//     cateId:this.data.tradeIndex,
//     cateName:this.data.trades[this.data.tradeIndex],
//     }
//   });
//   console.log("addCompany:"+JSON.stringify(json));

//   if(json.code == 200){
    


//         this.setData({
//             id: json.data.id
//           });

//       wx.navigateTo({
//         url: '../stock/stock?name=' + this.data.companyName + '&id=' + this.data.id
//       })
//   }
//  },
 

 //事件处理函数
 submit: function() {
  this.addCompany();
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
      this.orgList = json.data;
      this.setData({
      personDetail: json.data
    });

    this.setData({
      name: json.data.name
    });

    this.setData({
      personPhone: json.data.phone
    });

    } else {}
  },

  onLoad: function (options) {
//    console.log("rrrrrr-"+JSON.stringify(options));
    that = this;

 

 //   this.getPerson(options.id);
  
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



