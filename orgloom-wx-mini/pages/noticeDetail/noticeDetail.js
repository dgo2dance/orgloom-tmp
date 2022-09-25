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
            list:[],
            item:'',
            id:''
          
      },
      

   onLoad:function(options){
      
      console.log("-----option---id",options.id);
      this.setData({
            id:options.id
      })
      this.getMessage(options.id);
  
    },


   async agree(){
      console.log("-----agree-----");
      const json = await api.messageCheck({
            method:'post',
            query: {
                  id:this.data.id,
                  result:0
          }
          });
          if (json.code == 1000) {
            wx.showToast({ title: '处理成功' });
   }
},
   async refuse(){
      console.log("-----refuse-----");
      const json = await api.messageCheck({
            method:'post',
            query: {
                  id:this.data.id,
                  result:1
          }
          });
      if (json.code == 1000) {
            wx.showToast({ title: '处理成功' });
      }
   },
     // 获取消息
     async getMessage(ids) {

      if(biz.checkLogin()){
            
            const json = await api.messageDetail({
                  method:'get',
                  query: {
                        id:ids
                }
                });
            
            console.log("getNotice:"+JSON.stringify(json));
            
                if (json.code == 1000) {
                  this.setData({
                    item:json.data
                  })

                }  else{

                 
                }
          
  
      }else{
            var comp = this.selectComponent(".login")
            if (comp) {
                  comp.show()
                  } else {
                  console.log("fatal:can't find login dialog")
            }
            return  
  

      }

    }


})

