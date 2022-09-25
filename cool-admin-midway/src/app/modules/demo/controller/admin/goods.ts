import { Get, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
import { CoolController, BaseController, CoolUrlTag } from '@cool-midway/core';
import { DemoGoodsEntity } from '../../entity/goods';
import { SelectQueryBuilder } from 'typeorm';

/**
 * 商品
 */
@Provide()
@CoolController({
  // 添加通用CRUD接口
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  // 设置表实体
  entity: DemoGoodsEntity,
  // 向表插入当前登录用户ID
  insertParam: async (ctx: Context) => {
    return {
      userId: ctx.admin.userId,
    };
  },
  // 给请求路径打上标签
  urlTag: {
    name: 'ignoreToken',
    url: ['page'],
  },
  // info接口忽略价格字段
  infoIgnoreProperty: ['price'],
  // 分页查询配置
  pageQueryOp: {
    // 让title字段支持模糊查询
    keyWordLikeFields: ['title'],
    // 让type字段支持筛选
    fieldEq: ['type'],
    // 4.x 新增 追加其他条件
    extend: async (find: SelectQueryBuilder<DemoGoodsEntity>) => {
      find.groupBy('a.id');
    },
    // 增加其他条件
    where: async (ctx: Context) => {
      return [
        // 价格大于90
        ['a.price > :price', { price: 90.0 }],
      ];
    },
    // 添加排序
    addOrderBy: {
      // 排序字段及排序方式
      price: 'desc',
    },
  },
})
export class DemoAdminGoodsController extends BaseController {
  /**
   * 其他接口
   */
  @CoolUrlTag('ignoreToken')
  @Get('/other')
  async other() {
    return this.ok('hello, cool-admin!!!');
  }
}
