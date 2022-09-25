import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, Cache, CoolTransaction } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, QueryRunner, SimpleConsoleLogger, Like } from 'typeorm';
import { CompanyEntity } from '../entity/company';
import { FollowEntity } from '../entity/follow';
import * as _ from 'lodash';
import { ICoolCache } from '@cool-midway/core';

/**
 * 关注
 */
@Provide()
export class CompanyService extends BaseService {
  @InjectEntityModel(CompanyEntity)
  demoAppGoodsEntity: Repository<CompanyEntity>;


  @InjectEntityModel(FollowEntity)
  followEntity: Repository<FollowEntity>;

  @InjectEntityModel(CompanyEntity)
  companyEntity: Repository<CompanyEntity>;

  @Inject('cool:cache')
  coolCache: ICoolCache;

  /**
   * 返回所有数据
   */
  @Cache(5)
  async all() {
    return this.demoAppGoodsEntity.find();
  }
  

  // async page(query) {
  //     console.log('--this.ctx.----',this.ctx.dict.id);
  // }

  /**
   * 添加公司
   * @param param 
   * @returns 
   */
  async add(param) {
    console.log('~~~add~company~serive被调用了~~~~~');
    console.log(param.companyId);
    console.log('~~~add~company~serive被调用了~~~~userId~',this.ctx.admin.userId);
    param.userId = this.ctx.admin.userId;
   
    param.userName=this.ctx.admin.username;
   
    return await super.add(param);
  
  }



  /**
   * 分页查询
   * @param query
   */
   async pageIsFollow(params) {

    
     console.log('-----company  List   Page-isFollow----',params);
     // const { keyWord, status, departmentIds = [] } = query;

     const sql = `
     SELECT
        a.id,a.createTime,a.name,a.desc,a.logoIcon,a.visionRemark,b.userId
     FROM
         t_company a
         LEFT JOIN 
          (select *  from  t_follow c where 1=1 
          ${this.setSql(true, 'and c.userId = ?', this.ctx.admin.userId)} )
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
   * 分页查询
   * @param query
   */
   async page(params) {

    
    console.log('-----company  List   Page---iiiii--uuuuu------',params);
    // const { keyWord, status, departmentIds = [] } = query;

    console.log('--company  List   Page---iiiii-industryClassify--',params.industryClassify!=-1&&params.industryClassify!=''&&params.industryClassify!=null&&params.industryClassify!=undefined);

    const sql = `
    SELECT
       a.id,a.createTime,a.name,a.desc,a.logoIcon,a.visionRemark,a.followCount
    FROM
        t_company a
        where 1=1
        ${this.setSql(params.industryClassify!=-1&&params.industryClassify!=''&&params.industryClassify!=null&&params.industryClassify!=undefined, 'and a.industryClassify = ?', params.industryClassify)} 
        ${this.setSql(params.industryClassify==0, 'and a.industryClassify = ?', params.industryClassify)} 
        order by wxIndexSignClassify,industryClassify desc
        `;
        
        // LEFT JOIN 
        //  (select *  from  t_follow c where 1=1 
        //  ${this.setSql(true, 'and c.userId = ?', this.ctx.admin.userId)} )
        //  b ON a.id = b.companyId
        //  `;
        const result=await this.sqlRenderPage(sql, params,true);
        // if (result) {
        //   result.list.forEach(d => {
        //     if (d.userId==this.ctx.admin.userId) {
        //         d.followed=true
        //     } else{
        //       d.followed=false
        //     }
        //   });
        // }
    return result;

  }





  /**
   * 搜索查询
   * @param query
   */
   async search(params) {

    
    console.log('-----company  List   search---iiiii--',params);
    let key="%"+params.key+"%"
    const result=await this.companyEntity.find({
                                                name:Like(key)
                                              })

    const sql = `
    SELECT
       a.id,a.createTime,a.name,a.desc,a.logoIcon,a.visionRemark,a.followCount
    FROM
        t_company a
        where 1=1
        ${this.setSql(true, "and a.name like '%?%'", params.key)} 
        `;
        
        // LEFT JOIN 
        //  (select *  from  t_follow c where 1=1 
        //  ${this.setSql(true, 'and c.userId = ?', this.ctx.admin.userId)} )
        //  b ON a.id = b.companyId
        //  `;
      //  const result=await this.nativeQuery(sql);

        // if (result) {
        //   result.list.forEach(d => {
        //     if (d.userId==this.ctx.admin.userId) {
        //         d.followed=true
        //     } else{
        //       d.followed=false
        //     }
        //   });
        // }
    return result;

  }



  /**
   * 搜索查询
   * @param query
   */
   async indexPage(params) {

    
    console.log('-----company  List   search---iiiii--',params);


    const sql = `
    SELECT
       a.id,a.createTime,a.name,a.desc,a.logoIcon,a.visionRemark,a.followCount
    FROM
        t_company a
        where 1=1
         and wxIndexSignClassify=1
        `;
        const result=await this.sqlRenderPage(sql, params);

        
        // LEFT JOIN 
        //  (select *  from  t_follow c where 1=1 
        //  ${this.setSql(true, 'and c.userId = ?', this.ctx.admin.userId)} )
        //  b ON a.id = b.companyId
        //  `;
      //  const result=await this.nativeQuery(sql);

        // if (result) {
        //   result.list.forEach(d => {
        //     if (d.userId==this.ctx.admin.userId) {
        //         d.followed=true
        //     } else{
        //       d.followed=false
        //     }
        //   });
        // }
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
