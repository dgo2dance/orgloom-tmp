// import wepy from 'wepy';
import util from './util';
import md5 from './md5';
import tip from './tip';
import httpUtil from './httpUtil'

const API_SECRET_KEY = 'www.mall.cycle.com'
const TIMESTAMP = util.getCurrentTime()
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

const wxRequest = async(params = {}, url) => {
    tip.loading();
    let data = params.query || {};
    data.sign = SIGN;
    data.time = TIMESTAMP;
    console.log("data"+JSON.stringify(data)+"---url:"+url+"--method:"+params.method || 'GET');


    /*
    let res = httpUtil.request({
        url: url,
        method: params.method || 'GET',
        data: data,
      //  header: { 'Content-Type': 'application/json' },
        header: { 'Content-Type': 'application/json' , 'cookie': wx.getStorageSync("sessionid")}, 
      //  success: function (res) {
      //    console.log("ttt");

      //    console.log(JSON.stringify(res.data));

      // }

    });

    */
    let res = httpUtil.request(url,params.method || 'GET',data);
    tip.loaded();
    console.log("request---res:"+JSON.stringify(res));
    if (res.code=="40002") {
        wx.navigateTo({
          url: '../login/login'
        })
      } else {
        return res;
                // throw new Error('Network request success but data state not success')
      }
    
};

const wxUpload = async(params,url) => {
    tip.loading();
    console.log("wxupload---"+params);
 //   let data = params.query || {};
    // data.sign = SIGN;
    // data.time = TIMESTAMP;
    // console.log("data---wxUpload"+JSON.stringify(data));
    console.log("url---wxUpload:"+url);
    let res = httpUtil.upload(params,url);

    /*
    let res = await wx.uploadFile({
        url: url,
        filePath: params,
        name: 'image',
        method: 'POST',
        header: { "Content-Type": "multipart/form-data",
        'cookie': wx.getStorageSync("sessionid"),
        'Authorization': wx.getStorageSync("sessionid")
      }

    });
    */
    tip.loaded();
    console.log("finish - upload"+JSON.stringify(res));

    return  res;
};





module.exports = {
    wxRequest,
    wxUpload
}
