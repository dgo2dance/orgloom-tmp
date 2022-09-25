/*
 Navicat Premium Data Transfer

 Source Server         : tengxunyun
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : 124.221.92.90:10002
 Source Schema         : cool

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 07/05/2022 08:38:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for base_app_space_info
-- ----------------------------
DROP TABLE IF EXISTS `base_app_space_info`;
CREATE TABLE `base_app_space_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `url` varchar(255) NOT NULL COMMENT '地址',
  `type` varchar(255) NOT NULL COMMENT '类型',
  `classifyId` bigint DEFAULT NULL COMMENT '分类ID',
  PRIMARY KEY (`id`),
  KEY `IDX_4aed04cbfa2ecdc01485b86e51` (`createTime`),
  KEY `IDX_abd5de4a4895eb253a5cabb20f` (`updateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for base_app_space_type
-- ----------------------------
DROP TABLE IF EXISTS `base_app_space_type`;
CREATE TABLE `base_app_space_type` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(255) NOT NULL COMMENT '类别名称',
  `parentId` tinyint DEFAULT NULL COMMENT '父分类ID',
  PRIMARY KEY (`id`),
  KEY `IDX_5e8376603f89fdf3e7bb05103a` (`createTime`),
  KEY `IDX_500ea9e8b2c5c08c9b86a0667e` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of base_app_space_type
-- ----------------------------
BEGIN;
INSERT INTO `base_app_space_type` VALUES (1, '2021-02-26 14:07:48.867045', '2021-02-26 14:07:48.867045', 'a', NULL);
INSERT INTO `base_app_space_type` VALUES (2, '2021-02-26 14:07:52.285531', '2021-02-26 14:07:52.285531', 'b', NULL);
COMMIT;

-- ----------------------------
-- Table structure for base_sys_conf
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_conf`;
CREATE TABLE `base_sys_conf` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `cKey` varchar(255) NOT NULL COMMENT '配置键',
  `cValue` varchar(255) NOT NULL COMMENT '配置值',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9be195d27767b4485417869c3a` (`cKey`),
  KEY `IDX_905208f206a3ff9fd513421971` (`createTime`),
  KEY `IDX_4c6f27f6ecefe51a5a196a047a` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of base_sys_conf
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_conf` VALUES (1, '2021-02-25 14:23:26.810981', '2021-02-25 14:23:26.810981', 'logKeep', '31');
COMMIT;

-- ----------------------------
-- Table structure for base_sys_department
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_department`;
CREATE TABLE `base_sys_department` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(255) NOT NULL COMMENT '部门名称',
  `parentId` bigint DEFAULT NULL COMMENT '上级部门ID',
  `orderNum` int NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`),
  KEY `IDX_be4c53cd671384fa588ca9470a` (`createTime`),
  KEY `IDX_ca1473a793961ec55bc0c8d268` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of base_sys_department
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_department` VALUES (1, '2021-02-24 21:17:11.971397', '2021-02-24 21:17:15.697917', 'COOL', NULL, 0);
INSERT INTO `base_sys_department` VALUES (11, '2021-02-26 14:17:06.690613', '2021-02-26 14:17:06.690613', '开发', 1, 0);
INSERT INTO `base_sys_department` VALUES (12, '2021-02-26 14:17:11.576369', '2021-02-26 14:17:11.576369', '测试', 1, 0);
INSERT INTO `base_sys_department` VALUES (13, '2021-02-26 14:28:59.685177', '2021-02-26 14:28:59.685177', '游客', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for base_sys_log
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_log`;
CREATE TABLE `base_sys_log` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `userId` bigint DEFAULT NULL COMMENT '用户ID',
  `action` varchar(100) NOT NULL COMMENT '行为',
  `ip` varchar(50) DEFAULT NULL COMMENT 'ip',
  `ipAddr` varchar(50) DEFAULT NULL COMMENT 'ip地址',
  `params` text COMMENT '参数',
  PRIMARY KEY (`id`),
  KEY `IDX_51a2caeb5713efdfcb343a8772` (`userId`),
  KEY `IDX_938f886fb40e163db174b7f6c3` (`action`),
  KEY `IDX_24e18767659f8c7142580893f2` (`ip`),
  KEY `IDX_a03a27f75cf8d502b3060823e1` (`ipAddr`),
  KEY `IDX_c9382b76219a1011f7b8e7bcd1` (`createTime`),
  KEY `IDX_bfd44e885b470da43bcc39aaa7` (`updateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for base_sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_menu`;
CREATE TABLE `base_sys_menu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `parentId` bigint DEFAULT NULL COMMENT '父菜单ID',
  `name` varchar(255) NOT NULL COMMENT '菜单名称',
  `router` varchar(255) DEFAULT NULL COMMENT '菜单地址',
  `perms` varchar(255) DEFAULT NULL COMMENT '权限标识',
  `type` tinyint NOT NULL DEFAULT '0' COMMENT '类型 0：目录 1：菜单 2：按钮',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `orderNum` int NOT NULL DEFAULT '0' COMMENT '排序',
  `viewPath` varchar(255) DEFAULT NULL COMMENT '视图地址',
  `keepAlive` tinyint NOT NULL DEFAULT '1' COMMENT '路由缓存',
  `isShow` tinyint NOT NULL DEFAULT '1' COMMENT '是否显示',
  PRIMARY KEY (`id`),
  KEY `IDX_05e3d6a56604771a6da47ebf8e` (`createTime`),
  KEY `IDX_d5203f18daaf7c3fe0ab34497f` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=300 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of base_sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_menu` VALUES (1, '2019-09-11 11:14:44.000000', '2019-11-18 15:56:36.000000', NULL, '工作台', '/', NULL, 0, 'icon-workbench', 1, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (2, '2019-09-11 11:14:47.000000', '2021-02-27 17:16:05.000000', NULL, '系统管理', '/sys', NULL, 0, 'icon-system', 2, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (8, '1900-01-20 23:19:57.000000', '2021-03-08 22:59:12.000000', 27, '菜单列表', '/sys/menu', NULL, 1, 'icon-menu', 2, 'cool/modules/base/views/menu.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (10, '1900-01-20 00:19:27.325000', '1900-01-20 00:19:27.325000', 8, '新增', NULL, 'base:sys:menu:add', 2, NULL, 1, NULL, 0, 1);
INSERT INTO `base_sys_menu` VALUES (11, '1900-01-20 00:19:51.101000', '1900-01-20 00:19:51.101000', 8, '删除', NULL, 'base:sys:menu:delete', 2, NULL, 2, NULL, 0, 1);
INSERT INTO `base_sys_menu` VALUES (12, '1900-01-20 00:20:05.150000', '1900-01-20 00:20:05.150000', 8, '修改', NULL, 'base:sys:menu:update', 2, NULL, 3, NULL, 0, 1);
INSERT INTO `base_sys_menu` VALUES (13, '1900-01-20 00:20:19.341000', '1900-01-20 00:20:19.341000', 8, '查询', NULL, 'base:sys:menu:page,base:sys:menu:list,base:sys:menu:info', 2, NULL, 4, NULL, 0, 1);
INSERT INTO `base_sys_menu` VALUES (22, '2019-09-12 00:34:01.000000', '2021-03-08 22:59:23.000000', 27, '角色列表', '/sys/role', NULL, 1, 'icon-common', 3, 'cool/modules/base/views/role.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (23, '1900-01-20 00:34:23.459000', '1900-01-20 00:34:23.459000', 22, '新增', NULL, 'base:sys:role:add', 2, NULL, 1, NULL, 0, 1);
INSERT INTO `base_sys_menu` VALUES (24, '1900-01-20 00:34:40.523000', '1900-01-20 00:34:40.523000', 22, '删除', NULL, 'base:sys:role:delete', 2, NULL, 2, NULL, 0, 1);
INSERT INTO `base_sys_menu` VALUES (25, '1900-01-20 00:34:53.306000', '1900-01-20 00:34:53.306000', 22, '修改', NULL, 'base:sys:role:update', 2, NULL, 3, NULL, 0, 1);
INSERT INTO `base_sys_menu` VALUES (26, '1900-01-20 00:35:05.024000', '1900-01-20 00:35:05.024000', 22, '查询', NULL, 'base:sys:role:page,base:sys:role:list,base:sys:role:info', 2, NULL, 4, NULL, 0, 1);
INSERT INTO `base_sys_menu` VALUES (27, '2019-09-12 15:52:44.000000', '2019-09-15 22:11:56.000000', 2, '权限管理', NULL, NULL, 0, 'icon-auth', 1, NULL, 0, 1);
INSERT INTO `base_sys_menu` VALUES (29, '2019-09-12 17:35:51.000000', '2021-03-08 23:01:39.000000', 105, '请求日志', '/sys/log', NULL, 1, 'icon-log', 1, 'cool/modules/base/views/log.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (30, '2019-09-12 17:37:03.000000', '2021-03-03 10:16:26.000000', 29, '权限', NULL, 'base:sys:log:page,base:sys:log:clear,base:sys:log:getKeep,base:sys:log:setKeep', 2, NULL, 1, NULL, 0, 1);
INSERT INTO `base_sys_menu` VALUES (43, '2019-11-07 14:22:34.000000', '2021-03-08 23:02:51.000000', 45, 'crud 示例', '/crud', NULL, 1, 'icon-favor', 1, 'cool/modules/demo/views/crud.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (45, '2019-11-07 22:36:57.000000', '2019-11-11 15:21:10.000000', 1, '组件库', '/ui-lib', NULL, 0, 'icon-common', 2, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (47, '2019-11-08 09:35:08.000000', '2021-02-27 17:16:35.000000', NULL, '框架教程', '/tutorial', NULL, 0, 'icon-task', 4, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (48, '2019-11-08 09:35:53.000000', '2021-03-03 11:03:21.000000', 47, '文档', '/tutorial/doc', NULL, 1, 'icon-log', 0, 'https://admin.cool-js.com', 1, 1);
INSERT INTO `base_sys_menu` VALUES (49, '2019-11-09 22:11:13.000000', '2021-03-09 09:50:46.000000', 45, 'quill 富文本编辑器', '/editor-quill', NULL, 1, 'icon-favor', 2, 'cool/modules/demo/views/editor-quill.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (59, '2019-11-18 16:50:27.000000', '2019-11-18 16:50:27.000000', 97, '部门列表', NULL, 'base:sys:department:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (60, '2019-11-18 16:50:45.000000', '2019-11-18 16:50:45.000000', 97, '新增部门', NULL, 'base:sys:department:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (61, '2019-11-18 16:50:59.000000', '2019-11-18 16:50:59.000000', 97, '更新部门', NULL, 'base:sys:department:update', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (62, '2019-11-18 16:51:13.000000', '2019-11-18 16:51:13.000000', 97, '删除部门', NULL, 'base:sys:department:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (63, '2019-11-18 17:49:35.000000', '2019-11-18 17:49:35.000000', 97, '部门排序', NULL, 'base:sys:department:order', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (65, '2019-11-18 23:59:21.000000', '2019-11-18 23:59:21.000000', 97, '用户转移', NULL, 'base:sys:user:move', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (78, '2019-12-10 13:27:56.000000', '2021-02-27 17:08:53.000000', 2, '参数配置', NULL, NULL, 0, 'icon-common', 4, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (79, '1900-01-20 13:29:33.000000', '2021-03-08 23:01:48.000000', 78, '参数列表', '/sys/param', NULL, 1, 'icon-menu', 0, 'cool/modules/base/views/param.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (80, '1900-01-20 13:29:50.146000', '1900-01-20 13:29:50.146000', 79, '新增', NULL, 'base:sys:param:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (81, '1900-01-20 13:30:10.030000', '1900-01-20 13:30:10.030000', 79, '修改', NULL, 'base:sys:param:info,base:sys:param:update', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (82, '1900-01-20 13:30:25.791000', '1900-01-20 13:30:25.791000', 79, '删除', NULL, 'base:sys:param:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (83, '1900-01-20 13:30:40.469000', '1900-01-20 13:30:40.469000', 79, '查看', NULL, 'base:sys:param:page,base:sys:param:list,base:sys:param:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (84, '2020-07-25 16:21:30.000000', '2020-07-25 16:21:30.000000', NULL, '通用', NULL, NULL, 0, 'icon-radioboxfill', 99, NULL, 1, 0);
INSERT INTO `base_sys_menu` VALUES (85, '2020-07-25 16:22:14.000000', '2021-03-03 10:36:00.000000', 84, '图片上传', NULL, 'space:info:page,space:info:list,space:info:info,space:info:add,space:info:delete,space:info:update,space:type:page,space:type:list,space:type:info,space:type:add,space:type:delete,space:type:update', 2, NULL, 1, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (86, '2020-08-12 09:56:27.000000', '2021-03-08 23:03:03.000000', 45, '文件上传', '/upload', NULL, 1, 'icon-favor', 3, 'cool/modules/demo/views/upload.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (90, '1900-01-20 10:26:58.615000', '1900-01-20 10:26:58.615000', 84, '客服聊天', NULL, 'base:app:im:message:read,base:app:im:message:page,base:app:im:session:page,base:app:im:session:list,base:app:im:session:unreadCount,base:app:im:session:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (96, '2021-01-12 14:12:20.000000', '2021-03-08 23:02:40.000000', 1, '组件预览', '/demo', NULL, 1, 'icon-favor', 0, 'cool/modules/demo/views/demo.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (97, '1900-01-20 14:14:02.000000', '2021-03-09 11:03:09.000000', 27, '用户列表', '/sys/user', NULL, 1, 'icon-user', 0, 'cool/modules/base/views/user.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (98, '1900-01-20 14:14:13.528000', '1900-01-20 14:14:13.528000', 97, '新增', NULL, 'base:sys:user:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (99, '1900-01-20 14:14:22.823000', '1900-01-20 14:14:22.823000', 97, '删除', NULL, 'base:sys:user:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (100, '1900-01-20 14:14:33.973000', '1900-01-20 14:14:33.973000', 97, '修改', NULL, 'base:sys:user:delete,base:sys:user:update', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (101, '2021-01-12 14:14:51.000000', '2021-01-12 14:14:51.000000', 97, '查询', NULL, 'base:sys:user:page,base:sys:user:list,base:sys:user:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (105, '2021-01-21 10:42:55.000000', '2021-01-21 10:42:55.000000', 2, '监控管理', NULL, NULL, 0, 'icon-rank', 6, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (109, '2021-02-27 14:13:56.000000', '2021-02-27 17:09:19.000000', NULL, '插件管理', NULL, NULL, 0, 'icon-menu', 3, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (110, '2021-02-27 14:14:13.000000', '2021-03-08 23:01:30.000000', 109, '插件列表', '/plugin', NULL, 1, 'icon-menu', 0, 'cool/modules/base/views/plugin.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (111, '2021-02-27 14:24:41.877000', '2021-02-27 14:24:41.877000', 110, '编辑', NULL, 'base:plugin:info:info,base:plugin:info:update', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (112, '2021-02-27 14:24:52.159000', '2021-02-27 14:24:52.159000', 110, '列表', NULL, 'base:plugin:info:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (113, '2021-02-27 14:25:02.066000', '2021-02-27 14:25:02.066000', 110, '删除', NULL, 'base:plugin:info:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (114, '2021-02-27 16:36:59.322000', '2021-02-27 16:36:59.322000', 110, '保存配置', NULL, 'base:plugin:info:config', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (115, '2021-02-27 16:38:21.000000', '2021-02-27 18:18:22.000000', 110, '获取配置', NULL, 'base:plugin:info:getConfig', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (116, '2021-02-27 17:57:42.000000', '2021-02-27 18:19:35.000000', 110, '开启、关闭', NULL, 'base:plugin:info:enable', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (117, '2021-03-05 10:58:25.000000', '2021-03-05 10:58:25.000000', NULL, '任务管理', NULL, NULL, 0, 'icon-activity', 5, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (118, '2021-03-05 10:59:42.000000', '2021-03-05 10:59:42.000000', 117, '任务列表', '/task', NULL, 1, 'icon-menu', 0, 'cool/modules/task/views/task.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (119, '2021-03-05 11:00:00.000000', '2021-03-05 11:00:00.000000', 118, '权限', NULL, 'task:info:page,task:info:list,task:info:info,task:info:add,task:info:delete,task:info:update,task:info:stop,task:info:start,task:info:once,task:info:log', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (120, '2021-12-16 10:58:39.945824', '2021-12-16 10:58:39.945824', NULL, '测试DEMO', NULL, NULL, 0, 'icon-scan', 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (121, '2021-12-16 10:59:46.849557', '2021-12-16 10:59:46.849557', 120, '测试001', 'cool/modules/demo/views/crud', NULL, 1, 'icon-activity', 0, 'cool/modules/demo/views/crud.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (129, '2021-12-16 12:27:02.290543', '2021-12-16 12:27:02.290543', 120, '测试快速', '/demo/user', NULL, 1, 'icon-approve', 0, 'cool/modules/demo/views/user.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (130, '2021-12-16 12:27:02.375662', '2021-12-16 12:27:02.375662', 129, '新增', NULL, 'demo:user:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (131, '2021-12-16 12:27:02.383953', '2021-12-16 12:27:02.383953', 129, '删除', NULL, 'demo:user:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (132, '2021-12-16 12:27:02.392807', '2021-12-16 12:27:02.392807', 129, '修改', NULL, 'demo:user:update;demo:user:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (133, '2021-12-16 12:27:02.400777', '2021-12-16 12:27:02.400777', 129, '详情', NULL, 'demo:user:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (134, '2021-12-16 12:27:02.408146', '2021-12-16 12:27:02.408146', 129, '全部', NULL, 'demo:user:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (135, '2021-12-16 12:27:02.416834', '2021-12-16 12:27:02.416834', 129, '分页', NULL, 'demo:user:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (136, '2021-12-16 12:34:20.946281', '2021-12-16 04:39:50.735000', 120, '文章分类', '/demo/categories', NULL, 1, 'icon-app', 0, 'cool/modules/demo/views/categories.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (137, '2021-12-16 12:34:21.018005', '2021-12-16 12:34:21.018005', 136, '新增', NULL, 'news:categories:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (138, '2021-12-16 12:34:21.024107', '2021-12-16 12:34:21.024107', 136, '删除', NULL, 'news:categories:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (139, '2021-12-16 12:34:21.032242', '2021-12-16 12:34:21.032242', 136, '修改', NULL, 'news:categories:update;news:categories:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (140, '2021-12-16 12:34:21.038307', '2021-12-16 12:34:21.038307', 136, '详情', NULL, 'news:categories:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (141, '2021-12-16 12:34:21.044448', '2021-12-16 12:34:21.044448', 136, '全部', NULL, 'news:categories:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (142, '2021-12-16 12:34:21.049748', '2021-12-16 12:34:21.049748', 136, '分页', NULL, 'news:categories:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (143, '2021-12-16 12:44:22.152382', '2021-12-16 12:44:22.152382', 120, '文章', '/test/articles', NULL, 1, 'icon-menu', 0, 'cool/modules/demo/views/articles.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (144, '2021-12-16 12:44:22.212227', '2021-12-16 12:44:22.212227', 143, '新增', NULL, 'news:articles:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (145, '2021-12-16 12:44:22.220060', '2021-12-16 12:44:22.220060', 143, '删除', NULL, 'news:articles:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (146, '2021-12-16 12:44:22.225809', '2021-12-16 12:44:22.225809', 143, '修改', NULL, 'news:articles:update;news:articles:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (147, '2021-12-16 12:44:22.231567', '2021-12-16 12:44:22.231567', 143, '详情', NULL, 'news:articles:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (148, '2021-12-16 12:44:22.235939', '2021-12-16 12:44:22.235939', 143, '全部', NULL, 'news:articles:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (149, '2021-12-16 12:44:22.267259', '2021-12-16 12:44:22.267259', 143, '分页', NULL, 'news:articles:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (150, '2021-12-17 09:39:50.502573', '2022-03-18 03:45:54.378000', NULL, '光束', NULL, NULL, 0, 'icon-menu', 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (214, '2022-01-29 09:06:24.496301', '2022-01-29 09:06:24.496301', 150, '公司', '/jingwai/company', NULL, 1, 'icon-favor', 0, 'cool/modules/jingwai/views/company.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (215, '2022-01-29 09:06:24.586119', '2022-01-29 09:06:24.586119', 214, '新增', NULL, 't:company:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (216, '2022-01-29 09:06:24.617066', '2022-01-29 09:06:24.617066', 214, '删除', NULL, 't:company:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (217, '2022-01-29 09:06:24.622007', '2022-01-29 09:06:24.622007', 214, '修改', NULL, 't:company:update;t:company:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (218, '2022-01-29 09:06:24.635090', '2022-01-29 09:06:24.635090', 214, '详情', NULL, 't:company:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (219, '2022-01-29 09:06:24.648790', '2022-01-29 09:06:24.648790', 214, '全部', NULL, 't:company:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (220, '2022-01-29 09:06:24.656202', '2022-01-29 09:06:24.656202', 214, '分页', NULL, 't:company:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (235, '2022-02-08 15:19:14.483152', '2022-02-08 15:19:14.483152', 150, '公司关注', '/jingwai/follow', NULL, 1, 'icon-menu', 2, 'cool/modules/jingwai/views/follow.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (236, '2022-02-08 15:19:14.536558', '2022-02-08 15:19:14.536558', 235, '新增', NULL, 'jingwai:follow:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (237, '2022-02-08 15:19:14.541508', '2022-02-08 15:19:14.541508', 235, '删除', NULL, 'jingwai:follow:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (238, '2022-02-08 15:19:14.570641', '2022-02-08 15:19:14.570641', 235, '修改', NULL, 'jingwai:follow:update;jingwai:follow:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (239, '2022-02-08 15:19:14.580628', '2022-02-08 15:19:14.580628', 235, '详情', NULL, 'jingwai:follow:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (240, '2022-02-08 15:19:14.585492', '2022-02-08 15:19:14.585492', 235, '全部', NULL, 'jingwai:follow:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (241, '2022-02-08 15:19:14.591115', '2022-02-08 15:19:14.591115', 235, '分页', NULL, 'jingwai:follow:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (242, '2022-02-08 15:19:14.597947', '2022-02-08 15:19:14.597947', 235, '是否关注', NULL, 'jingwai:follow:isFollow', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (251, '2022-02-11 20:03:55.974445', '2022-02-11 20:03:55.974445', 150, '公司组织', '/jingwai/org', NULL, 1, 'icon-dept', 10, 'cool/modules/jingwai/views/org.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (252, '2022-02-11 20:03:56.029427', '2022-02-11 20:03:56.029427', 251, '新增', NULL, 't:org:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (253, '2022-02-11 20:03:56.036319', '2022-02-11 20:03:56.036319', 251, '删除', NULL, 't:org:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (254, '2022-02-11 20:03:56.044974', '2022-02-11 20:03:56.044974', 251, '修改', NULL, 't:org:update;t:org:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (255, '2022-02-11 20:03:56.050335', '2022-02-11 20:03:56.050335', 251, '详情', NULL, 't:org:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (256, '2022-02-11 20:03:56.064734', '2022-02-11 20:03:56.064734', 251, '全部', NULL, 't:org:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (257, '2022-02-11 20:03:56.092226', '2022-02-11 20:03:56.092226', 251, '分页', NULL, 't:org:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (265, '2022-03-10 17:39:28.563901', '2022-03-10 17:39:28.563901', 150, '反馈建议', '/jingwai/advise', NULL, 1, 'icon-theme', 99, 'cool/modules/jingwai/views/advise.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (266, '2022-03-10 17:39:28.713324', '2022-03-10 17:39:28.713324', 265, '新增', NULL, 't:advise:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (267, '2022-03-10 17:39:28.767623', '2022-03-10 17:39:28.767623', 265, '删除', NULL, 't:advise:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (268, '2022-03-10 17:39:28.781330', '2022-03-10 17:39:28.781330', 265, '修改', NULL, 't:advise:update;t:advise:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (269, '2022-03-10 17:39:28.797572', '2022-03-10 17:39:28.797572', 265, '详情', NULL, 't:advise:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (270, '2022-03-10 17:39:28.807398', '2022-03-10 17:39:28.807398', 265, '全部', NULL, 't:advise:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (271, '2022-03-10 17:39:28.816636', '2022-03-10 17:39:28.816636', 265, '分页', NULL, 't:advise:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (293, '2022-03-16 13:51:11.254731', '2022-03-16 13:51:11.254731', 150, '自由圈', '/jingwai/free', NULL, 1, 'icon-user', 99, 'cool/modules/jingwai/views/free.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (294, '2022-03-16 13:51:11.369758', '2022-03-16 13:51:11.369758', 293, '新增', NULL, 't:free:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (295, '2022-03-16 13:51:11.377793', '2022-03-16 13:51:11.377793', 293, '删除', NULL, 't:free:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (296, '2022-03-16 13:51:11.383702', '2022-03-16 13:51:11.383702', 293, '修改', NULL, 't:free:update;t:free:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (297, '2022-03-16 13:51:11.411165', '2022-03-16 13:51:11.411165', 293, '详情', NULL, 't:free:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (298, '2022-03-16 13:51:11.426726', '2022-03-16 13:51:11.426726', 293, '全部', NULL, 't:free:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (299, '2022-03-16 13:51:11.459735', '2022-03-16 13:51:11.459735', 293, '分页', NULL, 't:free:page', 2, NULL, 0, NULL, 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for base_sys_param
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_param`;
CREATE TABLE `base_sys_param` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `keyName` varchar(255) NOT NULL COMMENT '键位',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `data` text NOT NULL COMMENT '数据',
  `dataType` tinyint NOT NULL DEFAULT '0' COMMENT '数据类型 0:字符串 1：数组 2：键值对',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `IDX_cf19b5e52d8c71caa9c4534454` (`keyName`),
  KEY `IDX_7bcb57371b481d8e2d66ddeaea` (`createTime`),
  KEY `IDX_479122e3bf464112f7a7253dac` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of base_sys_param
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_param` VALUES (1, '2021-02-26 13:53:05.000000', '2021-03-03 17:50:04.000000', 'text', '富文本参数', '<p><strong class=\"ql-size-huge\">111xxxxx2222<span class=\"ql-cursor\">﻿﻿</span></strong></p>', 0, NULL);
INSERT INTO `base_sys_param` VALUES (2, '2021-02-26 13:53:18.000000', '2021-02-26 13:53:18.000000', 'json', 'JSON参数', '{\n    code: 111\n}', 0, NULL);
COMMIT;

-- ----------------------------
-- Table structure for base_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_role`;
CREATE TABLE `base_sys_role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `userId` varchar(255) NOT NULL COMMENT '用户ID',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `label` varchar(50) DEFAULT NULL COMMENT '角色标签',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `relevance` int NOT NULL DEFAULT '1' COMMENT '数据权限是否关联上下级',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_469d49a5998170e9550cf113da` (`name`),
  UNIQUE KEY `IDX_f3f24fbbccf00192b076e549a7` (`label`),
  KEY `IDX_6f01184441dec49207b41bfd92` (`createTime`),
  KEY `IDX_d64ca209f3fc52128d9b20e97b` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of base_sys_role
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_role` VALUES (1, '2021-02-24 21:18:39.682358', '2021-02-24 21:18:39.682358', '1', '超管', 'admin', '最高权限的角色', 1);
INSERT INTO `base_sys_role` VALUES (10, '2021-02-26 14:15:38.000000', '2021-02-26 14:15:38.000000', '1', '系统管理员', 'admin-sys', NULL, 1);
INSERT INTO `base_sys_role` VALUES (11, '2021-02-26 14:16:49.044744', '2021-02-26 14:16:49.044744', '1', '游客', 'visitor', NULL, 0);
INSERT INTO `base_sys_role` VALUES (12, '2021-02-26 14:26:51.000000', '2021-02-26 14:32:35.000000', '1', '开发', 'dev', NULL, 0);
INSERT INTO `base_sys_role` VALUES (13, '2021-02-26 14:27:58.000000', '2021-02-26 14:33:49.000000', '1', '测试', 'test', NULL, 0);
INSERT INTO `base_sys_role` VALUES (14, '2022-03-18 00:49:17.418000', '2022-03-18 00:49:17.418000', '1', 'orgloom', 'orgloom', NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for base_sys_role_department
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_role_department`;
CREATE TABLE `base_sys_role_department` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `roleId` bigint NOT NULL COMMENT '角色ID',
  `departmentId` bigint NOT NULL COMMENT '部门ID',
  PRIMARY KEY (`id`),
  KEY `IDX_e881a66f7cce83ba431cf20194` (`createTime`),
  KEY `IDX_cbf48031efee5d0de262965e53` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of base_sys_role_department
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_role_department` VALUES (1, '2021-02-26 12:00:23.787939', '2021-02-26 12:00:23.787939', 8, 4);
INSERT INTO `base_sys_role_department` VALUES (2, '2021-02-26 12:01:11.525205', '2021-02-26 12:01:11.525205', 9, 1);
INSERT INTO `base_sys_role_department` VALUES (3, '2021-02-26 12:01:11.624266', '2021-02-26 12:01:11.624266', 9, 4);
INSERT INTO `base_sys_role_department` VALUES (4, '2021-02-26 12:01:11.721894', '2021-02-26 12:01:11.721894', 9, 5);
INSERT INTO `base_sys_role_department` VALUES (5, '2021-02-26 12:01:11.823342', '2021-02-26 12:01:11.823342', 9, 8);
INSERT INTO `base_sys_role_department` VALUES (6, '2021-02-26 12:01:11.922873', '2021-02-26 12:01:11.922873', 9, 9);
INSERT INTO `base_sys_role_department` VALUES (23, '2021-02-26 14:32:40.354669', '2021-02-26 14:32:40.354669', 12, 11);
INSERT INTO `base_sys_role_department` VALUES (25, '2021-02-26 14:32:59.726608', '2021-02-26 14:32:59.726608', 10, 1);
INSERT INTO `base_sys_role_department` VALUES (27, '2021-02-26 14:33:54.579947', '2021-02-26 14:33:54.579947', 13, 12);
COMMIT;

-- ----------------------------
-- Table structure for base_sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_role_menu`;
CREATE TABLE `base_sys_role_menu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `roleId` bigint NOT NULL COMMENT '角色ID',
  `menuId` bigint NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`id`),
  KEY `IDX_3641f81d4201c524a57ce2aa54` (`createTime`),
  KEY `IDX_f860298298b26e7a697be36e5b` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=554 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of base_sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_role_menu` VALUES (1, '2021-02-26 12:00:18.240154', '2021-02-26 12:00:18.240154', 8, 1);
INSERT INTO `base_sys_role_menu` VALUES (2, '2021-02-26 12:00:18.342131', '2021-02-26 12:00:18.342131', 8, 96);
INSERT INTO `base_sys_role_menu` VALUES (3, '2021-02-26 12:00:18.444143', '2021-02-26 12:00:18.444143', 8, 45);
INSERT INTO `base_sys_role_menu` VALUES (4, '2021-02-26 12:00:18.545490', '2021-02-26 12:00:18.545490', 8, 43);
INSERT INTO `base_sys_role_menu` VALUES (5, '2021-02-26 12:00:18.649626', '2021-02-26 12:00:18.649626', 8, 49);
INSERT INTO `base_sys_role_menu` VALUES (6, '2021-02-26 12:00:18.752369', '2021-02-26 12:00:18.752369', 8, 86);
INSERT INTO `base_sys_role_menu` VALUES (7, '2021-02-26 12:00:18.856023', '2021-02-26 12:00:18.856023', 8, 2);
INSERT INTO `base_sys_role_menu` VALUES (8, '2021-02-26 12:00:18.956131', '2021-02-26 12:00:18.956131', 8, 27);
INSERT INTO `base_sys_role_menu` VALUES (9, '2021-02-26 12:00:19.071490', '2021-02-26 12:00:19.071490', 8, 97);
INSERT INTO `base_sys_role_menu` VALUES (10, '2021-02-26 12:00:19.171745', '2021-02-26 12:00:19.171745', 8, 59);
INSERT INTO `base_sys_role_menu` VALUES (11, '2021-02-26 12:00:19.274495', '2021-02-26 12:00:19.274495', 8, 60);
INSERT INTO `base_sys_role_menu` VALUES (12, '2021-02-26 12:00:19.374610', '2021-02-26 12:00:19.374610', 8, 61);
INSERT INTO `base_sys_role_menu` VALUES (13, '2021-02-26 12:00:19.474750', '2021-02-26 12:00:19.474750', 8, 62);
INSERT INTO `base_sys_role_menu` VALUES (14, '2021-02-26 12:00:19.573369', '2021-02-26 12:00:19.573369', 8, 63);
INSERT INTO `base_sys_role_menu` VALUES (15, '2021-02-26 12:00:19.674242', '2021-02-26 12:00:19.674242', 8, 65);
INSERT INTO `base_sys_role_menu` VALUES (16, '2021-02-26 12:00:19.772886', '2021-02-26 12:00:19.772886', 8, 98);
INSERT INTO `base_sys_role_menu` VALUES (17, '2021-02-26 12:00:19.874134', '2021-02-26 12:00:19.874134', 8, 99);
INSERT INTO `base_sys_role_menu` VALUES (18, '2021-02-26 12:00:19.972728', '2021-02-26 12:00:19.972728', 8, 100);
INSERT INTO `base_sys_role_menu` VALUES (19, '2021-02-26 12:00:20.085877', '2021-02-26 12:00:20.085877', 8, 101);
INSERT INTO `base_sys_role_menu` VALUES (20, '2021-02-26 12:00:20.192887', '2021-02-26 12:00:20.192887', 8, 8);
INSERT INTO `base_sys_role_menu` VALUES (21, '2021-02-26 12:00:20.293747', '2021-02-26 12:00:20.293747', 8, 10);
INSERT INTO `base_sys_role_menu` VALUES (22, '2021-02-26 12:00:20.393491', '2021-02-26 12:00:20.393491', 8, 11);
INSERT INTO `base_sys_role_menu` VALUES (23, '2021-02-26 12:00:20.495110', '2021-02-26 12:00:20.495110', 8, 12);
INSERT INTO `base_sys_role_menu` VALUES (24, '2021-02-26 12:00:20.594083', '2021-02-26 12:00:20.594083', 8, 13);
INSERT INTO `base_sys_role_menu` VALUES (25, '2021-02-26 12:00:20.695727', '2021-02-26 12:00:20.695727', 8, 22);
INSERT INTO `base_sys_role_menu` VALUES (26, '2021-02-26 12:00:20.794729', '2021-02-26 12:00:20.794729', 8, 23);
INSERT INTO `base_sys_role_menu` VALUES (27, '2021-02-26 12:00:20.895601', '2021-02-26 12:00:20.895601', 8, 24);
INSERT INTO `base_sys_role_menu` VALUES (28, '2021-02-26 12:00:20.994972', '2021-02-26 12:00:20.994972', 8, 25);
INSERT INTO `base_sys_role_menu` VALUES (29, '2021-02-26 12:00:21.110384', '2021-02-26 12:00:21.110384', 8, 26);
INSERT INTO `base_sys_role_menu` VALUES (30, '2021-02-26 12:00:21.210970', '2021-02-26 12:00:21.210970', 8, 69);
INSERT INTO `base_sys_role_menu` VALUES (31, '2021-02-26 12:00:21.311852', '2021-02-26 12:00:21.311852', 8, 70);
INSERT INTO `base_sys_role_menu` VALUES (32, '2021-02-26 12:00:21.411591', '2021-02-26 12:00:21.411591', 8, 71);
INSERT INTO `base_sys_role_menu` VALUES (33, '2021-02-26 12:00:21.513584', '2021-02-26 12:00:21.513584', 8, 72);
INSERT INTO `base_sys_role_menu` VALUES (34, '2021-02-26 12:00:21.612212', '2021-02-26 12:00:21.612212', 8, 73);
INSERT INTO `base_sys_role_menu` VALUES (35, '2021-02-26 12:00:21.712720', '2021-02-26 12:00:21.712720', 8, 74);
INSERT INTO `base_sys_role_menu` VALUES (36, '2021-02-26 12:00:21.812839', '2021-02-26 12:00:21.812839', 8, 75);
INSERT INTO `base_sys_role_menu` VALUES (37, '2021-02-26 12:00:21.913321', '2021-02-26 12:00:21.913321', 8, 76);
INSERT INTO `base_sys_role_menu` VALUES (38, '2021-02-26 12:00:22.013970', '2021-02-26 12:00:22.013970', 8, 77);
INSERT INTO `base_sys_role_menu` VALUES (39, '2021-02-26 12:00:22.144879', '2021-02-26 12:00:22.144879', 8, 78);
INSERT INTO `base_sys_role_menu` VALUES (40, '2021-02-26 12:00:22.246707', '2021-02-26 12:00:22.246707', 8, 79);
INSERT INTO `base_sys_role_menu` VALUES (41, '2021-02-26 12:00:22.347579', '2021-02-26 12:00:22.347579', 8, 80);
INSERT INTO `base_sys_role_menu` VALUES (42, '2021-02-26 12:00:22.446947', '2021-02-26 12:00:22.446947', 8, 81);
INSERT INTO `base_sys_role_menu` VALUES (43, '2021-02-26 12:00:22.547082', '2021-02-26 12:00:22.547082', 8, 82);
INSERT INTO `base_sys_role_menu` VALUES (44, '2021-02-26 12:00:22.647197', '2021-02-26 12:00:22.647197', 8, 83);
INSERT INTO `base_sys_role_menu` VALUES (45, '2021-02-26 12:00:22.748089', '2021-02-26 12:00:22.748089', 8, 105);
INSERT INTO `base_sys_role_menu` VALUES (46, '2021-02-26 12:00:22.847814', '2021-02-26 12:00:22.847814', 8, 102);
INSERT INTO `base_sys_role_menu` VALUES (47, '2021-02-26 12:00:22.949071', '2021-02-26 12:00:22.949071', 8, 103);
INSERT INTO `base_sys_role_menu` VALUES (48, '2021-02-26 12:00:23.047353', '2021-02-26 12:00:23.047353', 8, 29);
INSERT INTO `base_sys_role_menu` VALUES (49, '2021-02-26 12:00:23.147826', '2021-02-26 12:00:23.147826', 8, 30);
INSERT INTO `base_sys_role_menu` VALUES (50, '2021-02-26 12:00:23.246800', '2021-02-26 12:00:23.246800', 8, 47);
INSERT INTO `base_sys_role_menu` VALUES (51, '2021-02-26 12:00:23.349541', '2021-02-26 12:00:23.349541', 8, 48);
INSERT INTO `base_sys_role_menu` VALUES (52, '2021-02-26 12:00:23.463177', '2021-02-26 12:00:23.463177', 8, 84);
INSERT INTO `base_sys_role_menu` VALUES (53, '2021-02-26 12:00:23.564096', '2021-02-26 12:00:23.564096', 8, 90);
INSERT INTO `base_sys_role_menu` VALUES (54, '2021-02-26 12:00:23.663815', '2021-02-26 12:00:23.663815', 8, 85);
INSERT INTO `base_sys_role_menu` VALUES (55, '2021-02-26 12:01:05.971978', '2021-02-26 12:01:05.971978', 9, 1);
INSERT INTO `base_sys_role_menu` VALUES (56, '2021-02-26 12:01:06.085568', '2021-02-26 12:01:06.085568', 9, 96);
INSERT INTO `base_sys_role_menu` VALUES (57, '2021-02-26 12:01:06.198271', '2021-02-26 12:01:06.198271', 9, 45);
INSERT INTO `base_sys_role_menu` VALUES (58, '2021-02-26 12:01:06.309736', '2021-02-26 12:01:06.309736', 9, 43);
INSERT INTO `base_sys_role_menu` VALUES (59, '2021-02-26 12:01:06.410785', '2021-02-26 12:01:06.410785', 9, 49);
INSERT INTO `base_sys_role_menu` VALUES (60, '2021-02-26 12:01:06.510712', '2021-02-26 12:01:06.510712', 9, 86);
INSERT INTO `base_sys_role_menu` VALUES (61, '2021-02-26 12:01:06.612457', '2021-02-26 12:01:06.612457', 9, 2);
INSERT INTO `base_sys_role_menu` VALUES (62, '2021-02-26 12:01:06.710397', '2021-02-26 12:01:06.710397', 9, 27);
INSERT INTO `base_sys_role_menu` VALUES (63, '2021-02-26 12:01:06.809104', '2021-02-26 12:01:06.809104', 9, 97);
INSERT INTO `base_sys_role_menu` VALUES (64, '2021-02-26 12:01:06.907088', '2021-02-26 12:01:06.907088', 9, 59);
INSERT INTO `base_sys_role_menu` VALUES (65, '2021-02-26 12:01:07.009988', '2021-02-26 12:01:07.009988', 9, 60);
INSERT INTO `base_sys_role_menu` VALUES (66, '2021-02-26 12:01:07.122372', '2021-02-26 12:01:07.122372', 9, 61);
INSERT INTO `base_sys_role_menu` VALUES (67, '2021-02-26 12:01:07.223694', '2021-02-26 12:01:07.223694', 9, 62);
INSERT INTO `base_sys_role_menu` VALUES (68, '2021-02-26 12:01:07.325022', '2021-02-26 12:01:07.325022', 9, 63);
INSERT INTO `base_sys_role_menu` VALUES (69, '2021-02-26 12:01:07.425209', '2021-02-26 12:01:07.425209', 9, 65);
INSERT INTO `base_sys_role_menu` VALUES (70, '2021-02-26 12:01:07.522081', '2021-02-26 12:01:07.522081', 9, 98);
INSERT INTO `base_sys_role_menu` VALUES (71, '2021-02-26 12:01:07.622775', '2021-02-26 12:01:07.622775', 9, 99);
INSERT INTO `base_sys_role_menu` VALUES (72, '2021-02-26 12:01:07.721181', '2021-02-26 12:01:07.721181', 9, 100);
INSERT INTO `base_sys_role_menu` VALUES (73, '2021-02-26 12:01:07.819589', '2021-02-26 12:01:07.819589', 9, 101);
INSERT INTO `base_sys_role_menu` VALUES (74, '2021-02-26 12:01:07.920497', '2021-02-26 12:01:07.920497', 9, 8);
INSERT INTO `base_sys_role_menu` VALUES (75, '2021-02-26 12:01:08.018875', '2021-02-26 12:01:08.018875', 9, 10);
INSERT INTO `base_sys_role_menu` VALUES (76, '2021-02-26 12:01:08.135192', '2021-02-26 12:01:08.135192', 9, 11);
INSERT INTO `base_sys_role_menu` VALUES (77, '2021-02-26 12:01:08.246405', '2021-02-26 12:01:08.246405', 9, 12);
INSERT INTO `base_sys_role_menu` VALUES (78, '2021-02-26 12:01:08.346661', '2021-02-26 12:01:08.346661', 9, 13);
INSERT INTO `base_sys_role_menu` VALUES (79, '2021-02-26 12:01:08.448436', '2021-02-26 12:01:08.448436', 9, 22);
INSERT INTO `base_sys_role_menu` VALUES (80, '2021-02-26 12:01:08.547496', '2021-02-26 12:01:08.547496', 9, 23);
INSERT INTO `base_sys_role_menu` VALUES (81, '2021-02-26 12:01:08.648457', '2021-02-26 12:01:08.648457', 9, 24);
INSERT INTO `base_sys_role_menu` VALUES (82, '2021-02-26 12:01:08.750564', '2021-02-26 12:01:08.750564', 9, 25);
INSERT INTO `base_sys_role_menu` VALUES (83, '2021-02-26 12:01:08.851783', '2021-02-26 12:01:08.851783', 9, 26);
INSERT INTO `base_sys_role_menu` VALUES (84, '2021-02-26 12:01:08.950898', '2021-02-26 12:01:08.950898', 9, 69);
INSERT INTO `base_sys_role_menu` VALUES (85, '2021-02-26 12:01:09.061982', '2021-02-26 12:01:09.061982', 9, 70);
INSERT INTO `base_sys_role_menu` VALUES (86, '2021-02-26 12:01:09.165258', '2021-02-26 12:01:09.165258', 9, 71);
INSERT INTO `base_sys_role_menu` VALUES (87, '2021-02-26 12:01:09.266177', '2021-02-26 12:01:09.266177', 9, 72);
INSERT INTO `base_sys_role_menu` VALUES (88, '2021-02-26 12:01:09.366427', '2021-02-26 12:01:09.366427', 9, 73);
INSERT INTO `base_sys_role_menu` VALUES (89, '2021-02-26 12:01:09.467877', '2021-02-26 12:01:09.467877', 9, 74);
INSERT INTO `base_sys_role_menu` VALUES (90, '2021-02-26 12:01:09.568526', '2021-02-26 12:01:09.568526', 9, 75);
INSERT INTO `base_sys_role_menu` VALUES (91, '2021-02-26 12:01:09.668052', '2021-02-26 12:01:09.668052', 9, 76);
INSERT INTO `base_sys_role_menu` VALUES (92, '2021-02-26 12:01:09.766367', '2021-02-26 12:01:09.766367', 9, 77);
INSERT INTO `base_sys_role_menu` VALUES (93, '2021-02-26 12:01:09.866170', '2021-02-26 12:01:09.866170', 9, 78);
INSERT INTO `base_sys_role_menu` VALUES (94, '2021-02-26 12:01:09.963037', '2021-02-26 12:01:09.963037', 9, 79);
INSERT INTO `base_sys_role_menu` VALUES (95, '2021-02-26 12:01:10.082046', '2021-02-26 12:01:10.082046', 9, 80);
INSERT INTO `base_sys_role_menu` VALUES (96, '2021-02-26 12:01:10.185024', '2021-02-26 12:01:10.185024', 9, 81);
INSERT INTO `base_sys_role_menu` VALUES (97, '2021-02-26 12:01:10.283787', '2021-02-26 12:01:10.283787', 9, 82);
INSERT INTO `base_sys_role_menu` VALUES (98, '2021-02-26 12:01:10.382883', '2021-02-26 12:01:10.382883', 9, 83);
INSERT INTO `base_sys_role_menu` VALUES (99, '2021-02-26 12:01:10.481150', '2021-02-26 12:01:10.481150', 9, 105);
INSERT INTO `base_sys_role_menu` VALUES (100, '2021-02-26 12:01:10.579579', '2021-02-26 12:01:10.579579', 9, 102);
INSERT INTO `base_sys_role_menu` VALUES (101, '2021-02-26 12:01:10.679489', '2021-02-26 12:01:10.679489', 9, 103);
INSERT INTO `base_sys_role_menu` VALUES (102, '2021-02-26 12:01:10.777496', '2021-02-26 12:01:10.777496', 9, 29);
INSERT INTO `base_sys_role_menu` VALUES (103, '2021-02-26 12:01:10.878292', '2021-02-26 12:01:10.878292', 9, 30);
INSERT INTO `base_sys_role_menu` VALUES (104, '2021-02-26 12:01:10.977354', '2021-02-26 12:01:10.977354', 9, 47);
INSERT INTO `base_sys_role_menu` VALUES (105, '2021-02-26 12:01:11.097786', '2021-02-26 12:01:11.097786', 9, 48);
INSERT INTO `base_sys_role_menu` VALUES (106, '2021-02-26 12:01:11.201390', '2021-02-26 12:01:11.201390', 9, 84);
INSERT INTO `base_sys_role_menu` VALUES (107, '2021-02-26 12:01:11.302120', '2021-02-26 12:01:11.302120', 9, 90);
INSERT INTO `base_sys_role_menu` VALUES (108, '2021-02-26 12:01:11.402751', '2021-02-26 12:01:11.402751', 9, 85);
INSERT INTO `base_sys_role_menu` VALUES (161, '2021-02-26 14:16:49.162546', '2021-02-26 14:16:49.162546', 11, 1);
INSERT INTO `base_sys_role_menu` VALUES (162, '2021-02-26 14:16:49.257677', '2021-02-26 14:16:49.257677', 11, 96);
INSERT INTO `base_sys_role_menu` VALUES (163, '2021-02-26 14:16:49.356225', '2021-02-26 14:16:49.356225', 11, 45);
INSERT INTO `base_sys_role_menu` VALUES (164, '2021-02-26 14:16:49.450708', '2021-02-26 14:16:49.450708', 11, 43);
INSERT INTO `base_sys_role_menu` VALUES (165, '2021-02-26 14:16:49.543794', '2021-02-26 14:16:49.543794', 11, 49);
INSERT INTO `base_sys_role_menu` VALUES (166, '2021-02-26 14:16:49.636496', '2021-02-26 14:16:49.636496', 11, 86);
INSERT INTO `base_sys_role_menu` VALUES (167, '2021-02-26 14:16:49.728634', '2021-02-26 14:16:49.728634', 11, 47);
INSERT INTO `base_sys_role_menu` VALUES (168, '2021-02-26 14:16:49.824754', '2021-02-26 14:16:49.824754', 11, 48);
INSERT INTO `base_sys_role_menu` VALUES (169, '2021-02-26 14:16:49.919329', '2021-02-26 14:16:49.919329', 11, 85);
INSERT INTO `base_sys_role_menu` VALUES (170, '2021-02-26 14:16:50.015239', '2021-02-26 14:16:50.015239', 11, 84);
INSERT INTO `base_sys_role_menu` VALUES (290, '2021-02-26 14:32:35.143867', '2021-02-26 14:32:35.143867', 12, 1);
INSERT INTO `base_sys_role_menu` VALUES (291, '2021-02-26 14:32:35.239965', '2021-02-26 14:32:35.239965', 12, 96);
INSERT INTO `base_sys_role_menu` VALUES (292, '2021-02-26 14:32:35.336398', '2021-02-26 14:32:35.336398', 12, 45);
INSERT INTO `base_sys_role_menu` VALUES (293, '2021-02-26 14:32:35.435180', '2021-02-26 14:32:35.435180', 12, 43);
INSERT INTO `base_sys_role_menu` VALUES (294, '2021-02-26 14:32:35.528631', '2021-02-26 14:32:35.528631', 12, 49);
INSERT INTO `base_sys_role_menu` VALUES (295, '2021-02-26 14:32:35.623123', '2021-02-26 14:32:35.623123', 12, 86);
INSERT INTO `base_sys_role_menu` VALUES (296, '2021-02-26 14:32:35.718831', '2021-02-26 14:32:35.718831', 12, 2);
INSERT INTO `base_sys_role_menu` VALUES (297, '2021-02-26 14:32:35.812975', '2021-02-26 14:32:35.812975', 12, 27);
INSERT INTO `base_sys_role_menu` VALUES (298, '2021-02-26 14:32:35.904487', '2021-02-26 14:32:35.904487', 12, 97);
INSERT INTO `base_sys_role_menu` VALUES (299, '2021-02-26 14:32:35.998773', '2021-02-26 14:32:35.998773', 12, 59);
INSERT INTO `base_sys_role_menu` VALUES (300, '2021-02-26 14:32:36.107749', '2021-02-26 14:32:36.107749', 12, 60);
INSERT INTO `base_sys_role_menu` VALUES (301, '2021-02-26 14:32:36.213069', '2021-02-26 14:32:36.213069', 12, 61);
INSERT INTO `base_sys_role_menu` VALUES (302, '2021-02-26 14:32:36.308985', '2021-02-26 14:32:36.308985', 12, 62);
INSERT INTO `base_sys_role_menu` VALUES (303, '2021-02-26 14:32:36.404237', '2021-02-26 14:32:36.404237', 12, 63);
INSERT INTO `base_sys_role_menu` VALUES (304, '2021-02-26 14:32:36.499569', '2021-02-26 14:32:36.499569', 12, 65);
INSERT INTO `base_sys_role_menu` VALUES (305, '2021-02-26 14:32:36.593710', '2021-02-26 14:32:36.593710', 12, 98);
INSERT INTO `base_sys_role_menu` VALUES (306, '2021-02-26 14:32:36.685988', '2021-02-26 14:32:36.685988', 12, 99);
INSERT INTO `base_sys_role_menu` VALUES (307, '2021-02-26 14:32:36.778733', '2021-02-26 14:32:36.778733', 12, 100);
INSERT INTO `base_sys_role_menu` VALUES (308, '2021-02-26 14:32:36.874715', '2021-02-26 14:32:36.874715', 12, 101);
INSERT INTO `base_sys_role_menu` VALUES (309, '2021-02-26 14:32:36.973153', '2021-02-26 14:32:36.973153', 12, 8);
INSERT INTO `base_sys_role_menu` VALUES (310, '2021-02-26 14:32:37.082734', '2021-02-26 14:32:37.082734', 12, 10);
INSERT INTO `base_sys_role_menu` VALUES (311, '2021-02-26 14:32:37.176859', '2021-02-26 14:32:37.176859', 12, 11);
INSERT INTO `base_sys_role_menu` VALUES (312, '2021-02-26 14:32:37.271440', '2021-02-26 14:32:37.271440', 12, 12);
INSERT INTO `base_sys_role_menu` VALUES (313, '2021-02-26 14:32:37.365206', '2021-02-26 14:32:37.365206', 12, 13);
INSERT INTO `base_sys_role_menu` VALUES (314, '2021-02-26 14:32:37.457092', '2021-02-26 14:32:37.457092', 12, 22);
INSERT INTO `base_sys_role_menu` VALUES (315, '2021-02-26 14:32:37.549860', '2021-02-26 14:32:37.549860', 12, 23);
INSERT INTO `base_sys_role_menu` VALUES (316, '2021-02-26 14:32:37.645684', '2021-02-26 14:32:37.645684', 12, 24);
INSERT INTO `base_sys_role_menu` VALUES (317, '2021-02-26 14:32:37.743370', '2021-02-26 14:32:37.743370', 12, 25);
INSERT INTO `base_sys_role_menu` VALUES (318, '2021-02-26 14:32:37.837218', '2021-02-26 14:32:37.837218', 12, 26);
INSERT INTO `base_sys_role_menu` VALUES (319, '2021-02-26 14:32:37.930953', '2021-02-26 14:32:37.930953', 12, 69);
INSERT INTO `base_sys_role_menu` VALUES (320, '2021-02-26 14:32:38.031191', '2021-02-26 14:32:38.031191', 12, 70);
INSERT INTO `base_sys_role_menu` VALUES (321, '2021-02-26 14:32:38.130839', '2021-02-26 14:32:38.130839', 12, 71);
INSERT INTO `base_sys_role_menu` VALUES (322, '2021-02-26 14:32:38.229359', '2021-02-26 14:32:38.229359', 12, 72);
INSERT INTO `base_sys_role_menu` VALUES (323, '2021-02-26 14:32:38.323868', '2021-02-26 14:32:38.323868', 12, 73);
INSERT INTO `base_sys_role_menu` VALUES (324, '2021-02-26 14:32:38.415194', '2021-02-26 14:32:38.415194', 12, 74);
INSERT INTO `base_sys_role_menu` VALUES (325, '2021-02-26 14:32:38.505597', '2021-02-26 14:32:38.505597', 12, 75);
INSERT INTO `base_sys_role_menu` VALUES (326, '2021-02-26 14:32:38.600426', '2021-02-26 14:32:38.600426', 12, 76);
INSERT INTO `base_sys_role_menu` VALUES (327, '2021-02-26 14:32:38.698676', '2021-02-26 14:32:38.698676', 12, 77);
INSERT INTO `base_sys_role_menu` VALUES (328, '2021-02-26 14:32:38.793832', '2021-02-26 14:32:38.793832', 12, 78);
INSERT INTO `base_sys_role_menu` VALUES (329, '2021-02-26 14:32:38.889203', '2021-02-26 14:32:38.889203', 12, 79);
INSERT INTO `base_sys_role_menu` VALUES (330, '2021-02-26 14:32:38.985851', '2021-02-26 14:32:38.985851', 12, 80);
INSERT INTO `base_sys_role_menu` VALUES (331, '2021-02-26 14:32:39.092110', '2021-02-26 14:32:39.092110', 12, 81);
INSERT INTO `base_sys_role_menu` VALUES (332, '2021-02-26 14:32:39.188945', '2021-02-26 14:32:39.188945', 12, 82);
INSERT INTO `base_sys_role_menu` VALUES (333, '2021-02-26 14:32:39.280043', '2021-02-26 14:32:39.280043', 12, 83);
INSERT INTO `base_sys_role_menu` VALUES (334, '2021-02-26 14:32:39.374899', '2021-02-26 14:32:39.374899', 12, 105);
INSERT INTO `base_sys_role_menu` VALUES (335, '2021-02-26 14:32:39.473563', '2021-02-26 14:32:39.473563', 12, 102);
INSERT INTO `base_sys_role_menu` VALUES (336, '2021-02-26 14:32:39.570921', '2021-02-26 14:32:39.570921', 12, 103);
INSERT INTO `base_sys_role_menu` VALUES (337, '2021-02-26 14:32:39.665052', '2021-02-26 14:32:39.665052', 12, 29);
INSERT INTO `base_sys_role_menu` VALUES (338, '2021-02-26 14:32:39.760189', '2021-02-26 14:32:39.760189', 12, 30);
INSERT INTO `base_sys_role_menu` VALUES (339, '2021-02-26 14:32:39.852856', '2021-02-26 14:32:39.852856', 12, 47);
INSERT INTO `base_sys_role_menu` VALUES (340, '2021-02-26 14:32:39.944180', '2021-02-26 14:32:39.944180', 12, 48);
INSERT INTO `base_sys_role_menu` VALUES (341, '2021-02-26 14:32:40.038086', '2021-02-26 14:32:40.038086', 12, 84);
INSERT INTO `base_sys_role_menu` VALUES (342, '2021-02-26 14:32:40.135874', '2021-02-26 14:32:40.135874', 12, 90);
INSERT INTO `base_sys_role_menu` VALUES (343, '2021-02-26 14:32:40.234015', '2021-02-26 14:32:40.234015', 12, 85);
INSERT INTO `base_sys_role_menu` VALUES (355, '2021-02-26 14:32:54.538822', '2021-02-26 14:32:54.538822', 10, 1);
INSERT INTO `base_sys_role_menu` VALUES (356, '2021-02-26 14:32:54.634784', '2021-02-26 14:32:54.634784', 10, 96);
INSERT INTO `base_sys_role_menu` VALUES (357, '2021-02-26 14:32:54.732878', '2021-02-26 14:32:54.732878', 10, 45);
INSERT INTO `base_sys_role_menu` VALUES (358, '2021-02-26 14:32:54.826023', '2021-02-26 14:32:54.826023', 10, 43);
INSERT INTO `base_sys_role_menu` VALUES (359, '2021-02-26 14:32:54.920173', '2021-02-26 14:32:54.920173', 10, 49);
INSERT INTO `base_sys_role_menu` VALUES (360, '2021-02-26 14:32:55.019141', '2021-02-26 14:32:55.019141', 10, 86);
INSERT INTO `base_sys_role_menu` VALUES (361, '2021-02-26 14:32:55.119438', '2021-02-26 14:32:55.119438', 10, 2);
INSERT INTO `base_sys_role_menu` VALUES (362, '2021-02-26 14:32:55.211471', '2021-02-26 14:32:55.211471', 10, 27);
INSERT INTO `base_sys_role_menu` VALUES (363, '2021-02-26 14:32:55.304855', '2021-02-26 14:32:55.304855', 10, 97);
INSERT INTO `base_sys_role_menu` VALUES (364, '2021-02-26 14:32:55.397939', '2021-02-26 14:32:55.397939', 10, 59);
INSERT INTO `base_sys_role_menu` VALUES (365, '2021-02-26 14:32:55.491674', '2021-02-26 14:32:55.491674', 10, 60);
INSERT INTO `base_sys_role_menu` VALUES (366, '2021-02-26 14:32:55.584051', '2021-02-26 14:32:55.584051', 10, 61);
INSERT INTO `base_sys_role_menu` VALUES (367, '2021-02-26 14:32:55.676449', '2021-02-26 14:32:55.676449', 10, 62);
INSERT INTO `base_sys_role_menu` VALUES (368, '2021-02-26 14:32:55.774524', '2021-02-26 14:32:55.774524', 10, 63);
INSERT INTO `base_sys_role_menu` VALUES (369, '2021-02-26 14:32:55.871634', '2021-02-26 14:32:55.871634', 10, 65);
INSERT INTO `base_sys_role_menu` VALUES (370, '2021-02-26 14:32:55.964611', '2021-02-26 14:32:55.964611', 10, 98);
INSERT INTO `base_sys_role_menu` VALUES (371, '2021-02-26 14:32:56.074043', '2021-02-26 14:32:56.074043', 10, 99);
INSERT INTO `base_sys_role_menu` VALUES (372, '2021-02-26 14:32:56.169316', '2021-02-26 14:32:56.169316', 10, 100);
INSERT INTO `base_sys_role_menu` VALUES (373, '2021-02-26 14:32:56.263408', '2021-02-26 14:32:56.263408', 10, 101);
INSERT INTO `base_sys_role_menu` VALUES (374, '2021-02-26 14:32:56.356537', '2021-02-26 14:32:56.356537', 10, 8);
INSERT INTO `base_sys_role_menu` VALUES (375, '2021-02-26 14:32:56.448195', '2021-02-26 14:32:56.448195', 10, 10);
INSERT INTO `base_sys_role_menu` VALUES (376, '2021-02-26 14:32:56.544394', '2021-02-26 14:32:56.544394', 10, 11);
INSERT INTO `base_sys_role_menu` VALUES (377, '2021-02-26 14:32:56.641515', '2021-02-26 14:32:56.641515', 10, 12);
INSERT INTO `base_sys_role_menu` VALUES (378, '2021-02-26 14:32:56.735242', '2021-02-26 14:32:56.735242', 10, 13);
INSERT INTO `base_sys_role_menu` VALUES (379, '2021-02-26 14:32:56.828811', '2021-02-26 14:32:56.828811', 10, 22);
INSERT INTO `base_sys_role_menu` VALUES (380, '2021-02-26 14:32:56.922664', '2021-02-26 14:32:56.922664', 10, 23);
INSERT INTO `base_sys_role_menu` VALUES (381, '2021-02-26 14:32:57.016873', '2021-02-26 14:32:57.016873', 10, 24);
INSERT INTO `base_sys_role_menu` VALUES (382, '2021-02-26 14:32:57.123800', '2021-02-26 14:32:57.123800', 10, 25);
INSERT INTO `base_sys_role_menu` VALUES (383, '2021-02-26 14:32:57.223306', '2021-02-26 14:32:57.223306', 10, 26);
INSERT INTO `base_sys_role_menu` VALUES (384, '2021-02-26 14:32:57.328482', '2021-02-26 14:32:57.328482', 10, 69);
INSERT INTO `base_sys_role_menu` VALUES (385, '2021-02-26 14:32:57.430006', '2021-02-26 14:32:57.430006', 10, 70);
INSERT INTO `base_sys_role_menu` VALUES (386, '2021-02-26 14:32:57.521664', '2021-02-26 14:32:57.521664', 10, 71);
INSERT INTO `base_sys_role_menu` VALUES (387, '2021-02-26 14:32:57.612399', '2021-02-26 14:32:57.612399', 10, 72);
INSERT INTO `base_sys_role_menu` VALUES (388, '2021-02-26 14:32:57.705553', '2021-02-26 14:32:57.705553', 10, 73);
INSERT INTO `base_sys_role_menu` VALUES (389, '2021-02-26 14:32:57.799288', '2021-02-26 14:32:57.799288', 10, 74);
INSERT INTO `base_sys_role_menu` VALUES (390, '2021-02-26 14:32:57.893894', '2021-02-26 14:32:57.893894', 10, 75);
INSERT INTO `base_sys_role_menu` VALUES (391, '2021-02-26 14:32:57.988856', '2021-02-26 14:32:57.988856', 10, 76);
INSERT INTO `base_sys_role_menu` VALUES (392, '2021-02-26 14:32:58.090250', '2021-02-26 14:32:58.090250', 10, 77);
INSERT INTO `base_sys_role_menu` VALUES (393, '2021-02-26 14:32:58.196616', '2021-02-26 14:32:58.196616', 10, 78);
INSERT INTO `base_sys_role_menu` VALUES (394, '2021-02-26 14:32:58.288151', '2021-02-26 14:32:58.288151', 10, 79);
INSERT INTO `base_sys_role_menu` VALUES (395, '2021-02-26 14:32:58.378493', '2021-02-26 14:32:58.378493', 10, 80);
INSERT INTO `base_sys_role_menu` VALUES (396, '2021-02-26 14:32:58.471283', '2021-02-26 14:32:58.471283', 10, 81);
INSERT INTO `base_sys_role_menu` VALUES (397, '2021-02-26 14:32:58.564666', '2021-02-26 14:32:58.564666', 10, 82);
INSERT INTO `base_sys_role_menu` VALUES (398, '2021-02-26 14:32:58.658511', '2021-02-26 14:32:58.658511', 10, 83);
INSERT INTO `base_sys_role_menu` VALUES (399, '2021-02-26 14:32:58.752713', '2021-02-26 14:32:58.752713', 10, 105);
INSERT INTO `base_sys_role_menu` VALUES (400, '2021-02-26 14:32:58.849472', '2021-02-26 14:32:58.849472', 10, 102);
INSERT INTO `base_sys_role_menu` VALUES (401, '2021-02-26 14:32:58.948387', '2021-02-26 14:32:58.948387', 10, 103);
INSERT INTO `base_sys_role_menu` VALUES (402, '2021-02-26 14:32:59.042410', '2021-02-26 14:32:59.042410', 10, 29);
INSERT INTO `base_sys_role_menu` VALUES (403, '2021-02-26 14:32:59.132594', '2021-02-26 14:32:59.132594', 10, 30);
INSERT INTO `base_sys_role_menu` VALUES (404, '2021-02-26 14:32:59.226150', '2021-02-26 14:32:59.226150', 10, 47);
INSERT INTO `base_sys_role_menu` VALUES (405, '2021-02-26 14:32:59.319494', '2021-02-26 14:32:59.319494', 10, 48);
INSERT INTO `base_sys_role_menu` VALUES (406, '2021-02-26 14:32:59.413370', '2021-02-26 14:32:59.413370', 10, 84);
INSERT INTO `base_sys_role_menu` VALUES (407, '2021-02-26 14:32:59.507584', '2021-02-26 14:32:59.507584', 10, 90);
INSERT INTO `base_sys_role_menu` VALUES (408, '2021-02-26 14:32:59.604332', '2021-02-26 14:32:59.604332', 10, 85);
INSERT INTO `base_sys_role_menu` VALUES (463, '2021-02-26 14:33:49.310315', '2021-02-26 14:33:49.310315', 13, 1);
INSERT INTO `base_sys_role_menu` VALUES (464, '2021-02-26 14:33:49.403445', '2021-02-26 14:33:49.403445', 13, 96);
INSERT INTO `base_sys_role_menu` VALUES (465, '2021-02-26 14:33:49.496802', '2021-02-26 14:33:49.496802', 13, 45);
INSERT INTO `base_sys_role_menu` VALUES (466, '2021-02-26 14:33:49.595210', '2021-02-26 14:33:49.595210', 13, 43);
INSERT INTO `base_sys_role_menu` VALUES (467, '2021-02-26 14:33:49.688024', '2021-02-26 14:33:49.688024', 13, 49);
INSERT INTO `base_sys_role_menu` VALUES (468, '2021-02-26 14:33:49.781292', '2021-02-26 14:33:49.781292', 13, 86);
INSERT INTO `base_sys_role_menu` VALUES (469, '2021-02-26 14:33:49.874061', '2021-02-26 14:33:49.874061', 13, 2);
INSERT INTO `base_sys_role_menu` VALUES (470, '2021-02-26 14:33:49.965534', '2021-02-26 14:33:49.965534', 13, 27);
INSERT INTO `base_sys_role_menu` VALUES (471, '2021-02-26 14:33:50.072373', '2021-02-26 14:33:50.072373', 13, 97);
INSERT INTO `base_sys_role_menu` VALUES (472, '2021-02-26 14:33:50.176473', '2021-02-26 14:33:50.176473', 13, 59);
INSERT INTO `base_sys_role_menu` VALUES (473, '2021-02-26 14:33:50.272264', '2021-02-26 14:33:50.272264', 13, 60);
INSERT INTO `base_sys_role_menu` VALUES (474, '2021-02-26 14:33:50.370328', '2021-02-26 14:33:50.370328', 13, 61);
INSERT INTO `base_sys_role_menu` VALUES (475, '2021-02-26 14:33:50.463159', '2021-02-26 14:33:50.463159', 13, 62);
INSERT INTO `base_sys_role_menu` VALUES (476, '2021-02-26 14:33:50.557911', '2021-02-26 14:33:50.557911', 13, 63);
INSERT INTO `base_sys_role_menu` VALUES (477, '2021-02-26 14:33:50.650669', '2021-02-26 14:33:50.650669', 13, 65);
INSERT INTO `base_sys_role_menu` VALUES (478, '2021-02-26 14:33:50.742871', '2021-02-26 14:33:50.742871', 13, 98);
INSERT INTO `base_sys_role_menu` VALUES (479, '2021-02-26 14:33:50.838052', '2021-02-26 14:33:50.838052', 13, 99);
INSERT INTO `base_sys_role_menu` VALUES (480, '2021-02-26 14:33:50.932201', '2021-02-26 14:33:50.932201', 13, 100);
INSERT INTO `base_sys_role_menu` VALUES (481, '2021-02-26 14:33:51.030973', '2021-02-26 14:33:51.030973', 13, 101);
INSERT INTO `base_sys_role_menu` VALUES (482, '2021-02-26 14:33:51.168873', '2021-02-26 14:33:51.168873', 13, 8);
INSERT INTO `base_sys_role_menu` VALUES (483, '2021-02-26 14:33:51.265779', '2021-02-26 14:33:51.265779', 13, 10);
INSERT INTO `base_sys_role_menu` VALUES (484, '2021-02-26 14:33:51.379934', '2021-02-26 14:33:51.379934', 13, 11);
INSERT INTO `base_sys_role_menu` VALUES (485, '2021-02-26 14:33:51.473016', '2021-02-26 14:33:51.473016', 13, 12);
INSERT INTO `base_sys_role_menu` VALUES (486, '2021-02-26 14:33:51.568753', '2021-02-26 14:33:51.568753', 13, 13);
INSERT INTO `base_sys_role_menu` VALUES (487, '2021-02-26 14:33:51.667262', '2021-02-26 14:33:51.667262', 13, 22);
INSERT INTO `base_sys_role_menu` VALUES (488, '2021-02-26 14:33:51.761865', '2021-02-26 14:33:51.761865', 13, 23);
INSERT INTO `base_sys_role_menu` VALUES (489, '2021-02-26 14:33:51.857295', '2021-02-26 14:33:51.857295', 13, 24);
INSERT INTO `base_sys_role_menu` VALUES (490, '2021-02-26 14:33:51.951231', '2021-02-26 14:33:51.951231', 13, 25);
INSERT INTO `base_sys_role_menu` VALUES (491, '2021-02-26 14:33:52.047431', '2021-02-26 14:33:52.047431', 13, 26);
INSERT INTO `base_sys_role_menu` VALUES (492, '2021-02-26 14:33:52.141210', '2021-02-26 14:33:52.141210', 13, 69);
INSERT INTO `base_sys_role_menu` VALUES (493, '2021-02-26 14:33:52.236892', '2021-02-26 14:33:52.236892', 13, 70);
INSERT INTO `base_sys_role_menu` VALUES (494, '2021-02-26 14:33:52.332986', '2021-02-26 14:33:52.332986', 13, 71);
INSERT INTO `base_sys_role_menu` VALUES (495, '2021-02-26 14:33:52.432629', '2021-02-26 14:33:52.432629', 13, 72);
INSERT INTO `base_sys_role_menu` VALUES (496, '2021-02-26 14:33:52.529105', '2021-02-26 14:33:52.529105', 13, 73);
INSERT INTO `base_sys_role_menu` VALUES (497, '2021-02-26 14:33:52.625291', '2021-02-26 14:33:52.625291', 13, 74);
INSERT INTO `base_sys_role_menu` VALUES (498, '2021-02-26 14:33:52.721109', '2021-02-26 14:33:52.721109', 13, 75);
INSERT INTO `base_sys_role_menu` VALUES (499, '2021-02-26 14:33:52.813753', '2021-02-26 14:33:52.813753', 13, 76);
INSERT INTO `base_sys_role_menu` VALUES (500, '2021-02-26 14:33:52.905436', '2021-02-26 14:33:52.905436', 13, 77);
INSERT INTO `base_sys_role_menu` VALUES (501, '2021-02-26 14:33:52.998499', '2021-02-26 14:33:52.998499', 13, 78);
INSERT INTO `base_sys_role_menu` VALUES (502, '2021-02-26 14:33:53.100975', '2021-02-26 14:33:53.100975', 13, 79);
INSERT INTO `base_sys_role_menu` VALUES (503, '2021-02-26 14:33:53.199493', '2021-02-26 14:33:53.199493', 13, 80);
INSERT INTO `base_sys_role_menu` VALUES (504, '2021-02-26 14:33:53.294088', '2021-02-26 14:33:53.294088', 13, 81);
INSERT INTO `base_sys_role_menu` VALUES (505, '2021-02-26 14:33:53.391390', '2021-02-26 14:33:53.391390', 13, 82);
INSERT INTO `base_sys_role_menu` VALUES (506, '2021-02-26 14:33:53.486104', '2021-02-26 14:33:53.486104', 13, 83);
INSERT INTO `base_sys_role_menu` VALUES (507, '2021-02-26 14:33:53.578385', '2021-02-26 14:33:53.578385', 13, 105);
INSERT INTO `base_sys_role_menu` VALUES (508, '2021-02-26 14:33:53.670073', '2021-02-26 14:33:53.670073', 13, 102);
INSERT INTO `base_sys_role_menu` VALUES (509, '2021-02-26 14:33:53.763868', '2021-02-26 14:33:53.763868', 13, 103);
INSERT INTO `base_sys_role_menu` VALUES (510, '2021-02-26 14:33:53.860706', '2021-02-26 14:33:53.860706', 13, 29);
INSERT INTO `base_sys_role_menu` VALUES (511, '2021-02-26 14:33:53.959262', '2021-02-26 14:33:53.959262', 13, 30);
INSERT INTO `base_sys_role_menu` VALUES (512, '2021-02-26 14:33:54.064932', '2021-02-26 14:33:54.064932', 13, 47);
INSERT INTO `base_sys_role_menu` VALUES (513, '2021-02-26 14:33:54.168918', '2021-02-26 14:33:54.168918', 13, 48);
INSERT INTO `base_sys_role_menu` VALUES (514, '2021-02-26 14:33:54.273982', '2021-02-26 14:33:54.273982', 13, 84);
INSERT INTO `base_sys_role_menu` VALUES (515, '2021-02-26 14:33:54.366992', '2021-02-26 14:33:54.366992', 13, 90);
INSERT INTO `base_sys_role_menu` VALUES (516, '2021-02-26 14:33:54.458682', '2021-02-26 14:33:54.458682', 13, 85);
INSERT INTO `base_sys_role_menu` VALUES (517, '2022-03-18 08:49:17.483712', '2022-03-18 08:49:17.483712', 14, 150);
INSERT INTO `base_sys_role_menu` VALUES (518, '2022-03-18 08:49:17.494727', '2022-03-18 08:49:17.494727', 14, 214);
INSERT INTO `base_sys_role_menu` VALUES (519, '2022-03-18 08:49:17.506569', '2022-03-18 08:49:17.506569', 14, 215);
INSERT INTO `base_sys_role_menu` VALUES (520, '2022-03-18 08:49:17.518119', '2022-03-18 08:49:17.518119', 14, 216);
INSERT INTO `base_sys_role_menu` VALUES (521, '2022-03-18 08:49:17.531084', '2022-03-18 08:49:17.531084', 14, 217);
INSERT INTO `base_sys_role_menu` VALUES (522, '2022-03-18 08:49:17.541910', '2022-03-18 08:49:17.541910', 14, 218);
INSERT INTO `base_sys_role_menu` VALUES (523, '2022-03-18 08:49:17.556095', '2022-03-18 08:49:17.556095', 14, 219);
INSERT INTO `base_sys_role_menu` VALUES (524, '2022-03-18 08:49:17.598646', '2022-03-18 08:49:17.598646', 14, 220);
INSERT INTO `base_sys_role_menu` VALUES (525, '2022-03-18 08:49:17.642540', '2022-03-18 08:49:17.642540', 14, 235);
INSERT INTO `base_sys_role_menu` VALUES (526, '2022-03-18 08:49:17.668651', '2022-03-18 08:49:17.668651', 14, 236);
INSERT INTO `base_sys_role_menu` VALUES (527, '2022-03-18 08:49:17.679643', '2022-03-18 08:49:17.679643', 14, 237);
INSERT INTO `base_sys_role_menu` VALUES (528, '2022-03-18 08:49:17.690779', '2022-03-18 08:49:17.690779', 14, 238);
INSERT INTO `base_sys_role_menu` VALUES (529, '2022-03-18 08:49:17.700671', '2022-03-18 08:49:17.700671', 14, 239);
INSERT INTO `base_sys_role_menu` VALUES (530, '2022-03-18 08:49:17.712946', '2022-03-18 08:49:17.712946', 14, 240);
INSERT INTO `base_sys_role_menu` VALUES (531, '2022-03-18 08:49:17.722901', '2022-03-18 08:49:17.722901', 14, 241);
INSERT INTO `base_sys_role_menu` VALUES (532, '2022-03-18 08:49:17.743783', '2022-03-18 08:49:17.743783', 14, 242);
INSERT INTO `base_sys_role_menu` VALUES (533, '2022-03-18 08:49:17.754030', '2022-03-18 08:49:17.754030', 14, 251);
INSERT INTO `base_sys_role_menu` VALUES (534, '2022-03-18 08:49:17.766106', '2022-03-18 08:49:17.766106', 14, 252);
INSERT INTO `base_sys_role_menu` VALUES (535, '2022-03-18 08:49:17.775704', '2022-03-18 08:49:17.775704', 14, 253);
INSERT INTO `base_sys_role_menu` VALUES (536, '2022-03-18 08:49:17.787251', '2022-03-18 08:49:17.787251', 14, 254);
INSERT INTO `base_sys_role_menu` VALUES (537, '2022-03-18 08:49:17.798526', '2022-03-18 08:49:17.798526', 14, 255);
INSERT INTO `base_sys_role_menu` VALUES (538, '2022-03-18 08:49:17.809201', '2022-03-18 08:49:17.809201', 14, 256);
INSERT INTO `base_sys_role_menu` VALUES (539, '2022-03-18 08:49:17.821488', '2022-03-18 08:49:17.821488', 14, 257);
INSERT INTO `base_sys_role_menu` VALUES (540, '2022-03-18 08:49:17.834363', '2022-03-18 08:49:17.834363', 14, 265);
INSERT INTO `base_sys_role_menu` VALUES (541, '2022-03-18 08:49:17.848189', '2022-03-18 08:49:17.848189', 14, 266);
INSERT INTO `base_sys_role_menu` VALUES (542, '2022-03-18 08:49:17.861810', '2022-03-18 08:49:17.861810', 14, 267);
INSERT INTO `base_sys_role_menu` VALUES (543, '2022-03-18 08:49:17.883382', '2022-03-18 08:49:17.883382', 14, 268);
INSERT INTO `base_sys_role_menu` VALUES (544, '2022-03-18 08:49:17.894770', '2022-03-18 08:49:17.894770', 14, 269);
INSERT INTO `base_sys_role_menu` VALUES (545, '2022-03-18 08:49:17.905581', '2022-03-18 08:49:17.905581', 14, 270);
INSERT INTO `base_sys_role_menu` VALUES (546, '2022-03-18 08:49:17.919352', '2022-03-18 08:49:17.919352', 14, 271);
INSERT INTO `base_sys_role_menu` VALUES (547, '2022-03-18 08:49:17.929809', '2022-03-18 08:49:17.929809', 14, 293);
INSERT INTO `base_sys_role_menu` VALUES (548, '2022-03-18 08:49:17.938425', '2022-03-18 08:49:17.938425', 14, 294);
INSERT INTO `base_sys_role_menu` VALUES (549, '2022-03-18 08:49:17.953429', '2022-03-18 08:49:17.953429', 14, 295);
INSERT INTO `base_sys_role_menu` VALUES (550, '2022-03-18 08:49:17.962864', '2022-03-18 08:49:17.962864', 14, 296);
INSERT INTO `base_sys_role_menu` VALUES (551, '2022-03-18 08:49:17.973479', '2022-03-18 08:49:17.973479', 14, 297);
INSERT INTO `base_sys_role_menu` VALUES (552, '2022-03-18 08:49:17.982990', '2022-03-18 08:49:17.982990', 14, 298);
INSERT INTO `base_sys_role_menu` VALUES (553, '2022-03-18 08:49:17.994462', '2022-03-18 08:49:17.994462', 14, 299);
COMMIT;

-- ----------------------------
-- Table structure for base_sys_user
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_user`;
CREATE TABLE `base_sys_user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `username` varchar(100) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `passwordV` int NOT NULL DEFAULT '1' COMMENT '密码版本, 作用是改完密码，让原来的token失效',
  `nickName` varchar(255) DEFAULT NULL COMMENT '昵称',
  `headImg` varchar(255) DEFAULT NULL COMMENT '头像',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态 0:禁用 1：启用',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `departmentId` bigint DEFAULT NULL COMMENT '部门ID',
  `socketId` varchar(255) DEFAULT NULL COMMENT 'socketId',
  `typeStatus` tinyint NOT NULL DEFAULT '0' COMMENT '前台 0:前台 1：后台',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_469ad55973f5b98930f6ad627b` (`username`),
  KEY `IDX_9ec6d7ac6337eafb070e4881a8` (`phone`),
  KEY `IDX_ca8611d15a63d52aa4e292e46a` (`createTime`),
  KEY `IDX_a0f2f19cee18445998ece93ddd` (`updateTime`),
  KEY `IDX_0cf944da378d70a94f5fefd803` (`departmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of base_sys_user
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_user` VALUES (1, '2021-02-24 21:16:41.525157', '2022-02-12 08:57:02.627525', '超级管理员', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 4, '管理员', 'https://cool-admin-pro.oss-cn-shanghai.aliyuncs.com/app/c8128c24-d0e9-4e07-9c0d-6f65446e105b.png', '18000000000', 'team@cool-js.com', 1, '拥有最高权限的用户', NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (24, '2021-02-26 14:17:38.000000', '2021-02-26 14:17:38.000000', '小白', 'xiaobai', 'e10adc3949ba59abbe56e057f20f883e', 1, '小白', NULL, NULL, NULL, 1, NULL, NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (25, '2021-02-26 14:28:25.000000', '2021-02-26 14:28:25.000000', '小黑', 'xiaohei', 'e10adc3949ba59abbe56e057f20f883e', 1, '小黑', NULL, NULL, NULL, 1, NULL, NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (26, '2021-02-26 14:28:49.000000', '2021-02-26 14:28:49.000000', '小绿', 'xiaolv', 'e10adc3949ba59abbe56e057f20f883e', 1, '小绿', NULL, NULL, NULL, 1, NULL, NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (27, '2021-02-26 14:29:23.000000', '2021-02-26 14:29:23.000000', '小青', 'xiaoqin', 'e10adc3949ba59abbe56e057f20f883e', 1, '小青', NULL, NULL, NULL, 1, NULL, NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (28, '2021-02-26 14:29:52.000000', '2021-12-15 09:52:18.000000', '神仙都没用11', 'icssoa', 'e10adc3949ba59abbe56e057f20f883e', 1, '神仙都没用', 'https://cool-admin.cn.utools.club/uploads//20210226/0eeab9a0-77fc-11eb-b64f-674cd46b6601.jpg', NULL, NULL, 1, NULL, NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (29, '2022-01-25 10:39:24.332308', '2022-01-25 10:39:24.332308', 'ddd', 'dddd', 'ef800207a3648c7c1ef3e9fe544f17f0', 1, 'ddddd', NULL, '18203600579', NULL, 1, NULL, 1, NULL, 0);
INSERT INTO `base_sys_user` VALUES (33, '2022-01-25 10:57:45.548453', '2022-01-25 10:57:45.548453', NULL, 'test0199', '202cb962ac59075b964b07152d234b70', 1, NULL, NULL, NULL, NULL, 1, '前台', NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (35, '2022-01-25 16:56:08.626339', '2022-01-25 16:56:08.626339', NULL, 'ssss1', 'e2959075648b2249bcb35efa4e292dda', 1, NULL, NULL, NULL, NULL, 1, '前台', NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (36, '2022-01-25 16:56:58.745024', '2022-01-25 16:56:58.745024', NULL, 'ssss2', 'e2959075648b2249bcb35efa4e292dda', 1, NULL, NULL, NULL, NULL, 1, '前台', NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (37, '2022-01-25 16:57:09.879682', '2022-01-25 16:57:09.879682', NULL, 'ssss3', 'e2959075648b2249bcb35efa4e292dda', 1, NULL, NULL, NULL, NULL, 1, '前台', NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (39, '2022-01-26 10:12:46.604476', '2022-01-26 10:12:46.604476', NULL, 'ioioio', 'e10adc3949ba59abbe56e057f20f883e', 1, NULL, NULL, NULL, NULL, 1, '前台', NULL, NULL, 0);
INSERT INTO `base_sys_user` VALUES (40, '2022-01-26 10:30:51.695751', '2022-02-11 11:17:51.000000', NULL, 'yyyy', '96e79218965eb72c92a549dd5a330112', 1, NULL, NULL, NULL, NULL, 1, '前台', 13, NULL, 0);
INSERT INTO `base_sys_user` VALUES (41, '2022-03-18 08:48:41.000000', '2022-03-18 08:48:41.000000', 'orgloom', 'orgloom', '94e8cde4612b3fd390677d42e7b22002', 1, 'orgloom', 'http://124.221.92.90:9998/uploads/20220318/0d116ec0-a655-11ec-9fdf-ab6bca3143c5.png', NULL, NULL, 1, NULL, 1, NULL, 0);
INSERT INTO `base_sys_user` VALUES (42, '2022-04-14 09:55:49.582636', '2022-04-14 09:55:49.582636', NULL, 'tianqi', 'ca2c54905f2b6cb70c0c53e972ac172b', 1, NULL, NULL, '13674968429', NULL, 1, '前台', NULL, NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for base_sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_user_role`;
CREATE TABLE `base_sys_user_role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `userId` bigint NOT NULL COMMENT '用户ID',
  `roleId` bigint NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`),
  KEY `IDX_fa9555e03e42fce748c9046b1c` (`createTime`),
  KEY `IDX_3e36c0d2b1a4c659c6b4fc64b3` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of base_sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_user_role` VALUES (1, '2021-02-24 22:03:11.665805', '2021-02-24 22:03:11.665805', 1, 1);
INSERT INTO `base_sys_user_role` VALUES (2, '2021-02-25 11:03:55.325988', '2021-02-25 11:03:55.325988', 2, 1);
INSERT INTO `base_sys_user_role` VALUES (3, '2021-02-25 14:30:57.295150', '2021-02-25 14:30:57.295150', 3, 1);
INSERT INTO `base_sys_user_role` VALUES (4, '2021-02-25 14:39:32.975014', '2021-02-25 14:39:32.975014', 4, 1);
INSERT INTO `base_sys_user_role` VALUES (5, '2021-02-25 14:40:56.812948', '2021-02-25 14:40:56.812948', 5, 1);
INSERT INTO `base_sys_user_role` VALUES (6, '2021-02-25 14:44:08.436555', '2021-02-25 14:44:08.436555', 6, 1);
INSERT INTO `base_sys_user_role` VALUES (7, '2021-02-25 14:46:17.409232', '2021-02-25 14:46:17.409232', 7, 1);
INSERT INTO `base_sys_user_role` VALUES (8, '2021-02-25 14:47:47.211749', '2021-02-25 14:47:47.211749', 8, 1);
INSERT INTO `base_sys_user_role` VALUES (9, '2021-02-25 14:48:11.734024', '2021-02-25 14:48:11.734024', 9, 1);
INSERT INTO `base_sys_user_role` VALUES (10, '2021-02-25 14:50:48.288616', '2021-02-25 14:50:48.288616', 10, 1);
INSERT INTO `base_sys_user_role` VALUES (11, '2021-02-25 14:51:32.123884', '2021-02-25 14:51:32.123884', 11, 1);
INSERT INTO `base_sys_user_role` VALUES (12, '2021-02-25 15:46:26.356943', '2021-02-25 15:46:26.356943', 12, 1);
INSERT INTO `base_sys_user_role` VALUES (13, '2021-02-25 15:56:43.475155', '2021-02-25 15:56:43.475155', 13, 1);
INSERT INTO `base_sys_user_role` VALUES (14, '2021-02-25 16:03:14.417784', '2021-02-25 16:03:14.417784', 14, 1);
INSERT INTO `base_sys_user_role` VALUES (16, '2021-02-25 16:22:11.200152', '2021-02-25 16:22:11.200152', 16, 1);
INSERT INTO `base_sys_user_role` VALUES (17, '2021-02-25 17:44:37.635550', '2021-02-25 17:44:37.635550', 15, 1);
INSERT INTO `base_sys_user_role` VALUES (19, '2021-02-25 17:51:00.554812', '2021-02-25 17:51:00.554812', 18, 1);
INSERT INTO `base_sys_user_role` VALUES (21, '2021-02-25 17:54:41.375113', '2021-02-25 17:54:41.375113', 17, 1);
INSERT INTO `base_sys_user_role` VALUES (22, '2021-02-25 17:55:49.385301', '2021-02-25 17:55:49.385301', 20, 1);
INSERT INTO `base_sys_user_role` VALUES (24, '2021-02-25 17:58:35.452363', '2021-02-25 17:58:35.452363', 22, 1);
INSERT INTO `base_sys_user_role` VALUES (27, '2021-02-25 21:25:55.005236', '2021-02-25 21:25:55.005236', 19, 1);
INSERT INTO `base_sys_user_role` VALUES (28, '2021-02-26 13:50:05.633242', '2021-02-26 13:50:05.633242', 21, 8);
INSERT INTO `base_sys_user_role` VALUES (29, '2021-02-26 13:50:17.836990', '2021-02-26 13:50:17.836990', 23, 8);
INSERT INTO `base_sys_user_role` VALUES (38, '2021-02-26 14:36:08.899046', '2021-02-26 14:36:08.899046', 26, 13);
INSERT INTO `base_sys_user_role` VALUES (39, '2021-02-26 14:36:13.149510', '2021-02-26 14:36:13.149510', 25, 13);
INSERT INTO `base_sys_user_role` VALUES (40, '2021-02-26 14:36:20.737073', '2021-02-26 14:36:20.737073', 27, 11);
INSERT INTO `base_sys_user_role` VALUES (42, '2021-02-26 14:36:53.481478', '2021-02-26 14:36:53.481478', 24, 12);
INSERT INTO `base_sys_user_role` VALUES (45, '2021-12-15 09:52:18.986628', '2021-12-15 09:52:18.986628', 28, 12);
INSERT INTO `base_sys_user_role` VALUES (46, '2021-12-15 09:52:19.024061', '2021-12-15 09:52:19.024061', 28, 10);
INSERT INTO `base_sys_user_role` VALUES (47, '2022-01-25 10:39:24.453120', '2022-01-25 10:39:24.453120', 29, 11);
INSERT INTO `base_sys_user_role` VALUES (49, '2022-03-18 08:49:29.058703', '2022-03-18 08:49:29.058703', 41, 14);
COMMIT;

-- ----------------------------
-- Table structure for core_config
-- ----------------------------
DROP TABLE IF EXISTS `core_config`;
CREATE TABLE `core_config` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `cKey` varchar(255) NOT NULL COMMENT '配置键 唯一性',
  `cValue` text NOT NULL COMMENT '配置值',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fd61f44f8fc57eaf4694a4fd56` (`cKey`),
  KEY `IDX_bd838f3b2d5bfa596c57412646` (`createTime`),
  KEY `IDX_ad74623a3e9a43335eac8d1154` (`updateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for core_module
-- ----------------------------
DROP TABLE IF EXISTS `core_module`;
CREATE TABLE `core_module` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(255) NOT NULL COMMENT '模块名称',
  `dbInit` tinyint NOT NULL DEFAULT '0' COMMENT '是否初始化数据库 0：否 1：是',
  `allConfig` text COMMENT '配置所有',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bb5e1af48c40f92cf059d45d56` (`name`),
  KEY `IDX_b3a06b55a1bbed1dbf9110ba5f` (`createTime`),
  KEY `IDX_3660f389f2b8204a9ae3d0da08` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of core_module
-- ----------------------------
BEGIN;
INSERT INTO `core_module` VALUES (1, '2021-12-15 09:49:22.758376', '2021-12-15 09:49:22.758376', 'base', 1, '{\"name\":\"权限管理\",\"description\":\"基础的权限管理功能，包括登录，权限校验\",\"globalMiddlewares\":[\"baseAuthorityMiddleware\",\"baseLogMiddleware\"],\"jwt\":{\"secret\":\"FOAPOFALOEQIPNNLQ\",\"token\":{\"expire\":7200,\"refreshExpire\":1296000}}}');
INSERT INTO `core_module` VALUES (2, '2021-12-15 09:49:22.782691', '2021-12-15 09:49:22.782691', 'demo', 0, '{\"name\":\"测试模块\",\"description\":\"演示示例\",\"middlewares\":[\"testMiddleware\"],\"globalMiddlewares\":[\"demoUserMiddleware\"]}');
INSERT INTO `core_module` VALUES (3, '2021-12-15 09:49:22.800522', '2021-12-15 09:49:22.800522', 'space', 0, '{\"name\":\"文件空间\",\"description\":\"上传和管理文件资源\",\"middlewares\":[]}');
INSERT INTO `core_module` VALUES (4, '2021-12-15 09:49:22.813358', '2021-12-15 09:49:22.813358', 'task', 1, '{\"name\":\"任务调度\",\"description\":\"任务调度模块，支持分布式任务，由redis整个集群的任务\",\"middlewares\":[]}');
INSERT INTO `core_module` VALUES (5, '2021-12-16 11:18:43.400581', '2021-12-16 11:18:43.400581', 'news', 0, '{\"name\":\"news\",\"description\":\"简单新闻模块\",\"middlewares\":[],\"globalMiddlewares\":[]}');
INSERT INTO `core_module` VALUES (6, '2021-12-17 09:35:53.377561', '2021-12-17 10:06:57.000000', 'jingwai', 0, '{\"name\":\"jingwai\",\"description\":\"模块\",\"middlewares\":[],\"globalMiddlewares\":[]}');
COMMIT;

-- ----------------------------
-- Table structure for core_plugin
-- ----------------------------
DROP TABLE IF EXISTS `core_plugin`;
CREATE TABLE `core_plugin` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `author` varchar(255) NOT NULL COMMENT '作者',
  `contact` varchar(255) NOT NULL COMMENT '联系方式',
  `description` text NOT NULL COMMENT '功能描述',
  `version` varchar(255) NOT NULL COMMENT '版本号',
  `enable` tinyint NOT NULL DEFAULT '1' COMMENT '是否启用 0：否 1：是',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '状态 0:缺少配置 1:可用 2: 配置错误 3:未知错误',
  `namespace` varchar(255) NOT NULL COMMENT '命名空间',
  `view` text COMMENT '页面信息',
  `providerId` varchar(255) DEFAULT NULL COMMENT '实例ID',
  `replaceProvider` varchar(255) DEFAULT NULL COMMENT '替换的实例',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_eecfe4f7cae1c102745ffccb9d` (`name`),
  KEY `IDX_851967f56db40707b8a55914d7` (`createTime`),
  KEY `IDX_b9880bb45d647eba03fc3052c4` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of core_plugin
-- ----------------------------
BEGIN;
INSERT INTO `core_plugin` VALUES (1, '2021-12-15 09:49:23.284703', '2022-05-06 17:05:00.000000', '阿里云OSS', 'cool官方', '邮箱：team@cool-js.com', '将文件上传到阿里云oss，前端签名直传方式', '4.0.3', 1, 0, 'oss', '[{\n    \"label\": \"accessKeyId\",\n    \"prop\": \"accessKeyId\",\n    \"component\": {\n        \"name\": \"el-input\",\n        \"attrs\": {\n            \"placeholder\": \"阿里云accessKeyId\"\n        }\n    },\n    \"props\": {\n        \"label-width\": \"130px\"\n    },\n    \"rules\": {\n        \"required\": true,\n        \"message\": \"值不能为空\"\n    }\n}, {\n    \"label\": \"accessKeySecret\",\n    \"prop\": \"accessKeySecret\",\n    \"component\": {\n        \"name\": \"el-input\",\n        \"attrs\": {\n            \"placeholder\": \"阿里云accessKeySecret\"\n        }\n    },\n    \"props\": {\n        \"label-width\": \"130px\"\n    },\n    \"rules\": {\n        \"required\": true,\n        \"message\": \"值不能为空\"\n    }\n}, {\n    \"label\": \"bucket\",\n    \"prop\": \"bucket\",\n    \"component\": {\n        \"name\": \"el-input\",\n        \"attrs\": {\n            \"placeholder\": \"阿里云oss的bucket\"\n        }\n    },\n    \"props\": {\n        \"label-width\": \"130px\"\n    },\n    \"rules\": {\n        \"required\": true,\n        \"message\": \"值不能为空\"\n    }\n}, {\n    \"label\": \"endpoint\",\n    \"prop\": \"endpoint\",\n    \"component\": {\n        \"name\": \"el-input\",\n        \"attrs\": {\n            \"placeholder\": \"阿里云oss的endpoint\"\n        }\n    },\n    \"props\": {\n        \"label-width\": \"130px\"\n    },\n    \"rules\": {\n        \"required\": true,\n        \"message\": \"值不能为空\"\n    }\n}, {\n    \"label\": \"timeout\",\n    \"prop\": \"timeout\",\n    \"value\": \"3600s\",\n    \"component\": {\n        \"name\": \"el-input\",\n        \"attrs\": {\n            \"placeholder\": \"阿里云oss的timeout\"\n        }\n    },\n    \"props\": {\n        \"label-width\": \"130px\"\n    },\n    \"rules\": {\n        \"required\": true,\n        \"message\": \"值不能为空\"\n    }\n}]', 'oss:ossFileHandler', 'coolFile');
COMMIT;

-- ----------------------------
-- Table structure for demo_app_goods
-- ----------------------------
DROP TABLE IF EXISTS `demo_app_goods`;
CREATE TABLE `demo_app_goods` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `pic` varchar(255) NOT NULL COMMENT '图片',
  `price` decimal(5,2) NOT NULL COMMENT '价格',
  PRIMARY KEY (`id`),
  KEY `IDX_de2b99b64158bb4030487d7475` (`createTime`),
  KEY `IDX_f84cff6dc28b1a5dcc53856e66` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of demo_app_goods
-- ----------------------------
BEGIN;
INSERT INTO `demo_app_goods` VALUES (1, '2021-03-02 17:22:10.687462', '2021-03-02 17:22:10.687462', 'cool-mall商城', 'https://docs.cool-js.com/mall/show05.jpeg', 20.00);
COMMIT;

-- ----------------------------
-- Table structure for demo_goods
-- ----------------------------
DROP TABLE IF EXISTS `demo_goods`;
CREATE TABLE `demo_goods` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `pic` varchar(255) NOT NULL COMMENT '图片',
  `price` decimal(5,2) NOT NULL COMMENT '价格',
  `type` tinyint NOT NULL COMMENT '分类',
  PRIMARY KEY (`id`),
  KEY `IDX_5075bf301ed9c39b5ca534231c` (`createTime`),
  KEY `IDX_82703e0477d1219261277df718` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of demo_goods
-- ----------------------------
BEGIN;
INSERT INTO `demo_goods` VALUES (1, '2021-12-17 13:50:42.956853', '2021-12-17 13:50:42.956853', '1', '1', 1.00, 1);
COMMIT;

-- ----------------------------
-- Table structure for demo_user
-- ----------------------------
DROP TABLE IF EXISTS `demo_user`;
CREATE TABLE `demo_user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `headImg` varchar(255) NOT NULL COMMENT '头像',
  `name` varchar(255) NOT NULL COMMENT '姓名',
  `age` int NOT NULL COMMENT '年龄',
  `birthDate` datetime NOT NULL COMMENT '出生日期',
  `type` tinyint NOT NULL DEFAULT '0' COMMENT '性别 0-未知 1-男 2-女',
  `introduce` varchar(255) DEFAULT NULL COMMENT '介绍',
  PRIMARY KEY (`id`),
  KEY `IDX_64572b861ca6e0df8c3c962a4d` (`createTime`),
  KEY `IDX_ac3ae77a9a240bfd29c1041d7f` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of demo_user
-- ----------------------------
BEGIN;
INSERT INTO `demo_user` VALUES (2, '2021-12-16 12:28:50.589009', '2021-12-16 12:28:50.589009', 'http://127.0.0.1:8001/uploads/20211216/a2c2f030-5e28-11ec-bb04-359ec07bcc98.png', '你好你好', 122, '2021-12-28 00:00:00', 2, '<p>d\'d\'d</p>');
COMMIT;

-- ----------------------------
-- Table structure for news-articles
-- ----------------------------
DROP TABLE IF EXISTS `news-articles`;
CREATE TABLE `news-articles` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `user_id` int NOT NULL COMMENT '作者ID',
  `category_id` int DEFAULT NULL COMMENT '分类ID',
  `tiele` varchar(255) NOT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '文章内容',
  `excerpt` varchar(255) DEFAULT NULL COMMENT '文章摘录',
  `article_status` tinyint NOT NULL DEFAULT '0' COMMENT '文章状态：0 草稿箱 1 已发布',
  `view_count` int NOT NULL DEFAULT '0' COMMENT '阅读数量',
  `like_count` int NOT NULL DEFAULT '0' COMMENT '喜欢数、点赞数',
  `is_sticky` tinyint NOT NULL DEFAULT '0' COMMENT '是否置顶',
  `is_essence` tinyint NOT NULL DEFAULT '0' COMMENT '阅读加精',
  `comment_status` tinyint NOT NULL DEFAULT '1' COMMENT '评论状态：0 关闭 1 开放',
  `comment_count` int NOT NULL DEFAULT '0' COMMENT '评论数量',
  `last_comment_user_id` int DEFAULT NULL COMMENT '最后回复用户 id',
  PRIMARY KEY (`id`),
  KEY `IDX_95003db4e2ef5645dfd5d0f150` (`createTime`),
  KEY `IDX_4b18f3439f5f9bed103862f929` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of news-articles
-- ----------------------------
BEGIN;
INSERT INTO `news-articles` VALUES (1, '2021-12-16 12:46:53.770969', '2021-12-16 12:46:53.770969', 1, 10, 'ss', '<p>ss</p>', 'sss', 1, 10, 10, 0, 0, 1, 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for news-categories
-- ----------------------------
DROP TABLE IF EXISTS `news-categories`;
CREATE TABLE `news-categories` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(255) NOT NULL COMMENT '类别名称',
  `description` varchar(255) NOT NULL COMMENT '类别描述',
  `icon` varchar(255) NOT NULL COMMENT '类别图标地址',
  `sort` int DEFAULT NULL COMMENT '类别显示顺序',
  `article_count` int DEFAULT NULL COMMENT '该类别下文章数量',
  PRIMARY KEY (`id`),
  KEY `IDX_d7fab378a651660a34ee0c7be1` (`createTime`),
  KEY `IDX_75405a4ebc227c3a295a2ea13c` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of news-categories
-- ----------------------------
BEGIN;
INSERT INTO `news-categories` VALUES (1, '2021-12-16 12:35:03.980623', '2021-12-16 12:35:03.980623', '是是是', '<p>三生三世</p>', 'http://127.0.0.1:8001/uploads/20211216/86fa8d80-5e29-11ec-bb04-359ec07bcc98.png', 11, 122);
INSERT INTO `news-categories` VALUES (2, '2021-12-16 12:36:59.561131', '2021-12-16 12:36:59.561131', 's\'s\'s', '<p>是是是</p>', 'http://127.0.0.1:8001/uploads/20211216/cc9acd50-5e29-11ec-a26e-43983c35b44b.png', 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for t_advise
-- ----------------------------
DROP TABLE IF EXISTS `t_advise`;
CREATE TABLE `t_advise` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `orgId` bigint DEFAULT NULL COMMENT '组织ID',
  `orgName` varchar(255) DEFAULT NULL COMMENT '当前组织名称',
  `adviseClassify` tinyint DEFAULT NULL COMMENT '建议分类 0-不知道 1-此人已不在这个公司 2-就是我请求移除 3-其他',
  `adviseRemark` varchar(255) DEFAULT NULL COMMENT '描述',
  `setClassify` tinyint DEFAULT NULL COMMENT '处理分类 0-未处理 1-处理中 2-已处理 3-其他',
  `setRemark` varchar(255) DEFAULT NULL COMMENT '处理描述',
  `companyId` bigint DEFAULT NULL COMMENT '公司ID',
  `companyName` varchar(255) DEFAULT NULL COMMENT '公司名称',
  PRIMARY KEY (`id`),
  KEY `IDX_13460ddfcc52096c67813ac7d2` (`createTime`),
  KEY `IDX_aefd74d9294b448d4588ef9840` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_advise
-- ----------------------------
BEGIN;
INSERT INTO `t_advise` VALUES (9, '2022-03-17 00:27:43.742000', '2022-03-17 00:27:43.742000', 14, '姚红超', 3, '信息怎么来的呢', NULL, NULL, 11, '河南中钢网电子商务有限公司');
COMMIT;

-- ----------------------------
-- Table structure for t_company
-- ----------------------------
DROP TABLE IF EXISTS `t_company`;
CREATE TABLE `t_company` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `website` varchar(255) DEFAULT NULL COMMENT '网站',
  `address` varchar(255) DEFAULT NULL COMMENT '位置',
  `begindate` datetime DEFAULT NULL COMMENT '成立时间',
  `industryClassify` tinyint DEFAULT NULL COMMENT '行业 0-互联网 1-金融 2-制造 3-医疗 4-地产 5-其他',
  `employeesClassify` tinyint DEFAULT NULL COMMENT '员工数目 0-1~50 1-50~200 2-200~1000 3-1000~10000 4-10000+',
  `logoIcon` varchar(255) DEFAULT NULL COMMENT 'Logo',
  `visionRemark` varchar(255) DEFAULT NULL COMMENT '愿景',
  `followCount` int DEFAULT NULL COMMENT '关注数目',
  `wxIndexSignClassify` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_f308ba65a1aa984f8889499745` (`createTime`),
  KEY `IDX_2266b96ee18f04100afb1647ee` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_company
-- ----------------------------
BEGIN;
INSERT INTO `t_company` VALUES (5, '2021-12-23 10:39:13.177859', '2022-03-24 10:37:52.960867', '宇通客车股份有限公司', '<p><br></p>', 'http://www.yutong.com/', '郑州', '1993-02-28 00:00:00', 2, 4, 'https://www.orgloom.cc/uploads/20220305/08b04880-9bd6-11ec-8e87-8f9671a0b7d9.png', '宇通，为美好出行；中国客车行业上市公司 ，集客车产品研发、制造与销售为一体，产品主要服务于公交、客运、旅游、团体、校车及专用出行等细分市场。', 30, NULL);
INSERT INTO `t_company` VALUES (6, '2021-12-23 14:50:13.972929', '2022-05-05 01:59:21.477000', '郑州画作股份有限公司', '<p><br></p>', 'web.orgloom.cc', '郑州市', '2021-12-24 00:00:00', 0, 0, 'https://www.orgloom.cc/uploads/20220304/89ba40c0-9b95-11ec-8e87-8f9671a0b7d9.png', 'WEB3理念下的全员轻连接及未来开放组织探索的开创者', 60, NULL);
INSERT INTO `t_company` VALUES (7, '2022-03-04 16:37:26.115000', '2022-03-24 10:37:52.960867', '中原银行股份有限公司', NULL, 'http://www.zybank.com.cn/', '郑州', '2014-08-28 00:00:00', 1, 3, 'https://www.orgloom.cc/uploads/20220305/250d9b60-9bd9-11ec-8e87-8f9671a0b7d9.jpeg', '中原银行，中原人民自己的银行', 20, NULL);
INSERT INTO `t_company` VALUES (8, '2022-03-04 16:48:04.586000', '2022-03-24 10:37:52.960867', '河南中原消费金融股份有限公司', NULL, 'https://www.hnzycfc.com/', '郑州', '2016-12-20 00:00:00', 1, 2, 'https://www.orgloom.cc/uploads/20220305/4f7116b0-9bda-11ec-8e87-8f9671a0b7d9.png', '面向个人消费者提供消费贷款+消费分期服务，以实际行动践行“普惠金融”。', 12, NULL);
INSERT INTO `t_company` VALUES (9, '2022-03-04 16:55:44.976000', '2022-03-24 10:37:52.960867', '郑州银行股份有限公司', NULL, 'http://www.zzbank.cn/', '郑州', '1996-11-16 00:00:00', 1, 2, 'https://www.orgloom.cc/uploads/20220305/4e9a2cc0-9bdc-11ec-8e87-8f9671a0b7d9.png', '郑州银行，中意你我他', 14, NULL);
INSERT INTO `t_company` VALUES (10, '2022-03-05 00:45:16.949000', '2022-03-24 10:37:52.960867', '郑州时空隧道信息技术有限公司', NULL, 'https://www.uupt.com/', '郑州', '2015-10-29 00:00:00', 0, 2, 'https://www.orgloom.cc/uploads/20220305/641560b0-9c1d-11ec-8e87-8f9671a0b7d9.png', '同城急事，找UU跑腿', 16, NULL);
INSERT INTO `t_company` VALUES (11, '2022-03-05 01:08:35.922000', '2022-03-24 10:37:52.960867', '河南中钢网电子商务有限公司', NULL, 'https://www.zgw.com/', '郑州', '2009-07-07 00:00:00', 0, 1, 'https://www.orgloom.cc/uploads/20220305/668288c0-9c20-11ec-8e87-8f9671a0b7d9.png', '买卖钢材，就上中钢网', 11, NULL);
INSERT INTO `t_company` VALUES (12, '2022-03-19 14:02:45.701000', '2022-03-24 10:37:52.960867', '正数网络技术有限公司', NULL, 'http://www.zsnetwork.com/', '郑州', '2020-08-01 00:00:00', 0, 1, 'https://www.orgloom.cc/uploads/20220319/24a0d470-a78d-11ec-9fdf-ab6bca3143c5.png', '成为数字政府建设专家', 13, NULL);
INSERT INTO `t_company` VALUES (13, '2022-03-19 14:17:10.164000', '2022-03-24 10:37:52.960867', '河南酒便利商业股份有限公司', NULL, 'https://www.9bianli.com/', '郑州', '2010-04-22 00:00:00', 0, 1, 'https://www.orgloom.cc/uploads/20220319/0bcd0430-a78f-11ec-9fdf-ab6bca3143c5.png', '成为世界一流的酒类零售品牌', 16, NULL);
INSERT INTO `t_company` VALUES (14, '2022-03-19 14:27:22.466000', '2022-03-24 10:37:52.960867', '建业住宅集团（中国）有限公司', NULL, ' www.centralchina.com', '郑州', '1992-02-04 00:00:00', 4, 3, 'https://www.orgloom.cc/uploads/20220319/94a3e160-a790-11ec-9fdf-ab6bca3143c5.png', '让中原人民都过上好生活，致力于“做中原城市化进程和社会全面进步的推动者”', 19, NULL);
INSERT INTO `t_company` VALUES (15, '2022-03-19 14:33:51.551000', '2022-03-24 10:37:52.960867', '蜜雪冰城股份有限公司', NULL, 'https://www.mxbc.com/', '郑州', '1997-03-07 00:00:00', 5, 2, 'https://www.orgloom.cc/uploads/20220319/86513c10-a791-11ec-9fdf-ab6bca3143c5.png', '专为年轻人打造新鲜冰淇淋与茶饮的全国连锁品牌，致力于推动全球冰淇淋与茶饮行业更好、更快的发展！', 6, NULL);
INSERT INTO `t_company` VALUES (16, '2022-03-19 14:36:00.725000', '2022-03-24 10:37:52.960867', '三全食品股份有限公司', NULL, 'https://www.sanquan.com/', '郑州', '1992-02-04 00:00:00', 5, 3, 'https://www.orgloom.cc/uploads/20220319/cb2922d0-a791-11ec-9fdf-ab6bca3143c5.jpeg', '中国速冻食品行业的开创者和领导者', 12, NULL);
INSERT INTO `t_company` VALUES (17, '2022-03-19 14:45:57.362000', '2022-03-24 10:37:52.960867', '中讯邮电咨询设计院有限公司郑州分公司', NULL, 'http://www.dimpt.com/home/', '郑州', '1992-07-16 00:00:00', 5, 2, 'https://www.orgloom.cc/uploads/20220319/1d53e030-a793-11ec-9fdf-ab6bca3143c5.png', '持续为信息通信事业的创新发展贡献力量', 8, NULL);
INSERT INTO `t_company` VALUES (18, '2022-03-19 14:51:51.762000', '2022-03-24 10:37:52.960867', '中科大数据研究院', NULL, 'https://www.ictbda.com/', '郑州', '2018-06-13 00:00:00', 0, 1, 'https://www.orgloom.cc/uploads/20220319/6cad2e10-a794-11ec-9fdf-ab6bca3143c5.png', '构建大数据产业链、价值链、生态链，为“以数据为关键要素”的数字经济提供智力引擎', 9, NULL);
INSERT INTO `t_company` VALUES (19, '2022-03-19 23:48:03.165000', '2022-03-24 10:37:52.960867', '郑州大学一附院', NULL, 'http://www.zdyfy.com/', '郑州', '1928-06-29 00:00:00', 3, 2, 'https://www.orgloom.cc/uploads/20220320/ebef7580-a7de-11ec-9fdf-ab6bca3143c5.png', '集医疗、教学、科研、预防、保健、康复为一体的三级甲等综合医院', 16, NULL);
INSERT INTO `t_company` VALUES (20, '2022-03-19 23:51:48.026000', '2022-03-24 10:37:52.960867', '牧原食品股份有限公司 ', NULL, 'http://www.muyuanfoods.com/', '郑州', '1992-03-15 00:00:00', 5, 2, 'https://www.orgloom.cc/uploads/20220320/03aa0630-a7e0-11ec-9fdf-ab6bca3143c5.png', '让人们吃上放心猪肉', 26, NULL);
INSERT INTO `t_company` VALUES (21, '2022-03-20 00:32:34.130000', '2022-03-24 10:37:52.960867', '中国建筑第七工程局有限公司 ', NULL, 'http://www.cscec7b.com/', '郑州', '1984-10-23 00:00:00', 4, 2, 'https://www.orgloom.cc/uploads/20220320/1b78be50-a7e5-11ec-9fdf-ab6bca3143c5.png', '全球最大的住宅工程建造商、中国最具国际竞争力的建筑企业集团', 68, NULL);
INSERT INTO `t_company` VALUES (22, '2022-03-25 10:36:43.805000', '2022-03-25 10:56:06.589000', '阿里巴巴（中国）网络技术有限公司', NULL, 'https://www.alibabagroup.com/cn/global/home', '杭州', '1999-07-30 00:00:00', 0, 3, 'https://www.orgloom.cc/uploads/20220325/9996c660-ac27-11ec-ade9-cd0efef40aa5.png', '让天下没有难做的生意', 36, NULL);
INSERT INTO `t_company` VALUES (23, '2022-03-25 10:41:19.462000', '2022-03-25 10:55:56.197000', '深圳市腾讯计算机系统有限公司', NULL, 'https://www.qq.com/', '深圳', '1998-07-08 00:00:00', 0, 3, 'https://www.orgloom.cc/uploads/20220325/f2199e70-ac27-11ec-ade9-cd0efef40aa5.png', '集新闻信息,区域垂直生活服务、社会化媒体资讯和产品为一体的互联网媒体平台', 6, NULL);
INSERT INTO `t_company` VALUES (24, '2022-03-25 11:52:28.374000', '2022-03-25 11:52:28.374000', '上海浦东发展银行股份有限公司郑州分行', NULL, 'http://wap.spdb.com.cn', '郑州', '1992-08-20 00:00:00', 1, 2, 'https://www.orgloom.cc/uploads/20220325/fe715d20-ac31-11ec-b8ff-67b9090e1c9a.png', '建设数字生态银行', 43, NULL);
INSERT INTO `t_company` VALUES (25, '2022-03-25 11:56:47.895000', '2022-03-25 11:56:47.895000', '中信银行股份有限公司郑州分行', NULL, 'http://www.citicbank.com/', '郑州', '1984-06-20 00:00:00', 1, 2, 'https://www.orgloom.cc/uploads/20220325/90830290-ac32-11ec-b8ff-67b9090e1c9a.png', '一站式金融生活平台', 36, NULL);
INSERT INTO `t_company` VALUES (26, '2022-03-25 12:22:42.144000', '2022-03-25 12:22:42.144000', '中国工商银行股份有限公司郑州分行', NULL, 'http://www.icbc.com.cn/icbc/', '郑州', '1984-07-27 00:00:00', 1, 2, 'https://www.orgloom.cc/uploads/20220325/cd3bdf60-ac35-11ec-b8ff-67b9090e1c9a.png', '工于至诚，行以致远', 23, NULL);
COMMIT;

-- ----------------------------
-- Table structure for t_follow
-- ----------------------------
DROP TABLE IF EXISTS `t_follow`;
CREATE TABLE `t_follow` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `userId` bigint NOT NULL COMMENT '用户ID',
  `companyId` bigint NOT NULL COMMENT '公司ID',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `companyName` varchar(255) DEFAULT NULL COMMENT '公司名字',
  PRIMARY KEY (`id`),
  KEY `IDX_80f1c1ee1dccbe1327b544d913` (`createTime`),
  KEY `IDX_9e11d97610f33af8aea79ed402` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_follow
-- ----------------------------
BEGIN;
INSERT INTO `t_follow` VALUES (2, '2022-03-04 08:58:13.621000', '2022-03-04 08:58:13.621000', 'yyyy', 40, 6, NULL, '郑州画作科技有限公司');
COMMIT;

-- ----------------------------
-- Table structure for t_free
-- ----------------------------
DROP TABLE IF EXISTS `t_free`;
CREATE TABLE `t_free` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `profileIcon` varchar(255) DEFAULT NULL COMMENT '头像',
  `userName` varchar(255) DEFAULT NULL COMMENT '用户名称',
  `userId` bigint NOT NULL COMMENT '用户ID',
  `sexClassify` tinyint DEFAULT NULL COMMENT '性别 0-男 1-女',
  `eduClassify` tinyint DEFAULT NULL COMMENT '学历 0-大专 1-本科 2-研究生 3-其他',
  `introduceRemark` varchar(255) DEFAULT NULL COMMENT '自我介绍',
  `youRemark` varchar(255) DEFAULT NULL COMMENT '对方要求',
  `birthdayDate` datetime DEFAULT NULL COMMENT '出生日期',
  `companyId` int DEFAULT NULL COMMENT '公司ID',
  `companyName` varchar(255) DEFAULT NULL COMMENT '公司名字',
  `wechat` varchar(255) DEFAULT NULL COMMENT '微信号',
  `verifyRemark` varchar(255) DEFAULT NULL COMMENT '认证描述',
  `verifyClassify` tinyint DEFAULT NULL COMMENT '认证状态 0-未通过 1-通过',
  `freeName` varchar(255) DEFAULT NULL COMMENT '自由圈昵称',
  `height` bigint NOT NULL COMMENT '身高',
  PRIMARY KEY (`id`),
  KEY `IDX_e339fcba6d5209ee70b59766e4` (`createTime`),
  KEY `IDX_3262fa3b628233ef31d3c04d61` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_free
-- ----------------------------
BEGIN;
INSERT INTO `t_free` VALUES (6, '2022-03-17 00:14:42.879000', '2022-03-24 10:40:10.710794', 'https://www.orgloom.cc/uploads/20220318/71973720-a651-11ec-bf6c-5fadf1c454c5.png', 'yyyy', 40, 1, 1, '喜欢画画、跳舞、唱歌', '正直上进有责任心', '1995-06-13 16:00:00', 11, '河南中钢网电子商务有限公司', '1890', '客服部 001', 1, 'nilll', 165);
INSERT INTO `t_free` VALUES (7, '2022-03-23 00:39:06.193000', '2022-03-23 00:40:20.308000', '', 'yyyy', 40, 1, 1, '郑州大学毕业，护士', '上进  有责任心', '1994-09-19 16:00:00', 19, '郑州大学一附院', '1390000', '科室外科', 1, 'vick', 168);
COMMIT;

-- ----------------------------
-- Table structure for t_org
-- ----------------------------
DROP TABLE IF EXISTS `t_org`;
CREATE TABLE `t_org` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `parentId` bigint DEFAULT NULL COMMENT '父组织ID',
  `name` varchar(255) DEFAULT NULL COMMENT '当前组织名称',
  `profileIcon` varchar(255) DEFAULT NULL COMMENT '头像',
  `tags` varchar(255) DEFAULT NULL COMMENT '标签描述',
  `positionName` varchar(255) DEFAULT NULL COMMENT '职位描述',
  `office` varchar(255) DEFAULT NULL COMMENT '部门',
  `imageIcon` varchar(255) DEFAULT NULL COMMENT '图片',
  `area` varchar(255) DEFAULT NULL COMMENT '区域',
  `companyId` int DEFAULT NULL COMMENT '公司ID',
  `companyName` varchar(255) DEFAULT NULL COMMENT '公司名字',
  `verifyRemark` varchar(255) DEFAULT NULL,
  `verifyClassify` tinyint DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `introRemark` varchar(3000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_93321ae37589787ac53b6a9080` (`createTime`),
  KEY `IDX_79a19aeb5f5e9ae9207fbcc72d` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of t_org
-- ----------------------------
BEGIN;
INSERT INTO `t_org` VALUES (2, '2022-02-11 20:08:46.979314', '2022-03-24 10:40:10.692700', NULL, 'devling', 'https://www.orgloom.cc/uploads/20220319/d5da05c0-a78f-11ec-9fdf-ab6bca3143c5.png', 'ceo,tag1,tag12', 'CEO', 'CEO OFFICE', 'http://127.0.0.1:8001/uploads/20220211/63c74740-8b33-11ec-a69b-db30c0e7a0be.png', '郑州', 6, '画作科技', NULL, 1, NULL, NULL, 'web3理念下全员轻连接及未来开放组织探索的开创者');
INSERT INTO `t_org` VALUES (3, '2022-02-11 20:29:51.156099', '2022-03-22 12:06:26.422555', 2, 'xiaoming1', 'http://127.0.0.1:8001/uploads/20220212/9ba3a410-8bbf-11ec-a99b-01f64c1038bc.png', 'cto,uuu,lll', 'cto', 'cto office', NULL, '杭州', 40, '画作', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (4, '2022-02-12 15:29:25.419947', '2022-03-22 12:06:26.422555', 3, 'hanmeimei', 'http://127.0.0.1:8001/uploads/20220212/742c54c0-8bd5-11ec-a99b-01f64c1038bc.png', 'cfo,tag3,rrrr', 'cfo ', 'cfo office', NULL, '杭州', 40, '画作', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (5, '2022-02-13 18:35:29.721785', '2022-03-24 10:40:10.692700', 2, 'lilei', 'https://www.orgloom.cc/uploads/20220319/dc990320-a78f-11ec-9fdf-ab6bca3143c5.png', 'cmo', 'cmo', 'cmo office', NULL, '郑州', 6, '郑州画作科技公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (8, '2022-02-13 20:48:04.966611', '2022-03-22 12:06:26.422555', NULL, 'lllei', 'http://127.0.0.1:8001/uploads/20220213/2a4caac0-8ccb-11ec-8cb6-49924353b815.png', 'ceo', 'ceo', 'ceo', NULL, '郑州', 4, '牧原', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (9, '2022-02-14 09:05:27.748003', '2022-03-24 10:40:10.692700', NULL, '汤玉祥', 'https://www.orgloom.cc/uploads/20220305/735c1050-9bd7-11ec-8e87-8f9671a0b7d9.jpeg', '创始人，CEO', 'CEO', '公司老板', NULL, '郑州', 5, '宇通客车股份有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (10, '2022-03-04 16:41:30.499000', '2022-03-24 10:40:10.692700', NULL, '徐诺金', 'https://www.orgloom.cc/uploads/20220305/bf8a1970-9bd9-11ec-8e87-8f9671a0b7d9.jpeg', '经济学博士，党委书记', '董事长', '中原银行', NULL, '郑州', 7, '中原银行股份有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (11, '2022-03-04 16:51:51.106000', '2022-03-24 10:40:10.692700', NULL, '李玉林', 'https://www.orgloom.cc/uploads/20220305/3f3a4810-9bdb-11ec-8e87-8f9671a0b7d9.jpeg', '中原银行副行长', '董事长', NULL, NULL, NULL, 8, '河南中原消费金融股份有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (12, '2022-03-04 17:01:43.312000', '2022-03-24 10:40:10.692700', NULL, '王天宇', 'https://www.orgloom.cc/uploads/20220305/ab4f15c0-9bdc-11ec-8e87-8f9671a0b7d9.png', '党委书记、董事长', '董事长', '郑州银行', NULL, '郑州', 9, '郑州银行股份有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (13, '2022-03-05 00:49:11.058000', '2022-03-24 10:40:10.692700', NULL, '乔松涛', 'https://www.orgloom.cc/uploads/20220305/f7234070-9c1d-11ec-8e87-8f9671a0b7d9.png', '总经理，实控人', '董事长', 'UU跑腿', NULL, '郑州', 10, '郑州时空隧道信息技术有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (14, '2022-03-05 01:11:27.563000', '2022-03-24 10:40:10.692700', NULL, '姚红超', 'https://www.orgloom.cc/uploads/20220305/2a41c550-9c21-11ec-8e87-8f9671a0b7d9.png', '创始人', '董事长', NULL, NULL, '郑州', 11, '河南中钢网电子商务有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (15, '2022-03-19 14:03:39.179000', '2022-03-24 10:40:10.692700', NULL, ' 李香林', 'https://www.orgloom.cc/uploads/20220319/a13ce540-a78e-11ec-9fdf-ab6bca3143c5.png', '法定代表人', 'CEO', NULL, NULL, '郑州', 12, '正数网络技术有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (16, '2022-03-19 14:18:44.672000', '2022-03-24 10:40:10.692700', NULL, ' 王雪', 'https://www.orgloom.cc/uploads/20220319/72ffee60-a78f-11ec-9fdf-ab6bca3143c5.png', '创始人', 'CEO', NULL, NULL, '郑州', 13, '河南酒便利商业股份有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (17, '2022-03-19 14:29:00.170000', '2022-03-24 10:40:10.692700', NULL, '刘卫星', 'https://www.orgloom.cc/uploads/20220319/deeb8930-a790-11ec-9fdf-ab6bca3143c5.png', '联席董事长', 'CEO', NULL, NULL, '郑州', 14, '建业住宅集团（中国）有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (18, '2022-03-19 14:37:28.014000', '2022-03-24 10:40:10.692700', NULL, '陈南', 'https://www.orgloom.cc/uploads/20220319/158033f0-a792-11ec-9fdf-ab6bca3143c5.png', '河南省工商联副主席', '董事长', NULL, NULL, '郑州', 16, '三全食品股份有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (19, '2022-03-19 14:38:52.299000', '2022-03-24 10:40:10.692700', NULL, '张红甫', 'https://www.orgloom.cc/uploads/20220319/42246cf0-a792-11ec-9fdf-ab6bca3143c5.png', '创始人', '董事长', NULL, NULL, '郑州', 15, '蜜雪冰城股份有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (20, '2022-03-19 14:46:49.873000', '2022-03-24 10:40:10.692700', NULL, '肖杰', 'https://www.orgloom.cc/uploads/20220319/62818810-a793-11ec-9fdf-ab6bca3143c5.png', '党委书记', 'CEO', NULL, NULL, NULL, 17, '中讯邮电咨询设计院有限公司郑州分公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (21, '2022-03-19 14:55:15.058000', '2022-03-24 10:40:10.692700', NULL, '王元卓', 'https://www.orgloom.cc/uploads/20220319/8e1286e0-a794-11ec-9fdf-ab6bca3143c5.png', '法人', '董事长', NULL, NULL, NULL, 18, '中科大数据研究院', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (22, '2022-03-19 23:52:50.991000', '2022-03-24 10:40:10.692700', NULL, '秦英林', 'https://www.orgloom.cc/uploads/20220320/a7949180-a7df-11ec-9fdf-ab6bca3143c5.png', '董事长', '总经理', NULL, NULL, '郑州', 20, '牧原食品股份有限公司 ', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (23, '2022-03-30 01:10:44.191000', '2022-03-30 01:11:16.408000', NULL, '张涛', 'https://www.orgloom.cc/uploads/20220330/287cdda0-afc6-11ec-b477-0d9cf561d92b.png', '总经理', '负责人', NULL, NULL, '郑州', 26, '中国工商银行股份有限公司郑州分行', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (24, '2022-04-29 08:23:22.548000', '2022-04-29 12:41:17.880000', NULL, 'eeeee', 'https://www.orgloom.cc/uploads/20220429/a94d85f0-c7b9-11ec-b477-0d9cf561d92b.png', 'eee', 'eee', 'ee', NULL, NULL, 6, '郑州画作股份有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (25, '2022-04-29 08:25:02.608000', '2022-04-29 12:41:26.616000', 2, 'ttttt', 'https://www.orgloom.cc/uploads/20220429/ae60cf20-c7b9-11ec-b477-0d9cf561d92b.png', 'sss', 'CDO', NULL, NULL, NULL, 6, '郑州画作股份有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (26, '2022-04-29 10:45:39.770000', '2022-04-29 10:45:39.770000', 2, 'test', 'https://www.orgloom.cc/uploads/20220429/7d230410-c7a9-11ec-b477-0d9cf561d92b.png', NULL, 'COO', NULL, NULL, NULL, 6, '郑州画作股份有限公司', NULL, 1, NULL, NULL, NULL);
INSERT INTO `t_org` VALUES (27, '2022-04-29 11:39:49.121000', '2022-04-29 11:39:49.121000', 26, '增长部', 'https://www.orgloom.cc/uploads/20220429/0dc1db70-c7b1-11ec-b477-0d9cf561d92b.png', NULL, 'COO', NULL, NULL, NULL, 6, '郑州画作股份有限公司', NULL, 1, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for task_info
-- ----------------------------
DROP TABLE IF EXISTS `task_info`;
CREATE TABLE `task_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `jobId` varchar(255) DEFAULT NULL COMMENT '任务ID',
  `repeatConf` varchar(1000) DEFAULT NULL COMMENT '任务配置',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `cron` varchar(255) DEFAULT NULL COMMENT 'cron',
  `limit` int DEFAULT NULL COMMENT '最大执行次数 不传为无限次',
  `every` int DEFAULT NULL COMMENT '每间隔多少毫秒执行一次 如果cron设置了 这项设置就无效',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态 0:停止 1：运行',
  `startDate` datetime DEFAULT NULL COMMENT '开始时间',
  `endDate` datetime DEFAULT NULL COMMENT '结束时间',
  `data` varchar(255) DEFAULT NULL COMMENT '数据',
  `service` varchar(255) DEFAULT NULL COMMENT '执行的service实例ID',
  `type` tinyint NOT NULL DEFAULT '0' COMMENT '状态 0:系统 1：用户',
  `nextRunTime` datetime DEFAULT NULL COMMENT '下一次执行时间',
  `taskType` tinyint NOT NULL DEFAULT '0' COMMENT '状态 0:cron 1：时间间隔',
  PRIMARY KEY (`id`),
  KEY `IDX_6ced02f467e59bd6306b549bb0` (`createTime`),
  KEY `IDX_2adc6f9c241391126f27dac145` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of task_info
-- ----------------------------
BEGIN;
INSERT INTO `task_info` VALUES (1, '2021-03-10 14:25:13.381172', '2021-03-10 14:25:19.011000', NULL, '{\"count\":1,\"type\":1,\"limit\":5,\"name\":\"每秒执行,总共5次\",\"taskType\":1,\"every\":1000,\"service\":\"taskDemoService.test()\",\"status\":1,\"id\":1,\"createTime\":\"2021-03-10 14:25:13\",\"updateTime\":\"2021-03-10 14:25:13\",\"jobId\":1}', '每秒执行,总共5次', NULL, 5, 1000, NULL, 0, NULL, NULL, NULL, 'taskDemoService.test()', 1, '2021-03-10 14:25:18', 1);
INSERT INTO `task_info` VALUES (2, '2021-03-10 14:25:53.000000', '2021-03-10 14:26:18.209202', NULL, '{\"count\":1,\"id\":2,\"createTime\":\"2021-03-10 14:25:53\",\"updateTime\":\"2021-03-10 14:25:55\",\"name\":\"cron任务，5秒执行一次\",\"cron\":\"0/5 * * * * ? \",\"status\":1,\"service\":\"taskDemoService.test()\",\"type\":1,\"nextRunTime\":\"2021-03-10 14:26:00\",\"taskType\":0,\"jobId\":2}', 'cron任务，5秒执行一次', '0/5 * * * * ? ', NULL, NULL, NULL, 0, NULL, NULL, NULL, 'taskDemoService.test()', 1, NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for task_log
-- ----------------------------
DROP TABLE IF EXISTS `task_log`;
CREATE TABLE `task_log` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `taskId` bigint DEFAULT NULL COMMENT '任务ID',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '状态 0:失败 1：成功',
  `detail` text COMMENT '详情描述',
  PRIMARY KEY (`id`),
  KEY `IDX_b9af0e100be034924b270aab31` (`createTime`),
  KEY `IDX_8857d8d43d38bebd7159af1fa6` (`updateTime`),
  KEY `IDX_1142dfec452e924b346f060fda` (`taskId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of task_log
-- ----------------------------
BEGIN;
INSERT INTO `task_log` VALUES (1, '2021-03-10 14:25:14.020930', '2021-03-10 14:25:14.020930', 1, 1, '\"任务执行成功\"');
INSERT INTO `task_log` VALUES (2, '2021-03-10 14:25:15.012030', '2021-03-10 14:25:15.012030', 1, 1, '\"任务执行成功\"');
INSERT INTO `task_log` VALUES (3, '2021-03-10 14:25:16.011443', '2021-03-10 14:25:16.011443', 1, 1, '\"任务执行成功\"');
INSERT INTO `task_log` VALUES (4, '2021-03-10 14:25:17.009939', '2021-03-10 14:25:17.009939', 1, 1, '\"任务执行成功\"');
INSERT INTO `task_log` VALUES (5, '2021-03-10 14:25:18.010410', '2021-03-10 14:25:18.010410', 1, 1, '\"任务执行成功\"');
INSERT INTO `task_log` VALUES (6, '2021-03-10 14:25:55.012816', '2021-03-10 14:25:55.012816', 2, 1, '');
INSERT INTO `task_log` VALUES (7, '2021-03-10 14:26:00.011880', '2021-03-10 14:26:00.011880', 2, 1, '');
INSERT INTO `task_log` VALUES (8, '2021-03-10 14:26:05.016832', '2021-03-10 14:26:05.016832', 2, 1, '\"任务执行成功\"');
INSERT INTO `task_log` VALUES (9, '2021-03-10 14:26:10.011763', '2021-03-10 14:26:10.011763', 2, 1, '\"任务执行成功\"');
INSERT INTO `task_log` VALUES (10, '2021-03-10 14:26:15.010246', '2021-03-10 14:26:15.010246', 2, 1, '\"任务执行成功\"');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
