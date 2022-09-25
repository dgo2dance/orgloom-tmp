import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { NewsArticlesEntity } from '../entity/articles';
import { NewsCategoriesEntity } from '../entity/categories';

/**
 * 描述
 */
@Provide()
export class NewsArticlesService extends BaseService {
  @InjectEntityModel(NewsArticlesEntity)
  NewsArticlesEntity: Repository<NewsArticlesEntity>;
  @InjectEntityModel(NewsCategoriesEntity)
  NewsCategoriesEntity: Repository<NewsCategoriesEntity>;
  /**
   * 重载新增接口
   */
  async add(param) {
    console.log('~~~~~follow serive被调用了');
    console.log(param);
    const { category_id } = param;
    if (category_id) {
      const categories = await this.NewsCategoriesEntity.findOne(category_id);
      console.log(categories);
      categories.article_count = categories.article_count + 1;
      await this.NewsCategoriesEntity.save(categories);
    }

    return await super.add(param);
  }


  async page(query) {
    console.log('~~~~~page serive被调用了');
    // console.log(param);
    // const { category_id } = param;
    // if (category_id) {
    //   const categories = await this.NewsCategoriesEntity.findOne(category_id);
    //   console.log(categories);
    //   categories.article_count = categories.article_count + 1;
    //   await this.NewsCategoriesEntity.save(categories);
    // }
    //         LEFT JOIN t_follow b ON a.id = b.companyId and b.userId=?
       // ${this.setSql(
        //   true,
        //   'LEFT JOIN t_follow b ON a.id = b.companyId and b.userId=（?）',
        //   [this.ctx.admin.userId]
        // )}

    const sql = `
    SELECT
       a.id,a.createTime,b.userId
    FROM
        t_company a
        LEFT JOIN 
         (select *  from  t_follow c where 1=1 
         ${this.setSql(true, 'and c.userId = ?', 40)} )
         b ON a.id = b.companyId
         `;
        const result=await this.sqlRenderPage(sql, query);
        if (result) {
          result.list.forEach(d => {
            if (d.userId==this.ctx.admin.userId) {
                d.followed=true
            } else{
              d.followed=false
            }
          });
        }
    return result;

  }
}
