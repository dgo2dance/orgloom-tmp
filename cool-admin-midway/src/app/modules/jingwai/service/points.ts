import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, Cache, CoolTransaction,  CoolCommException} from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, QueryRunner, SimpleConsoleLogger } from 'typeorm';
import { SayEntity } from '../entity/say';
import { PointsEntity } from '../entity/points';
import { MessageEntity } from '../entity/message';
import { FreeEntity } from '../entity/free';
import { PointsRecordEntity } from '../entity/pointsRecord';




import { FollowEntity } from '../entity/follow';
import * as _ from 'lodash';
import { ICoolCache } from '@cool-midway/core';

/**
 * 关注
 */
@Provide()
export class PointsService extends BaseService {
  @InjectEntityModel(SayEntity)
  demoAppGoodsEntity: Repository<SayEntity>;


  @InjectEntityModel(FollowEntity)
  followEntity: Repository<FollowEntity>;


  @InjectEntityModel(PointsEntity)
  pointsEntity: Repository<PointsEntity>;

  @InjectEntityModel(PointsRecordEntity)
  pointsRecordEntity: Repository<PointsRecordEntity>;


  @InjectEntityModel(MessageEntity)
  messageEntity: Repository<MessageEntity>;

  @InjectEntityModel(FreeEntity)
  freeEntity: Repository<FreeEntity>;

  @InjectEntityModel(SayEntity)
  sayEntity: Repository<SayEntity>;

  @Inject('cool:cache')
  coolCache: ICoolCache;

 
  

  /**
   * 
   * @param param 获取我的积分
   * @returns 
   */
  async myPoints(param) {
    console.log('~~~get~myPoints~serive被调用了~~~~~',param);

    console.log('~~~get~myPoints~serive被调用了~~~~~userId~',this.ctx.admin.userId);


    param.userId = this.ctx.admin.userId;



    const points = await this.pointsEntity.find({
      userId: param.userId 
    })

    // 积分不够
    if((points!=null&&points.length<=0)||points==null){
      console.log("------points-------",points);
      const tmpPoints={
        points:0
      }
      return tmpPoints;
    }
   
    return points[0];
  
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
