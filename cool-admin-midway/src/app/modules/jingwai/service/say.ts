import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, Cache, CoolTransaction } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, QueryRunner, SimpleConsoleLogger } from 'typeorm';
import { SayEntity } from '../entity/say';
import { FollowEntity } from '../entity/follow';
import * as _ from 'lodash';
import { ICoolCache } from '@cool-midway/core';

/**
 * 关注
 */
@Provide()
export class SayService extends BaseService {
  @InjectEntityModel(SayEntity)
  demoAppGoodsEntity: Repository<SayEntity>;


  @InjectEntityModel(FollowEntity)
  followEntity: Repository<FollowEntity>;

  @InjectEntityModel(SayEntity)
  sayEntity: Repository<SayEntity>;

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

  async info(param) {
    console.log('~~~info~say~serive被调用了~~~~~',param);

    const result=await super.info(param);
   
    if (result) {
      const sqlTmp = `
    SELECT
       a.*
    FROM
        t_say_image a
        where 1=1 
        ${this.setSql(true, 'and a.sayId = ?', result.id)} 
        `
        const resultNew=await this.nativeQuery(sqlTmp);
    
        result.images=resultNew;

      
      // result.forEach(d => {

     
      //   d.profileUrl=d.profileIcon;
      //   d.imageUrl=d.profileIcon;
      // });
    }

    return result;
  
  }

  /**
   * 
   * @param param 添加回复
   * @returns 
   */
  // async addComment(param) {
  //   console.log('~~~add~comment~serive被调用了~~~~~',param);

  //   console.log('~~~add~comment~serive被调用了~~~~userId~',this.ctx.admin.userId);
  //   param.userId = this.ctx.admin.userId;
   
  //   param.userName=this.ctx.admin.username;
   
  //   return await this.sayEntity.create(param);
  
  // }


  // async page(query) {
  //     console.log('--this.ctx.----',this.ctx.dict.id);
  // }

  async listComment(param) {
    console.log('~~say~~~list ~~~comment被调用了~~~~~');
    console.log(param);

    const sql = `
    SELECT
       a.*
    FROM
        t_say a
        where 1=1 
        ${this.setSql(true, 'and a.targetId = ?', param.targetId)} 
        ${this.setSql(true, 'and a.typeClassify = ?', 1)} 
        `
        const result=await this.nativeQuery(sql);

        if (result) {
          for (var i=0;i<result.length;i++){
            const d=result[i];
            const sqlTmp = `
            SELECT
               a.*
            FROM
                t_say a
                where 1=1 
                ${this.setSql(true, 'and a.targetId = ?', d.id)} 
                ${this.setSql(true, 'and a.typeClassify = ?', 2)} 
                `
                const resultNew=await this.nativeQuery(sqlTmp);
                result[i].replys=resultNew;

          }
          // result.forEach(d => {

         
          //   d.profileUrl=d.profileIcon;
          //   d.imageUrl=d.profileIcon;
          // });
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
   async page(params) {

      const option={
        keyWordLikeFields: ['name', 'description'],
        fieldEq: ['companyId','userId','typeClassify','contents']
      };

       const result = await super.page(params,option);

       for (var i=0; i<result.list.length; i++){
        const d=result.list[i];
        const sqlTmp = `
        SELECT
           a.*
        FROM
            t_say_image a
            where 1=1 
            ${this.setSql(true, 'and a.sayId = ?', d.id)} 
            `
            const resultNew=await this.nativeQuery(sqlTmp);
        
            result.list[i].images=resultNew;
            
       }
       return result;
 
   }



  /**
   * 分页查询
   * @param query
   */
   async pageIndex(params) {

    
    console.log('-----say   Page---index--uuuuu------',params);
    // const { keyWord, status, departmentIds = [] } = query;

    console.log('--company  List   Page---iiiii-industryClassify--',params.industryClassify!=-1&&params.industryClassify!=''&&params.industryClassify!=null&&params.industryClassify!=undefined);

    let sql=''
    if(params.catId==1){
    sql = `
    SELECT
    a.*
        FROM
        t_say a
        left join t_company b
        on a.companyId=b.id
        where 1=1
        and b.wxIndexSignClassify=1

        order by createTime desc
        `;
    } else if(params.catId==0){

    //  const sql1= `select companyId  from   t_follow  where 1=1 
    //  ${this.setSql(true, 'and userId = ?', this.ctx.admin.userId)}  `;
    //   const company=await this.nativeQuery(sql1);

    //   console.log("----company-----",company);

      sql= `
      SELECT
      a.*
          FROM
          t_say a
          where 1=1
          and a.companyId in (
            select companyId  from   t_follow  where 1=1 
            ${this.setSql(true, 'and userId = ?', params.userId)}
          )
          order by createTime desc

          `;
    }

     
        // LEFT JOIN 
        //  (select *  from  t_follow c where 1=1 
        //  ${this.setSql(true, 'and c.userId = ?', this.ctx.admin.userId)} )
        //  b ON a.id = b.companyId
        //  `;
        const result=await this.sqlRenderPage(sql, params,true);

        for (var i=0; i<result.list.length; i++){
          const d=result.list[i];
          const sqlTmp = `
          SELECT
             a.*
          FROM
              t_say_image a
              where 1=1 
              ${this.setSql(true, 'and a.sayId = ?', d.id)} 
              `
              const resultNew=await this.nativeQuery(sqlTmp);
          
              result.list[i].images=resultNew;
              
         }

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
