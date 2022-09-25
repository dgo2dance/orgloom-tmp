import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { NewsArticlesEntity } from '../../entity/articles';
import { NewsArticlesService } from '../../service/articles';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: NewsArticlesEntity,
  service: NewsArticlesService,
  // 向表插入当前登录用户ID
  insertParam: ctx => {
    // console.log('-----ctx.admin is :', ctx.admin);
    return {
      // 获得当前登录的后台用户ID，需要请求头传Authorization参数
      user_id: ctx.admin.userId,
    };
  },
})
export class NewsAdminArticlesController extends BaseController {}
