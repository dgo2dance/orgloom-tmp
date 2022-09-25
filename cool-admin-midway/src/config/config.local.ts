import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  config.orm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'cool',
    // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
    synchronize: true,
    // 打印日志
    logging: true,
    // 字符集
    charset: 'utf8mb4',
    // 驱动
    driver: require('mysql2'),
    // 设置时区
    timezone: '+8:00',
  };

  config.logger = {
    coreLogger: {
      consoleLevel: 'INFO',
    },
  };

    // cool配置
    config.cool = {

      file: {
        // 文件路径前缀 本地上传模式下 有效
            domain: 'http://127.0.0.1:8001',
      //    domain: 'http://124.221.92.90:9998',
      },
    };

  return config;
};
