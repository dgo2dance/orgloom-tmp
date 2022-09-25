import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 积分
 */
@CoolEntityCrud() 
@EntityModel('t_points_record')
export class PointsRecordEntity extends BaseEntity {
  
 
  @Column({ comment: '积分改变', nullable: true })
  pointsChange: number;

  @Column({ type: 'tinyint', comment: '改变类型 0-添加 1-减少',nullable: true })
  pointsChangeClassify: number;

  @Column({ comment: '创建用户ID', type: 'bigint' ,nullable: true})
  userId: number;

  @Column({ comment: '创建用户名称' ,nullable: true })
  userName: string;

  @Column({ comment: '改变原因' ,nullable: true })
  reason: string;

  @Column({ comment: '备用1', nullable: true,  length: 3000 })
  back1: string;

  @Column({ comment: '备用2', nullable: true,  length: 1500 })
  back2: string;


}
