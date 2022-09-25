import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, Index } from 'typeorm';

/**
 * 系统用户
 */
@EntityModel('base_sys_user')
export class BaseSysUserEntity extends BaseEntity {
  @Index()
  @Column({ comment: '部门ID', type: 'bigint', nullable: true })
  departmentId: number;

  @Column({ comment: '姓名', nullable: true })
  name: string;

  @Column({ comment: '用户名', length: 100, nullable: true })
  username: string;

  @Column({ comment: '密码', nullable: true })
  password: string;

  @Column({
    comment: '密码版本, 作用是改完密码，让原来的token失效',
    default: 1,
  })
  passwordV: number;

  @Column({ comment: '昵称', nullable: true })
  nickName: string;

  @Column({ comment: '头像', nullable: true })
  headImg: string;

  @Index()
  @Column({ comment: '手机', nullable: true, length: 20 })
  phone: string;

  @Column({ comment: '微信平台openid', nullable: true,length: 100})
  openid: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
  status: number;

  @Column({ comment: '前台 0:前台 1：后台', default: 0, type: 'tinyint' })
  typeStatus: number;


  // 部门名称
  departmentName: string;
  // 角色ID列表
  roleIdList: number[];

  @Column({ comment: 'socketId', nullable: true })
  socketId: string;
}
