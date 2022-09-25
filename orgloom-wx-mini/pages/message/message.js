const app = getApp()
const db = wx.cloud.database();
const config = require("../../config.js");
const util = require('../../utils/util.js')
const biz = require('../../utils/biz.js')
// const io =require('socket.io-client')
// const wxappIo = require('socket.io-mp-client');
const io = require('../../utils/weapp.socket.io.dev.js');
var wsApi = "ws://127.0.0.1:3000";

var openBol = false;

import api from '../../api/api';

const _ = db.command;
Page({
      data: {
            
           // 0-互联网 1-金融 2-制造 3-医疗 4-地产 5-其他',
            navList:[/*{"name":"附近","id":0},{"name":"关注","id":1},*/{"name":"全部","id":-1},{"name":"群组","id":1}],
            notRead:0
          
      },
      

   onLoad:function(){

        this.getMessage();
     
    //  const socket = (this.socket = io('ws://127.0.0.1:3000/', {
    //   path: '/',
    //   query: {
    //   },
    // }));

    // socket.on('connect', () => {
    //   this.setData({ socketMessage: socketMessage += 'SOCKET连接成功 → \n\n' })

    //   // 此处修改为与server约定的数据、格式
    //   var sendMessage = '{"token":"v3jsoc8476shNFhxgqPAkkjt678","client":"发送内容"}'
    //   this.socketSendMessage(sendMessage);
    // })
    

      // wx.connectSocket({
      //   url: wsApi,
      //   data:{
      //   },
      //   header:{ 
      //     'content-type': 'application/json'
      //   },
      //   protocols: ['protocol1'],
      //   method:"GET",
      //   success:function(){
      //     console.log("客户端连接成功");
      //   }
      // }),
      // wx.onSocketOpen(function(res) {
      //   console.log('WebSocket连接已打开！');
      //   openBol = true;
      // }),
      // wx.onSocketMessage(function(res) {
      //   console.log('收到服务器内容：' + res.data)
      // })
  //     const socket = wxappIo('http://localhost:8001',{
  //   query:{
  //     roomID:123,
  //   }
  // });
  
    },
    sendMsg:function(e){
      if(openBol){
        wx.sendSocketMessage({
          data:e.detail.value
        });
      }
    },

    onShow:function(){
      this.getMessage();
    },

    // 获取消息
    async getMessage() {

      if(biz.checkLogin()){
            
            const json = await api.getMessage({
                  method:'post',
                  query: {
                    readClassify:1
                }
                });
            
            console.log("getMessage:"+JSON.stringify(json));
            
                if (json.code == 1000) {
                  this.setData({
                    notRead:json.data.length
                  })

                }  else{

                 
                }
          
  
      }else{
        this.setData({
          notRead:'未登录'
        })

      }

    }

})

