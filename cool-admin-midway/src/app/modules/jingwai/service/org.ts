import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, Cache, CoolTransaction } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, QueryRunner, SimpleConsoleLogger } from 'typeorm';
import { OrgEntity } from '../entity/org';
import { FollowEntity } from '../entity/follow';
import * as _ from 'lodash';
import { ICoolCache } from '@cool-midway/core';

/**
 * 关注
 */
@Provide()
export class OrgService extends BaseService {
  @InjectEntityModel(OrgEntity)
  demoAppGoodsEntity: Repository<OrgEntity>;


  @InjectEntityModel(FollowEntity)
  followEntity: Repository<FollowEntity>;

  @InjectEntityModel(OrgEntity)
  companyEntity: Repository<OrgEntity>;

  @Inject('cool:cache')
  coolCache: ICoolCache;

  /**
   * 返回所有数据
   */
  @Cache(5)
  async all() {
    return this.demoAppGoodsEntity.find();
  }
  


  async add(param) {
    console.log('~~~add~org~serive被调用了~~~~~',param);

    console.log('~~~add~org~serive被调用了~~~~userId~',this.ctx.admin.userId);
    param.userId = this.ctx.admin.userId;
   
    param.userName=this.ctx.admin.username;
   
    return await super.add(param);
  
  }


  // async page(query) {
  //     console.log('--this.ctx.----',this.ctx.dict.id);
  // }

  async listPass(param) {
    console.log('~~org~~~list 被调用了~~~~~');
    console.log(param);

    const sql = `
    SELECT
       a.*
    FROM
        t_org a
        where 1=1 
        ${this.setSql(true, 'and a.companyId = ?', param.orgId)} 
        ${this.setSql(true, 'and a.verifyClassify = ?', 1)} 
        `
        const result=await this.nativeQuery(sql);

        if (result) {
          result.forEach(d => {
            d.profileUrl=d.profileIcon;
            d.imageUrl=d.profileIcon;
          });
        }

        return result;
  }

  async list(param) {
    console.log('~~org~~~list 被调用了~~~~~');
    console.log(param);

    const sql = `
    SELECT
       a.*
    FROM
        t_org a
        where 1=1 
        ${this.setSql(true, 'and a.companyId = ?', param.orgId)} 
        `
        const result=await this.nativeQuery(sql);

        if (result) {
          result.forEach(d => {
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
