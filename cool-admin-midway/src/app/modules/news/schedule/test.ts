import { Provide, Inject, Schedule, CommonSchedule } from '@midwayjs/decorator';
import { Context } from 'egg';

@Provide()
@Schedule({
  //   interval: 2333, // 2.333s 间隔  ms 1s=1000ms 1000*60*60*24*3
  type: 'worker', // 指定某一个 worker 执行
  //   cron: '0 0 1 * * *', // 每天凌晨1点执行
  //   cron: '0 0 2 * * 1', // 每周一凌晨2点执行
  cron: '0 30 1 1 * *', // 每月1号凌晨1点30分执行
})
export class HelloCron implements CommonSchedule {
  @Inject()
  ctx: Context;

  // 定时执行的具体任务
  async exec() {
    this.ctx.logger.info(process.pid, 'hello');
    console.log('1231231');
  }
}
