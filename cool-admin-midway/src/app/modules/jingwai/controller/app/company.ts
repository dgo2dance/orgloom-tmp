import { Provide,Inject, Post,Body ,ALL} from '@midwayjs/decorator';

import { CoolController, BaseController } from '@cool-midway/core';
import { CompanyEntity } from '../../entity/company';
import { CompanyService} from '../../service/company';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['info', 'list', 'page'],
  entity: CompanyEntity,
  service:CompanyService,
  urlTag: {
    name: 'ignoreToken',
    url: ['page'],
  },
},
{
  middleware: [],
}
)
export class CompanyPublicController extends BaseController { 

  @Inject()
  companyService: CompanyService;

  /**
   * 搜索公司
   */
   @Post('/search', { summary: '搜索' })
   async search(@Body(ALL) params: any) {
  
     return this.ok(await this.companyService.search(params))
 

   }


    /**
   * 搜索公司
   */
     @Post('/indexPage', { summary: '首页' })
     async indexPage(@Body(ALL) params: any) {
    
       return this.ok(await this.companyService.indexPage(params))
   
  
     }


}
