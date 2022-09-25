import { Provide,Inject, Post,Body ,ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { getContactsEntity } from '../../entity/getContact';
import { getContactService} from '../../service/getContact';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: getContactsEntity,
  service:getContactService,

}
)
export class getContactController extends BaseController { 

  @Inject()
  sayService: getContactService;



   /**
   * 添加回复
   */
    @Post('/add', { summary: '添加回复' })
    async check(@Body(ALL) params: any) {
      console.log("----addComment----",params);
      return this.ok(await this.sayService.add(params))
  
 
    }
  


}