import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 说说
 */
@CoolEntityCrud() 
@EntityModel('t_say_image')
export class SayImageEntity extends BaseEntity {
  
  @Column({ comment: '关联对象sayId', nullable: true })
  sayId: number;


  @Column({ comment: '图片', nullable: true })
  imageIcon: string;


  @Column({ comment: '公司ID', nullable: true })
  companyId: number;

  @Column({ comment: '公司名字', nullable: true })
  companyName: string;

  @Column({ comment: '创建用户ID', type: 'bigint' ,nullable: true})
  userId: number;

  @Column({ comment: '创建用户名称' ,nullable: true })
  userName: string;


  @Column({ comment: '备用1', nullable: true,  length: 3000 })
  back1: string;

  @Column({ comment: '备用2', nullable: true,  length: 1500 })
  back2: string;


}
