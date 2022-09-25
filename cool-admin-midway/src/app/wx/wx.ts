import { Inject, Provide, resetModule } from '@midwayjs/decorator';
import { ok } from 'assert';
import axios from 'axios';
// import WXBizDataCrypt from './WXBizDataCrypt';

// import WXBizData from './BizData';

import Decode from './Biz';

/**
 * 微信处理类
 */
 @Provide()
 export class wxUtils {
   // @Inject() ss


    /**
     * 获得手机号
     */
    async getPhoneNumber(param:any) {
        // return fetch("https://www.baidu.com")
        // .then(res=>res.text())
        // .then(json=>console.log(json));;

        // const session=JSON.parse(JSON.stringify(await this.getSessionKey(param.code)));

        // // // -------session------ {
        // // //     session_key: 'ASs4BpiRqmykPf9npIoeTQ==',
        // // //     openid: 'obibL5LlMbrplzqj3MgRZk_vMNRw'
        // // //   }
        // console.log("-------session------",session);

      //  return ok;
    //  var processData = WXBizData.decode( session.session_key,param.iv,param.encryptedData);
    //    let pc = new Decode('wx473a7e47ddda24f5', session.session_key);
        let pc = new Decode('wx961a134012ce4591', param.session_key);
        let phoneData = await pc.decryptData(param.encryptedData, param.iv);
        phoneData.openid=param.openid;
        console.log("------phoneData------",phoneData);
        return phoneData;
        
        //  axios({
        //     method: 'get',
        //     url: 'http://baidu.com',
        //     data: {
        //         age: 20,
        //         name: "zs"
        //     } //post 传参
        // }).then((result) => {
                    
            
        //     console.log('-----result----',result)
        //             return result.statusText;
                 
                    
        //         } ) 
        
        }



          /**
     * 获得手机号
     */
    async getSessionKey(code) {
        // return fetch("https://www.baidu.com")
        // .then(res=>res.text())
        // .then(json=>console.log(json));;
        // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx8b4e8a7f1d1e7192&secret=bee9aa87ae69eabe81b543d06d292254&js_code=${code}&grant_type=authorization_code`',

        const url='https://api.weixin.qq.com/sns/jscode2session?appid=wx961a134012ce4591&secret=a48c28bf8dda3a474ec14deed68b5908&js_code='+code+'&grant_type=authorization_code';

        console.log("----require---url----",url);

        return axios({
            method: 'get',
            url: url,
            data: {
                appid: "wx961a134012ce4591",
                secret: "a48c28bf8dda3a474ec14deed68b5908",
                js_code:code,
                grant_type:"authorization_code"
            } //post 传参
        }).then((result) => {
            console.log('---session--result----',result.data)
                    return result.data;
                 
                } ) 
        
        }



    }