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
export class SayPublicController extends BaseController { 

  @Inject()
  sayService: SayService;



   /**
   * 查询回复及评论
   */
    @Post('/listComment', { summary: '获取回复' })
    async listComment(@Body(ALL) params: any) {
      console.log("----addlistCommentComment----",params);
      return this.ok(await this.sayService.listComment(params))
  
    }


       /**
   * 查询回复及评论
   */
        @Post('/pageIndex', { summary: '获取首页say' })
        async pageIndex(@Body(ALL) params: any) {
          console.log("----pageIndex----",params);
          return this.ok(await this.sayService.pageIndex(params))
      
        }





}