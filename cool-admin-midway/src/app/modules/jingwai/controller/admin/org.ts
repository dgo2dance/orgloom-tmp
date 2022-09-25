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
export class orgAdminController extends BaseController { 

  @Inject()
  orgService: OrgService;




  


}