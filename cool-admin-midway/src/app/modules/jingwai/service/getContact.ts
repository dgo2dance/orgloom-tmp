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
export class getContactService extends BaseService {
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
   * @param param 获取连系人接口
   * @returns 
   */
  async add(param) {
    console.log('~~~get~contact~serive被调用了~~~~~',param);

    console.log('~~~get~contact~serive被调用了~~~~~userId~',this.ctx.admin.userId);


    param.userId = this.ctx.admin.userId;

    param.userName=this.ctx.admin.username;


    const points = await this.pointsEntity.find({
      userId: param.userId 
    })

    // 积分不够
    if((points!=null&&points.length<=0)||(points!=null&&points.length>0&&points[0].points<100)){
      console.log("------points-------",points);
      throw new CoolCommException('积分不足，可以去我的积分页面，获取或者购买积分');
    }
   
    // 积分够的情况下   添加消息   然后减少积分
    // 保存这条记录
    const getContacts=await super.add(param);
    const getContactId=JSON.parse(JSON.stringify(getContacts)).id;
    // 保存消息
    const free = await this.freeEntity.find({
      id: param.freeId 
    })
    const message={
      userId:param.userId,
      userName:param.userName,
      toUserId:free[0].userId,
      toUserName:free[0].userName,
      message:param.userName+'申请获取你的连系方式'+',提交消息为:'+param.message+',获取的连系人为:'+free[0].freeName,
      title:param.userName+'申请获取你的连系方式'+',提交消息为:'+param.message,
      relateId:getContactId,
      freeId:free[0].id,
      readClassify:1,
      messageClassify:0
    }

    await this.messageEntity.save(message);

    // 增加积分记录
    const pointsRecord={
      pointsChange:100,
      pointsChangeClassify:1,
      userId:param.userId,
      userName:param.userName,
      reason:'申请获取连系人连系方式减少'
    }

    await this.pointsRecordEntity.save(pointsRecord);

    // 减少积分
    await this.pointsEntity.update({userId: param.userId },{points:points[0].points-100});

    return 'ok' ;
  
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
