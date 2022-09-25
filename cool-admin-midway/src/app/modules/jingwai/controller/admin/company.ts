import { Provide,Inject, Post,Body ,ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { CompanyEntity } from '../../entity/company';
import { CompanyService} from '../../service/company';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CompanyEntity,
  service:CompanyService,
  pageQueryOp: {
    keyWordLikeFields: ['name', 'description']
  },
}
)
export class CompanyAdminController extends BaseController { 

  @Inject()
  companyService: CompanyService;




  
  /**
     * 分页查询首页列表
     */
  @Post('/pageIsFollow', { summary: '是否关注' })
  async pageIsFollow(@Body(ALL) params: any) {

    return this.ok(await this.companyService.pageIsFollow(params));

  }


}