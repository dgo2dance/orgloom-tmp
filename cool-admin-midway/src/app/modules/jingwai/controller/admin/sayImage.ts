import { Provide,Inject, Post,Body ,ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { SayImageEntity } from '../../entity/sayImage';
import { SayImageService} from '../../service/sayImage';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: SayImageEntity,
  service:SayImageService
}
)
export class sayImageController extends BaseController { 

  @Inject()
  sayImageService: SayImageService;




  


}