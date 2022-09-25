import { Provide,Inject, Post,Body ,ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { PointsEntity } from '../../entity/points';
import { PointsService} from '../../service/points';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: PointsEntity,
  service:PointsService
}
)
export class pointsPublicController extends BaseController { 

  @Inject()
  pointsService: PointsService;




    /**
   * 查询我的积分
   */
     @Post('/myPoints', { summary: '查询我的积分'})
     async myPoints(@Body(ALL) params: any) {
    
       return this.ok(await this.pointsService.myPoints(params))
   
  
     }


}