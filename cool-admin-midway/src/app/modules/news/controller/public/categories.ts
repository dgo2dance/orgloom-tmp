import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { NewsCategoriesEntity } from '../../entity/categories';
/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['info', 'list', 'page'],
  entity: NewsCategoriesEntity,
  urlTag: {
    name: 'ignoreToken',
    url: ['add'],
  }
  // {
  //   middleware: [],
  // }
})

export class NewsPublicCategoriesController extends BaseController { }
