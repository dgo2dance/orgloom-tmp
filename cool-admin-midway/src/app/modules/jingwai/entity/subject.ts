import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 话题表
 */
@CoolEntityCrud() 
@EntityModel('t_subject')
export class SubjectEntity extends BaseEntity {
  

  @Column({ comment: '话题类型 0-话题  1-话题评论  2-评论回复  3-新闻爬取', nullable: true })
  typeClassify: number;

  @Column({ comment: '话题名字', nullable: true,  length: 300 })
  title: string;


  @Column({ comment: '公司ID', nullable: true })
  companyId: number;

  @Column({ comment: '公司名字', nullable: true })
  companyName: string;

  @Column({ comment: '创建用户ID', type: 'bigint' ,nullable: true})
  userId: number;

  @Column({ comment: '创建用户名称' ,nullable: true })
  userName: string;

  @Column({ comment: '认证描述', nullable: true })
  verifyRemark: string;

  @Column({ type: 'tinyint', comment: '认证状态 0-未通过 1-通过',nullable: true })
  verifyClassify: number;


  @Column({ comment: '备用1', nullable: true,  length: 3000 })
  back1: string;

  @Column({ comment: '备用2', nullable: true,  length: 1500 })
  back2: string;


}

