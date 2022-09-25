import { Provide,Inject, Post,Body ,ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { AdviseEntity } from '../../entity/advise';
import { AdviseService} from '../../service/advise';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: AdviseEntity,
  service:AdviseService
}
)
export class AdvisePublicController extends BaseController { 

  @Inject()
  adviseService: AdviseService;



}