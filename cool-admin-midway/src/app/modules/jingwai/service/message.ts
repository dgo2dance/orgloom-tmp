import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, Cache, CoolTransaction } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, QueryRunner, SimpleConsoleLogger, Like } from 'typeorm';
import { CompanyEntity } from '../entity/company';
import { FollowEntity } from '../entity/follow';
import { FreeEntity } from '../entity/free';
import { MessageEntity } from '../entity/message';

import * as _ from 'lodash';
import { ICoolCache } from '@cool-midway/core';

/**
 * 消息
 */
@Provide()
export class MessageService extends BaseService {
  @InjectEntityModel(CompanyEntity)
  demoAppGoodsEntity: Repository<CompanyEntity>;


  @InjectEntityModel(FollowEntity)
  followEntity: Repository<FollowEntity>;

  @InjectEntityModel(MessageEntity)
  messageEntity: Repository<MessageEntity>;

  @InjectEntityModel(FreeEntity)
  freeEntity: Repository<FreeEntity>;
  
  
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


  /**
   * 
   * @param param 同意及拒绝消息
   * @returns 
   */
  async check(param) {
    console.log('~~check~~~list 被调用了~~~~~');
    console.log(param);

    const message=await this.messageEntity.find({id:param.id});

    const free =await this.freeEntity.find({id:message[0].freeId});
    await this.messageEntity.update({id:param.id},{statusClassify:1,resultClassify:param.result});

    let imessage;
    if(param.result==0){
      imessage='同意，对方联系方式为'+free[0].wechat;
    }else{
      imessage='拒绝';
    }

    // 新增回复消息
    const reply={
      userId:message[0].toUserId,
      userName:message[0].toUserName,
      toUserId:message[0].userId,
      toUserName:message[0].userName,
      message:'您申请获取的连系方式'+',提交消息为:'+message[0].message+',获取的连系人为:'+free[0].freeName+'已被对方处理 '+'处理结果为 '+imessage,
      title:'您申请获取的连系方式'+',提交消息为:'+message[0].message+',获取的连系人为:'+free[0].freeName+'已被对方处理 '+'处理结果为 '+imessage,
      relateMessageId:message[0].id,
      freeId:free[0].id,
      readClassify:1,
      messageClassify:0

    }

    await this.messageEntity.save(reply)

    return 'ok';

  }
  


  
}
