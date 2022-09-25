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
  service:FreeService,
  listQueryOp: {
    keyWordLikeFields: ['name', 'description'],
    fieldEq: ['userId']
  }
}
)
export class freeAdminController extends BaseController { 

  @Inject()
  freeService: FreeService;

  /**
   * 判断是否已经加入
   */
   @Post('/isAdd', { summary: '是否关注' })
   async isAdd(@Body() companyId: number) {
  
     return this.ok(await this.freeService.isAdd(companyId))
 
   }

   /**
   * 状态调整
   */
    @Post('/check', { summary: '调整状态' })
    async check(@Body(ALL) params: any) {
      console.log("----check----",params);
      return this.ok(await this.freeService.check(params))
  
 
    }


  


}