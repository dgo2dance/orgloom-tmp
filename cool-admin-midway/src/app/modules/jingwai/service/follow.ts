import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, Cache, CoolTransaction } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, QueryRunner } from 'typeorm';
import { CompanyEntity } from '../entity/company';
import { FollowEntity } from '../entity/follow';
import * as _ from 'lodash';
import { ICoolCache } from '@cool-midway/core';
import console = require('console');

/**
 * 关注
 */
@Provide()
export class FollowService extends BaseService {
  @InjectEntityModel(CompanyEntity)
  demoAppGoodsEntity: Repository<CompanyEntity>;


  @InjectEntityModel(FollowEntity)
  followEntity: Repository<FollowEntity>;

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
    console.log('~~~~~serive被调用了~~~~~');
    console.log(param.companyId);
    param.userId = this.ctx.admin.userId;
    // await this.nativeQuery(
    //   'delete from base_sys_user where departmentId in (?)',
    //   [ids]
    // );
    // 关注时 先判断是否已经有   如果有则删除    重新插入；
    if(!param.followed){
    await this.nativeQuery(
      'delete from t_follow where companyId = (?) and userId= (?)',
      [param.companyId, param.userId]
    );
    return;
    } else{
      await this.nativeQuery(
        'delete from t_follow where companyId = (?) and userId= (?)',
        [param.companyId, param.userId]
      );
    param.name=this.ctx.admin.username;
    const companyId=param.companyId;
    const company=await this.demoAppGoodsEntity.findOne(companyId);
    const newFollowCount=company.followCount+1;
    console.log("-----newFollowConut-----",newFollowCount);
    // 关注数量+1
    let result1=await this.demoAppGoodsEntity.update({id:company.id},{followCount:newFollowCount});
    param.companyName=company.name;
    console.log('---add follow ---after---',param);

    // const { category_id } = param;
    // if (category_id) {
      // const categories = await this.NewsCategoriesEntity.findOne(category_id);
      // console.log(categories);
      // categories.article_count = categories.article_count + 1;
      // await this.NewsCategoriesEntity.save(categories);
    // }

    return await super.add(param);
  }
  }
  /**
   * 判断是否已经关注
   * @param d 
   * @returns 
   */
  async isFollow(d){
  console.log('----is Follow----',d);
  const userId=this.ctx.admin.userId;
  const result= await this.followEntity.findOne({companyId:d,userId:userId});
  console.log(result);
   if(!_.isEmpty(result)){
      return true
   } else{
     return false 
   }
   

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
