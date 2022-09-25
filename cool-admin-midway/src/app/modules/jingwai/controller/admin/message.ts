import { Provide,Inject, Post,Body ,ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { MessageEntity } from '../../entity/message';
import { MessageService} from '../../service/message';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: MessageEntity,
  service:MessageService,
  listQueryOp: {
    keyWordLikeFields: ['toUserId', 'userId','readClassify']
  },
}
)
export class MessageController extends BaseController { 

  @Inject()
  messageService: MessageService;



  /**
   * 处理消息
   */
      @Post('/check', { summary: '处理消息' })
      async check(@Body(ALL) params: any) {
        console.log("----check message----",params);
        return this.ok(await this.messageService.check(params))
    
   
      }
  


}