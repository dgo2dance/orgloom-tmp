import { Provide,Inject, Post,Body ,ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { OrgEntity } from '../../entity/org';
import { OrgService} from '../../service/org';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: OrgEntity,
  service:OrgService
}
)
export class OrgPublicController extends BaseController { 

  @Inject()
  orgService: OrgService;


  /**
   * 获取是否已经关注
   */
   @Post('/listPass', { summary: '获取已经审批通过的组织' })
   async listPass(@Body(ALL) params: any) {
  
     return this.ok(await this.orgService.listPass(params))
 

   }


}