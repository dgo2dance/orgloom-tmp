import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 菜单
 */
@CoolEntityCrud() 
@EntityModel('t_org')
export class OrgEntity extends BaseEntity {
  @Column({ comment: '父组织ID', type: 'bigint', nullable: true })
  parentId: number;

  @Column({ comment: '当前组织名称',nullable: true  })
  name: string;

  @Column({ comment: '头像', nullable: true })
  profileIcon: string;

  @Column({ comment: '标签描述', nullable: true })
  tags: string;

  @Column({ comment: '职位描述', nullable: true })
  positionName: string;

  @Column({ comment: '部门', nullable: true })
  office: string;

  @Column({ comment: '图片', nullable: true })
  imageIcon: string;

  @Column({ comment: '区域', nullable: true })
  area: string;

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

/**
 * 数据处理后 新增字段
 */
  @Column({ comment: '介绍', nullable: true,  length: 3000 })
  introRemark: string;

  @Column({ comment: '职责', nullable: true,  length: 1500 })
  dutyRemark: string;

  @Column({ type: 'int',comment: '员工数量', nullable: true })
  subordinateCount: number;
}
