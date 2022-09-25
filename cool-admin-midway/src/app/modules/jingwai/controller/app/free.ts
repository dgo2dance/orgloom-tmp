import { Provide,Inject, Post,Body ,ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { FreeEntity } from '../../entity/free';
import { FreeService} from '../../service/free';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: FreeEntity,
  service:FreeService
}
)
export class freePublicController extends BaseController { 

  @Inject()
  freeService: FreeService;




    /**
   * 老版本的list查询
   */
     @Post('/listPass', { summary: '老版本的list查询' })
     async listPass(@Body(ALL) params: any) {
    
       return this.ok(await this.freeService.listPass(params))
   
  
     }


}