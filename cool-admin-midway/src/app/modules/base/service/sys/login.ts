import { Inject, Provide, Config } from '@midwayjs/decorator';
import {
  BaseService,
  ICoolCache,
  CoolCommException,
  CoolConfig,
  RESCODE,
} from '@cool-midway/core';
import { LoginDTO } from '../../dto/login';
import * as svgCaptcha from 'svg-captcha';
import { v1 as uuid } from 'uuid';
import { BaseSysUserEntity } from '../../entity/sys/user';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import * as md5 from 'md5';
import { BaseSysRoleService } from './role';
import * as _ from 'lodash';
import { BaseSysMenuService } from './menu';
import { BaseSysDepartmentService } from './department';
import * as jwt from 'jsonwebtoken';
import { Context } from 'egg';
import * as svgToDataURL from 'mini-svg-data-uri';
import { wxUtils } from '../../../../wx/wx';

/**
 * 登录
 */
@Provide()
export class BaseSysLoginService extends BaseService {
  @Inject('cool:cache')
  coolCache: ICoolCache;

  @InjectEntityModel(BaseSysUserEntity)
  baseSysUserEntity: Repository<BaseSysUserEntity>;

  @Inject()
  baseSysRoleService: BaseSysRoleService;

  @Inject()
  wxUtils: wxUtils;

  @Inject()
  baseSysMenuService: BaseSysMenuService;

  @Inject()
  baseSysDepartmentService: BaseSysDepartmentService;

  @Inject()
  ctx: Context;

  @Config('module.base')
  coolConfig: CoolConfig;

  /**
   * 登录
   * @param login
   */
  async login(login: LoginDTO) {
    const { username, captchaId, verifyCode, password } = login;
    // 校验验证码
    const checkV = await this.captchaCheck(captchaId, verifyCode);
    if (checkV) {
      const user = await this.baseSysUserEntity.findOne({ username });
      // 校验用户
      if (user) {
        // 校验用户状态及密码
        if (user.status === 0 || user.password !== md5(password)) {
          throw new CoolCommException('账户或密码不正确~');
        }
      } else {
        throw new CoolCommException('账户或密码不正确~');
      }
      // 校验角色
      const roleIds = await this.baseSysRoleService.getByUser(user.id);
      if (_.isEmpty(roleIds)) {
        throw new CoolCommException('该用户未设置任何角色，无法登录~');
      }

      // 生成token
      const { expire, refreshExpire } = this.coolConfig.jwt.token;
      const result = {
        expire,
        token: await this.generateToken(user, roleIds, expire),
        refreshExpire,
        refreshToken: await this.generateToken(
          user,
          roleIds,
          refreshExpire,
          true
        ),
      };

      // 将用户相关信息保存到缓存
      const perms = await this.baseSysMenuService.getPerms(roleIds);
      const departments = await this.baseSysDepartmentService.getByRoleIds(
        roleIds,
        user.username === 'admin'
      );
      await this.coolCache.set(
        `admin:department:${user.id}`,
        JSON.stringify(departments)
      );
      await this.coolCache.set(`admin:perms:${user.id}`, JSON.stringify(perms));
      await this.coolCache.set(`admin:token:${user.id}`, result.token);
      await this.coolCache.set(`admin:token:refresh:${user.id}`, result.token);

      return result;
    } else {
      throw new CoolCommException('验证码不正确');
    }
  }



  /**
   * 前台用户登录
   * @param loginFront
   */
   async loginFront(login: LoginDTO) {
    const { username, captchaId, verifyCode, password } = login;
    // 校验验证码
   // const checkV = await this.captchaCheck(captchaId, verifyCode);

    const checkV=true;
    if (checkV) {
      const user = await this.baseSysUserEntity.findOne({ username });
      // 校验用户
      if (user) {
        // 校验用户状态及密码
        if (user.status === 0 || user.password !== md5(password)) {
          throw new CoolCommException('账户或密码不正确~');
        }
      } else {
        throw new CoolCommException('账户或密码不正确~');
      }
      // 校验角色
      // const roleIds = await this.baseSysRoleService.getByUser(user.id);
      // if (_.isEmpty(roleIds)) {
      //   throw new CoolCommException('该用户未设置任何角色，无法登录~');
      // }
       const roleIds ='';

      // 生成token
      const { expire, refreshExpire } = this.coolConfig.jwt.token;
      const result = {
        expire,
        token: await this.generateToken(user, roleIds, expire),
        refreshExpire,
        refreshToken: await this.generateToken(
          user,
          roleIds,
          refreshExpire,
          true
        ),
      };

      // 将用户相关信息保存到缓存
      const perms = await this.baseSysMenuService.getPerms(roleIds);
      // const departments = await this.baseSysDepartmentService.getByRoleIds(
      //   roleIds,
      //   user.username === 'admin'
      // );
      const departments='';
      await this.coolCache.set(
        `admin:department:${user.id}`,
        JSON.stringify(departments)
      );
      await this.coolCache.set(`admin:perms:${user.id}`, JSON.stringify(perms));
      await this.coolCache.set(`admin:token:${user.id}`, result.token);
      await this.coolCache.set(`admin:token:refresh:${user.id}`, result.token);

      return result;
    } else {
      throw new CoolCommException('验证码不正确');
    }
  }


  /**
   * 小程序获取手机号登录
   * @param loginFront
   */
   async getPhoneNumber(param:any) {
     console.log("------param------",param);
    const phoneJson= await this.wxUtils.getPhoneNumber(param);

    const phone=phoneJson.phoneNumber;

    const openId=phoneJson.openid;
    console.log("-----openId--------",  openId);
    const checkV=true;
    if (checkV) {
      let user = await this.baseSysUserEntity.findOne({ phone });
      // 校验用户
      if (user) {
        if(user.openid==null||user.openid.length<=1){
          // 更新openId上去
          user.openid=openId;
        //  let result=await this.baseSysUserEntity.update(user,{openid:openId});
        let result=await this.baseSysUserEntity.save(user);
          console.log("----更新openId----",JSON.stringify(result));
        }
        // // 校验用户状态及密码
        // if (user.status === 0 || user.password !== md5(password)) {
        //   throw new CoolCommException('账户或密码不正确~');
        // }
      } else {
        //  新用户注册
        let tmpUser={
          phone:phone,
          openid:openId
        }
        user =await  this.baseSysUserEntity.save(tmpUser);

        console.log("----save  user----phone  ----openId---",user);
      //  throw new CoolCommException('账户或密码不正确~');
      }
      // 校验角色
      // const roleIds = await this.baseSysRoleService.getByUser(user.id);
      // if (_.isEmpty(roleIds)) {
      //   throw new CoolCommException('该用户未设置任何角色，无法登录~');
      // }
       const roleIds ='';

      // 生成token
      const { expire, refreshExpire } = this.coolConfig.jwt.token;
      const result = {
        expire,
        token: await this.generateToken(user, roleIds, expire),
        phone:phone,
        user:user,
        refreshExpire,
        refreshToken: await this.generateToken(
          user,
          roleIds,
          refreshExpire,
          true
        ),
      };

      // 将用户相关信息保存到缓存
      const perms = await this.baseSysMenuService.getPerms(roleIds);
      // const departments = await this.baseSysDepartmentService.getByRoleIds(
      //   roleIds,
      //   user.username === 'admin'
      // );
      const departments='';
      await this.coolCache.set(
        `admin:department:${user.id}`,
        JSON.stringify(departments)
      );
      await this.coolCache.set(`admin:perms:${user.id}`, JSON.stringify(perms));
      await this.coolCache.set(`admin:token:${user.id}`, result.token);
      await this.coolCache.set(`admin:token:refresh:${user.id}`, result.token);

      return result;
    } else {
      throw new CoolCommException('验证码不正确');
    }
  }



  /**
   * 小程序获取sessionKey
   * @param code
   */
   async getSessionKey(param:any) {
    console.log("------param------",param);
   const sessionKeyJson= await this.wxUtils.getSessionKey(param);

// const phone=phoneJson.phoneNumber;
   return sessionKeyJson
 }


  /**
   * 验证码
   * @param type 图片验证码类型 svg
   * @param width 宽
   * @param height 高
   */
  async captcha(type: string, width = 150, height = 50) {
    // const svg = svgCaptcha.create({
    //   ignoreChars: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
    //    width,
    //    height,
    //   size:4,
    //   noise:0,
    //   color:false,
    //   background:'#aaa'

    // });
    const svg = svgCaptcha.create({
      size: 4, //验证码长度
      fontSize: 45, //验证码字号
      noise: 1, //干扰线条数目
      width: 110, //宽度
      height: 30, //高度
      color: true, //验证码字符是否有颜色，默认是没有，但是如果设置了背景颜色，那么默认就是有字符颜色
      background: '#fff' //beijing
  });
    const result = {
      captchaId: uuid(),
      data: svg.data.replace(/"/g, "'"),
    };
    //文字变白
    const rpList = [
      '#111',
      '#222',
      '#333',
      '#444',
      '#555',
      '#666',
      '#777',
      '#888',
      '#999',
    ];
    rpList.forEach(rp => {
      result.data = result.data['replaceAll'](rp, '#000');
    });
    if (type === 'base64') {
      result.data = svgToDataURL(result.data);
    }
    // 半小时过期
    await this.coolCache.set(
      `verify:img:${result.captchaId}`,
      svg.text.toLowerCase(),
      1800
    );
    return result;
  }

  /**
   * 退出登录
   */
  async logout() {
    const { userId } = this.ctx.admin;
    await this.coolCache.del(`admin:department:${userId}`);
    await this.coolCache.del(`admin:perms:${userId}`);
    await this.coolCache.del(`admin:token:${userId}`);
    await this.coolCache.del(`admin:token:refresh:${userId}`);
  }

  /**
   * 检验图片验证码
   * @param captchaId 验证码ID
   * @param value 验证码
   */
  async captchaCheck(captchaId, value) {
    const rv = await this.coolCache.get(`verify:img:${captchaId}`);
    if (!rv || !value || value.toLowerCase() !== rv) {
      return false;
    } else {
      this.coolCache.del(`verify:img:${captchaId}`);
      return true;
    }
  }

  /**
   * 生成token
   * @param user 用户对象
   * @param roleIds 角色集合
   * @param expire 过期
   * @param isRefresh 是否是刷新
   */
  async generateToken(user, roleIds, expire, isRefresh?) {
    await this.coolCache.set(
      `admin:passwordVersion:${user.id}`,
      user.passwordV
    );
    const tokenInfo = {
      isRefresh: false,
      roleIds,
      username: user.username,
      userId: user.id,
      passwordVersion: user.passwordV,
    };
    if (isRefresh) {
      tokenInfo.isRefresh = true;
    }
    return jwt.sign(tokenInfo, this.coolConfig.jwt.secret, {
      expiresIn: expire,
    });
  }

  /**
   * 刷新token
   * @param token
   */
  async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.coolConfig.jwt.secret);
      if (decoded && decoded['isRefresh']) {
        delete decoded['exp'];
        delete decoded['iat'];

        const { expire, refreshExpire } = this.coolConfig.jwt.token;
        decoded['isRefresh'] = false;
        const result = {
          expire,
          token: jwt.sign(decoded, this.coolConfig.jwt.secret, {
            expiresIn: expire,
          }),
          refreshExpire,
          refreshToken: '',
        };
        decoded['isRefresh'] = true;
        result.refreshToken = jwt.sign(decoded, this.coolConfig.jwt.secret, {
          expiresIn: refreshExpire,
        });
        await this.coolCache.set(
          `admin:passwordVersion:${decoded['userId']}`,
          decoded['passwordVersion']
        );
        return result;
      }
    } catch (err) {
      console.log(err);
      this.ctx.status = 401;
      this.ctx.body = {
        code: RESCODE.COMMFAIL,
        message: '登录失效~',
      };
      return;
    }
  }
}
