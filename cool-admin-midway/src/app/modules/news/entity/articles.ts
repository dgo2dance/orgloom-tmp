import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 描述
 */
@EntityModel('news-articles')
export class NewsArticlesEntity extends BaseEntity {
  @Column({ comment: '作者ID' })
  user_id: number;
  @Column({ comment: '分类ID', nullable: true })
  category_id: number;
  @Column({ comment: '标题' })
  tiele: string;
  @Column({ comment: '文章内容', type: 'text' })
  content: string;
  @Column({ comment: '文章摘录', nullable: true })
  excerpt: string;
  @Column({
    comment: '文章状态：0 草稿箱 1 已发布',
    default: 0,
  })
  article_status: boolean;
  @Column({ comment: '阅读数量', default: 0 })
  view_count: number;
  @Column({ comment: '喜欢数、点赞数', default: 0 })
  like_count: number;
  @Column({ comment: '是否置顶', default: 0 })
  is_sticky: boolean;
  @Column({ comment: '阅读加精', default: 0 })
  is_essence: boolean;
  @Column({ comment: '评论状态：0 关闭 1 开放', default: 1 })
  comment_status: boolean;
  @Column({ comment: '评论数量', default: 0 })
  comment_count: number;
  @Column({ comment: '最后回复用户 id', nullable: true })
  last_comment_user_id: number;
}
