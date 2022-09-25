

// import sha1 from './sha1'

// sign

// 签名
/*
function sign (signObj = {}) {
  ... // 自行加密
  return signObj
}

// GET请求
function GET (requestHandler, isShowLoading) {
  return request('GET', sign(requestHandler), isShowLoading)
}

// POST请求
function POST (requestHandler, isShowLoading) {
  return request('POST', sign(requestHandler), isShowLoading)
}
*/
function request (url,method, data) {
  // 加密
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
        'cookie': wx.getStorageSync("sessionid"),
        'Authorization': wx.getStorageSync("sessionid"),

      },
      success: function (res) {

    //  	console.log("Promise");
    //  	console.log(res.data.success);
    //  	console.log("res data--"+res.data);
        // 解密
    //    console.log("succe -------------"+JSON.stringify(res.data));
        if (res.data.Code=="40002") {

          console.log("------40002---");
          wx.navigateTo({
            url: '../loginOne/loginOne'
          })
        }

   //     if (res.data.success) {
          resolve(res.data );
   //     } else {
   //       reject(res.data.data)
          // throw new Error('Network request success but data state not success')
   //     }
      },
      fail: function (res) {
        // 因为hide会让showToast隐藏
     //   console.log("erro -------------"+JSON.stringify(res));
        reject(new Error('Network request failed'))
        // throw new Error('Network request failed')
      },
      complete: function () {
      }
    })
  })

}



function upload (params,url) {
  // 加密
  return new Promise((resolve, reject) => {


      wx.uploadFile({
      url: url,
      filePath: params,
      name: 'image',
      method: 'POST',
      header: { "Content-Type": "multipart/form-data",
      'cookie': wx.getStorageSync("sessionid"),
      'Authorization': wx.getStorageSync("sessionid")
    },

    success: function (res) {

          if (res.code=="40002") {
  
            console.log("------40002---");
            wx.navigateTo({
              url: '../login/login'
            })
          }
  
            resolve(res.data );
        },

    fail: function (res) {
          // 因为hide会让showToast隐藏
       //   console.log("erro -------------"+JSON.stringify(res));
          reject(new Error('Network request failed'))
          // throw new Error('Network request failed')
        },
    complete: function () {
        }

  });

  })

}


module.exports = {
  request: request,
  upload: upload
}