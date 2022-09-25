import {
  Provide,
  Body,
  ALL,
  Inject,
  Post,
  Get,
  Query,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { CoolController, BaseController } from '@cool-midway/core';
import { LoginDTO } from '../../dto/login';
import { BaseSysLoginService } from '../../service/sys/login';
import { BaseSysParamService } from '../../service/sys/param';
import { BaseSysUserEntity } from '../../entity/sys/user';
import { BaseSysUserService } from '../../service/sys/user';
/**
 * 不需要登录的后台接口
 */
@Provide()
@CoolController()
export class BaseOpenController extends BaseController {
  @Inject()
  baseSysLoginService: BaseSysLoginService;

  @Inject()
  baseSysParamService: BaseSysParamService;

  @Inject()
  baseSysUserService: BaseSysUserService;

  @Inject()
  ctx: Context;

  @Inject('cool:eps:open')
  eps;

  /**
   * 实体信息与路径
   * @returns
   */
  @Get('/eps', { summary: '实体信息与路径' })
  public async getEps() {
    return this.ok(this.eps);
  }

  /**
   * 根据配置参数key获得网页内容(富文本)
   */
  @Get('/html', { summary: '获得网页内容的参数值' })
  async htmlByKey(@Query() key: string) {
    this.ctx.body = await this.baseSysParamService.htmlByKey(key);
  }

  /**
   * 登录
   * @param login
   */
  @Post('/login', { summary: '登录' })
  async login(@Body(ALL) login: LoginDTO) {
    return this.ok(await this.baseSysLoginService.login(login));
  }

    /**
   * 前台登录
   * @param login
   */
  @Post('/loginFront', { summary: '前台登录' })
  async loginFront(@Body(ALL) login: LoginDTO) {
    return this.ok(await this.baseSysLoginService.loginFront(login));
  }


  /**
   * 小程序获取手机号登录
   * @param login
   */
  @Post('/getPhoneNumber', { summary: '小程序获取手机号' })
  async getPhoneNumber(@Body(ALL) param: any) {
    return this.ok(await this.baseSysLoginService.getPhoneNumber(param));
  }

    /**
   * 小程序首先获取sessionKey
   * @param login
   */
     @Post('/getSessionKey', { summary: '小程序首先获取sessionKey' })
     async getSessionKey(@Body(ALL) param: any) {
       return this.ok(await this.baseSysLoginService.getSessionKey(param.code));
     }


  /**
   * 前台用户注册
   * @param register
   */
   @Post('/register', { summary: '注册' })
   async register(@Body(ALL) user: BaseSysUserEntity) {
     user.remark='前台';
     return this.ok(await this.baseSysUserService.addFront(user));
   }

     /**
   * 前台用户查询
   * @param userInfo
   */
    @Post('/userInfo', { summary: '前台用户信息查询' })
    async userInfo(@Body(ALL) user: BaseSysUserEntity) {
      return this.ok(await this.baseSysUserService.addFront(user));

      
    }


      /**
   * 设置用户名
   * @param userInfo
   */
       @Post('/updateUserName', { summary: '前台用户信息查询' })
       async updateUserName(@Body(ALL) user: BaseSysUserEntity) {
         return this.ok(await this.baseSysUserService.updateUserName(user));
   
         
       }


  /**
   * 获得验证码
   */
  @Get('/captcha', { summary: '验证码' })
  async captcha(
    @Query() type: string,
    @Query() width: number,
    @Query() height: number
  ) {
    return this.ok(await this.baseSysLoginService.captcha(type, width, height));
  }

  /**
   * 刷新token
   */
  @Get('/refreshToken', { summary: '刷新token' })
  async refreshToken(@Query() refreshToken: string) {
    return this.ok(await this.baseSysLoginService.refreshToken(refreshToken));
  }
}
