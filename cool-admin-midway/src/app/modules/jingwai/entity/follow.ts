import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 用户关注公司表
 */
// @CoolEntityCrud() 
@EntityModel('t_follow')
export class FollowEntity extends BaseEntity {
  @Column({ comment: '名称' ,nullable: true })
  name: string;

  @Column({ comment: '用户ID', type: 'bigint' })
  userId: number;

  @Column({ comment: '公司ID', type: 'bigint' })
  companyId: number;

  @Column({ comment: '公司名字',nullable: true })
  companyName: string;

  @Column({ comment: '备注',nullable: true  })
  remark: string;

}
