import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 说说
 */
@CoolEntityCrud() 
@EntityModel('t_say')
export class SayEntity extends BaseEntity {
  
  @Column({ comment: '目标对象ID', nullable: true })
  targetId: number;

  @Column({ comment: '目标用户ID', nullable: true })
  targetUserId: number;

  @Column({ comment: '目标用户名字', nullable: true })
  targetUserName: string;

  @Column({ comment: '实体类型 0-话题  1-话题评论  2-评论回复  3-新闻爬取', nullable: true })
  typeClassify: number;

  @Column({ comment: '内容', nullable: true,  length: 1500 })
  contents: string;

  @Column({ comment: '标题', nullable: true,  length: 300 })
  title: string;

  @Column({ comment: '链接地址', nullable: true,  length: 300 })
  link: string;

  @Column({ comment: '图片', nullable: true })
  imageIcon: string;


  @Column({ comment: '公司ID', nullable: true })
  companyId: number;

  @Column({ comment: '公司名字', nullable: true })
  companyName: string;

  @Column({ comment: '创建用户ID', type: 'bigint' ,nullable: true})
  userId: number;

  @Column({ comment: '话题ID', type: 'bigint' ,nullable: true})
  subjectId: number;

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

  @Column({ comment: '文章全内容', nullable: true, type: 'text'})
  allContents: string;


}

