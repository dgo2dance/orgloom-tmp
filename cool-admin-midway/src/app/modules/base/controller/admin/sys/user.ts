import { Body, Inject, Post,Get, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { BaseSysUserEntity } from '../../../entity/sys/user';
import { BaseSysUserService } from '../../../service/sys/user';

/**
 * 系统用户
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: BaseSysUserEntity,
  service: BaseSysUserService,
})
export class BaseSysUserController extends BaseController {
  @Inject()
  baseSysUserService: BaseSysUserService;

  /**
   * 移动部门
   */
  @Post('/move', { summary: '移动部门' })
  async move(@Body() departmentId: number, @Body() userIds: []) {
    await this.baseSysUserService.move(departmentId, userIds);
    return this.ok();
  }


   /**
   * 移动部门
   */
    @Get('/infoFront', { summary: '前端查取用户' })
    async infoFront() {
    //  return this.baseSysUserService.infoFront();
    //  return this.ok();

    return this.ok(await this.baseSysUserService.infoFront())
    }

}
