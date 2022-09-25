import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, Cache, CoolTransaction } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, QueryRunner, SimpleConsoleLogger } from 'typeorm';
import { OrgEntity } from '../entity/org';
import { FreeEntity } from '../entity/free';
import * as _ from 'lodash';
import { ICoolCache } from '@cool-midway/core';
import { WechatAppPush } from '../../../wx/wechatTemplate';
import { BaseSysUserEntity } from '../../base/entity/sys/user';

/**
 * 关注
 */
@Provide()
export class FreeService extends BaseService {
  @InjectEntityModel(OrgEntity)
  demoAppGoodsEntity: Repository<OrgEntity>;

  @InjectEntityModel(BaseSysUserEntity)
  baseSysUserEntity: Repository<BaseSysUserEntity>;


  @InjectEntityModel(FreeEntity)
  freeEntity: Repository<FreeEntity>;

  @InjectEntityModel(OrgEntity)
  companyEntity: Repository<OrgEntity>;

  @Inject('cool:cache')
  coolCache: ICoolCache;

  @Inject()
  wechatAppPush: WechatAppPush;

  /**
   * 返回所有数据
   */
  @Cache(5)
  async all() {
    return this.demoAppGoodsEntity.find();
  }
  

  async add(param) {
    console.log('~~~add~free~serive被调用了~~~~~');
    console.log(param.companyId);
    console.log('~~~add~free~serive被调用了~~~~userId~',this.ctx.admin.userId);
    param.userId = this.ctx.admin.userId;
   
    param.userName=this.ctx.admin.username;
    param.profileIcon=''
   
    return await super.add(param);
  
  }

  /**
   * 进行审核按钮，更新并发送消息
   * @param param 
   * @returns 
   */
  async check(param) {
    console.log('~~~~free~---check~~~~~~~serive被调用了~~~~~');
    console.log(param.id);
    const result= await this.freeEntity.findOne({id:param.id});

    // 设置状态为审核通过
    result.verifyClassify=1

    // 保存
    let tmpResult = await this.freeEntity.save(result);

    const user =await this.baseSysUserEntity.findOne({id:result.userId});
    // 发送消息提醒
    const paramSend={
      touser:user.openid,
      template_id:'-uEplpA5bcaN8hj-8pj4FBLHtJTlT39FKmrVLDKCwJ8',
      page:'pages/index/index',
      data:{
        thing3:{"value":"你提交的内容已经审核"} ,
        thing2:{"value":"加入分享的:"+result.freeName+"已经审核通过"},
        thing4:{"value":"请点击查看"}
      }
    };
    const resultSend= await this.wechatAppPush.sendXiaoChengXuMsg(paramSend);


    param.userId = this.ctx.admin.userId;
   
    param.userName=this.ctx.admin.username;
  //  param.profileIcon=''
   
    return true;
  
  }


    /**
   * 判断是否已经加入
   * @param d 
   * @returns 
   */
     async isAdd(d){
      console.log('----is Add----',d);
      const userId=this.ctx.admin.userId;
      const result= await this.freeEntity.findOne({companyId:d,userId:userId});
      console.log(result);
       if(!_.isEmpty(result)){
          return true
       } else{
         return false 
       }
       
    
    }

  // async page(query) {
  //     console.log('--this.ctx.----',this.ctx.dict.id);
  // }

  async listPass(param) {
    console.log('~~free~~~list 被调用了~~~~~');
    console.log(param);

    const sql = `
    SELECT
       a.*
    FROM
        t_free a
        where 1=1 
        ${this.setSql(true, 'and a.companyId = ?', param.orgId)} 
        ${this.setSql(true, 'and a.verifyClassify = ?', 1)} 

        order by createTime desc
        `
        const result=await this.nativeQuery(sql);

        if (result) {
          result.forEach(d => {
            // 暂时写死
            d.profileIcon='https://www.orgloom.cc/uploads/20220318/71973720-a651-11ec-bf6c-5fadf1c454c5.png';
            d.profileUrl=d.profileIcon;
            d.imageUrl=d.profileIcon;
          });
        }

        return result;
  }
  

  /**
   * 分页查询
   * @param query
   */
   async pageIsFollow(params) {

    
     console.log('-----company  List   Page-----',params);
     // const { keyWord, status, departmentIds = [] } = query;

     const sql = `
     SELECT
        a.id,a.createTime,a.name,a.desc,a.logoIcon,a.visionRemark,b.userId
     FROM
         t_company a
         LEFT JOIN 
          (select *  from  t_follow c where 1=1 
          ${this.setSql(true, 'and c.userId = ?', 40)} )
          b ON a.id = b.companyId
          `;
         const result=await this.sqlRenderPage(sql, params);
         if (result) {
           result.list.forEach(d => {
             if (d.userId==this.ctx.admin.userId) {
                 d.followed=true
             } else{
               d.followed=false
             }
           });
         }
     return result;
 
   }
  


  /**
   * 事务
   * @param params
   * @param queryRunner
   */
  @CoolTransaction({ isolation: 'SERIALIZABLE' })
  async testTransaction(params: any, queryRunner?: QueryRunner) {
    // await queryRunner.manager.insert<DemoGoodsEntity>(DemoGoodsEntity, {
    //   title: '这是个商品',
    //   pic: '商品图',
    //   price: 99.0,
    //   type: 1,
    // });
  }
}
