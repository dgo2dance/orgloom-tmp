// 引入crypto-js
import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto-js';

// import { encrypt, decrypt } from 'crypto-js/aes';

import {Base64} from 'js-base64'
 
 
class Decode {
  appId: string
  sessionKey: string
 
  constructor(appId: string, sessionKey: string) {
    this.appId = appId
    this.sessionKey = sessionKey
  }
 
  decryptData(data: string, ivv: string):any {
    let key = CryptoJS.enc.Base64.parse(this.sessionKey)
    let iv = CryptoJS.enc.Base64.parse(ivv)
    let decrypt = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return JSON.parse(Base64.decode(CryptoJS.enc.Base64.stringify(decrypt)))
  }


//   decryptDataNew (encryptedData:string, iv:string):any {
//     // base64 decode
//     var sessionKey = new Buffer(this.sessionKey, 'base64')
//     var encryptedDataNew = new Buffer(encryptedData, 'base64')
//     var ivNew = new Buffer(iv, 'base64')
  
//     try {
//        // 解密
//       var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, ivNew)
//       // 设置自动 padding 为 true，删除填充补位
//       decipher.setAutoPadding(true)
//       var decoded = decipher.update(encryptedDataNew, 'binary', 'utf8')
//       decoded += decipher.final('utf8')
      
//       decoded = JSON.parse(decoded)
  
//     } catch (err) {
//       throw new Error('Illegal Buffer')
//     }
  
//     if (decoded.watermark.appid !== this.appId) {
//       throw new Error('Illegal Buffer')
//     }
  
//     return decoded
//   }

}
 
 
export default Decode