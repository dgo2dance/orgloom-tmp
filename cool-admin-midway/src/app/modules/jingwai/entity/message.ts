import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 发送消息及用户消息
 */
@CoolEntityCrud() 
@EntityModel('t_message')
export class MessageEntity extends BaseEntity {
  
 
  @Column({ comment: '创建用户ID', type: 'bigint' ,nullable: true})
  userId: number;

  @Column({ comment: '创建用户名称' ,nullable: true })
  userName: string;

  @Column({ comment: '获取用户ID', type: 'bigint' ,nullable: true})
  toUserId: number;

  @Column({ comment: '获取用户名称' ,nullable: true })
  toUserName: string;

  @Column({ comment: '发送消息内容' ,nullable: true })
  message: string;

  @Column({ comment: '消息标题' ,nullable: true })
  title: string;

  @Column({ comment: '关联单据ID', type: 'bigint' ,nullable: true})
  relateId: number;

  @Column({ comment: '关联消息ID', type: 'bigint' ,nullable: true})
  relateMessageId: number;

  @Column({ comment: '连系人ID', type: 'bigint' ,nullable: true})
  freeId: number;

  @Column({ type: 'tinyint', comment: '已读类型 0-已读 1-未读',nullable: true })
  readClassify: number;

  @Column({ type: 'tinyint', comment: '状态 0-未处理 1-已处理',nullable: true })
  statusClassify: number;

  @Column({ type: 'tinyint', comment: '结果 0-同意 1-拒绝',nullable: true })
  resultClassify: number;

  @Column({ type: 'tinyint', comment: 'message类型 0-获取联系方式 1-评论 2-新内容推送',nullable: true })
  messageClassify: number;

  @Column({ comment: '备用1', nullable: true,  length: 3000 })
  back1: string;

  @Column({ comment: '备用2', nullable: true,  length: 1500 })
  back2: string;


}
