import { Provide,Inject, Post,Body ,ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { SayEntity } from '../../entity/say';
import { SayService} from '../../service/say';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: SayEntity,
  service:SayService,
  pageQueryOp: {
    keyWordLikeFields: ['name', 'description'],
    fieldEq: ['companyId','userId','typeClassify','contents']
  }
}
)
export class sayAdminController extends BaseController { 

  @Inject()
  sayService: SayService;



   /**
   * 添加回复
   */
    @Post('/addComment', { summary: '添加回复' })
    async check(@Body(ALL) params: any) {
      console.log("----addComment----",params);
      return this.ok(await this.sayService.add(params))
  
 
    }
  


}