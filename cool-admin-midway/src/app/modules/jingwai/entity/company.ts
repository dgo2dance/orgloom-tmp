import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 公司基本信息
 */
@CoolEntityCrud({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  pageQueryOp: {
    keyWordLikeFields: ['name','introRemark']
  },
}


) 
@EntityModel('t_company')
export class CompanyEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '愿景',nullable: true, length: 1500  })
  visionRemark: string;

  @Column({ comment: '描述',nullable: true  })
  desc: string;

  @Column({ comment: 'Logo',nullable: true  })
  logoIcon: string;

  @Column({ comment: '网站',nullable: true  })
  website: string;

  @Column({ type: 'tinyint', comment: '行业 0-互联网 1-金融 2-制造 3-医疗 4-地产 5-其他',nullable: true })
  industryClassify: number;

  @Column({ type: 'tinyint', comment: '员工数目 0-1~50 1-50~200 2-200~1000 3-1000~10000 4-10000+', nullable: true })
  employeesClassify: number;

  @Column({ comment: '位置', nullable: true })
  address: string;

  @Column({ comment: '成立时间', nullable: true })
  begindate: Date;

  @Column({ type: 'int',comment: '关注数目', nullable: true })
  followCount: number;

  @Column({ type: 'tinyint', comment: '行业 0-首页不显示 1-首页显示',nullable: true })
  wxIndexSignClassify: number;

/**
 * 数据处理后 新增字段
 */

  @Column({ comment: '简写名称',nullable: true  })
  tmpName: string;

  @Column({ comment: '介绍',nullable: true ,length: 3000 })
  introRemark: string;

  @Column({ comment: '副标题',nullable: true, length: 1500  })
  subtitleRemark: string;

  @Column({ comment: '分类描述',nullable: true  })
  industryClassifyRemark: string;

  @Column({ type: 'int',comment: '员工数量', nullable: true })
  positionCount: number;

  @Column({ comment: '用户ID', type: 'bigint' ,nullable: true})
  userId: number;

  @Column({ comment: '用户名称' ,nullable: true,length: 1500  })
  userName: string;

  // @Column({ type: 'tinyint', comment: '是否推荐 0-推荐 1-不推荐',nullable: true })
  // suggestClassify: number;


}
