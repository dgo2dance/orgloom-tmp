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
export class AdviseService extends BaseService {
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
  

  // async page(query) {
  //     console.log('--this.ctx.----',this.ctx.dict.id);
  // }

  


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
