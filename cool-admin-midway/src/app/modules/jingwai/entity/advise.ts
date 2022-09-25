import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 菜单
 */
@CoolEntityCrud() 
@EntityModel('t_advise')
export class AdviseEntity extends BaseEntity {
  @Column({ comment: '组织ID', type: 'bigint', nullable: true })
  orgId: number;

  @Column({ comment: '当前组织名称',nullable: true  })
  orgName: string;

  @Column({ comment: '公司ID', type: 'bigint', nullable: true })
  companyId: number;

  @Column({ comment: '公司名称',nullable: true  })
  companyName: string;


  @Column({ type: 'tinyint', comment: '建议分类 0-不知道 1-此人已不在这个公司 2-就是我请求移除 3-其他', nullable: true })
  adviseClassify: number;

  @Column({ type: 'tinyint', comment: '处理分类 0-未处理 1-处理中 2-已处理 3-其他', nullable: true })
  setClassify: number;

  @Column({ comment: '描述',nullable: true  })
  adviseRemark: string;

  @Column({ comment: '处理描述',nullable: true  })
  setRemark: string;

}
