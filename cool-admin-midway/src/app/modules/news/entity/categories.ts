import { EntityModel } from '@midwayjs/orm';
import { BaseEntity,CoolEntityCrud} from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 新闻分类
 */
@EntityModel('news-categories')
export class NewsCategoriesEntity extends BaseEntity {
  @Column({ comment: '类别名称' })
  name: string;

  @Column({ comment: '类别描述' })
  description: string;

  @Column({ comment: '类别图标地址' })
  icon: string;

  @Column({ comment: '类别显示顺序', nullable: true })
  sort: number;

  @Column({ comment: '该类别下文章数量', nullable: true })
  article_count: number;
}
