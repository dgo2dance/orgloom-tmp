import { CoolController, BaseController } from '@cool-midway/core';
import { FollowEntity } from '../../entity/follow';
import { CompanyEntity } from '../../entity/company';

import { FollowService} from '../../service/follow';
import { Body, Inject, Post,Get, Provide } from '@midwayjs/decorator';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: FollowEntity,
  service: FollowService,
  listQueryOp: {
    keyWordLikeFields: ['name', 'description'],
    fieldEq: ['a.userId'],
    select: ['b.*','a.userId AS userIda'],
    join: [
      {
        entity: CompanyEntity,
        alias: 'b',
        condition: 'a.companyId = b.id',
        type: 'leftJoin',
      },
    ],
  },
  
}
)
export class FollowController extends BaseController { 



  @InjectEntityModel(FollowEntity)
  followEntity: Repository<FollowEntity>;

  @Inject()
  followService: FollowService;

  /**
   * 获取是否已经关注
   */
  @Post('/isFollow', { summary: '是否关注' })
  async isFollow(@Body() companyId: number) {



    return this.ok(await this.followService.isFollow(companyId))


  
  }



}
