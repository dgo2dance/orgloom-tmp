import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 菜单
 */
@CoolEntityCrud() 
@EntityModel('t_free')
export class FreeEntity extends BaseEntity {

  @Column({ comment: '头像', nullable: true })
  profileIcon: string;

  @Column({ comment: '用户ID', type: 'bigint' })
  userId: number;

  @Column({ comment: '用户名称' ,nullable: true })
  userName: string;

  @Column({ comment: '自由圈昵称' ,nullable: true })
  freeName: string;

  @Column({ type: 'tinyint', comment: '性别 0-男 1-女',nullable: true })
  sexClassify: number;

  @Column({ type: 'tinyint', comment: '学历 0-大专 1-本科 2-研究生 3-其他',nullable: true })
  eduClassify: number;

  @Column({ comment: '自我介绍',nullable: true  })
  introduceRemark: string;

  @Column({ comment: '微信号',nullable: true  })
  wechat: string;

  @Column({ comment: '对方要求',nullable: true  })
  youRemark: string;

  @Column({ comment: '出生日期', nullable: true })
  birthdayDate: Date;

  @Column({ comment: '公司ID', nullable: true })
  companyId: number;

  @Column({ comment: '城市', nullable: true })
  cityRemark: string;

  @Column({ comment: '省份', nullable: true })
  provinceRemark: string;

  @Column({ comment: '公司名字', nullable: true })
  companyName: string;

  @Column({ comment: '认证描述', nullable: true })
  verifyRemark: string;

  @Column({ comment: '认证状态 0-未通过 1-通过',nullable: true })
  verifyClassify: number;

  @Column({ comment: '兴趣 0-跑步 1-户外 2-摄影 3-绘画 4-其他',nullable: true })
  interestClassifys:string;

  @Column({comment: '目的 0-内推 1-技能交流 2-兴趣交流 3-单身交友 4-其他',nullable: true })
  goalsClassifys:string;


  @Column({ comment: '身高', type: 'bigint', nullable: true})
  height: number;

}
