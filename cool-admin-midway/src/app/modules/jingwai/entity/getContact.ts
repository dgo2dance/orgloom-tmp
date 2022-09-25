import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 获取联系方式申请
 */
@CoolEntityCrud() 
@EntityModel('t_get_contacts')
export class getContactsEntity extends BaseEntity {
  
 
  @Column({ comment: '创建用户ID', type: 'bigint' ,nullable: true})
  userId: number;

  @Column({ comment: '创建用户名称' ,nullable: true })
  userName: string;

  @Column({ comment: 'freeID', type: 'bigint' ,nullable: true})
  freeId: number;

  @Column({ comment: 'free用户名称' ,nullable: true })
  freeName: string;

  @Column({ comment: '获取用户ID', type: 'bigint' ,nullable: true})
  toUserId: number;

  @Column({ comment: '获取用户名称' ,nullable: true })
  toUserName: string;

  @Column({ comment: '申请消息' ,nullable: true })
  apply: string;

  @Column({ comment: '备用1', nullable: true,  length: 3000 })
  back1: string;

  @Column({ comment: '备用2', nullable: true,  length: 1500 })
  back2: string;


}
