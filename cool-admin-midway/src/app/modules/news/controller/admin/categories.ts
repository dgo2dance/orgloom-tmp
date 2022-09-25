import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { NewsCategoriesEntity } from '../../entity/categories';
/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: NewsCategoriesEntity,
  pageQueryOp: {
    keyWordLikeFields: ['name', 'description'],
    fieldEq: ['name', 'description'],
  },
})
export class NewsAdminCategoriesController extends BaseController { }
