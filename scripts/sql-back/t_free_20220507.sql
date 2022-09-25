/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : cool

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 07/05/2022 20:27:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_free
-- ----------------------------
DROP TABLE IF EXISTS `t_free`;
CREATE TABLE `t_free` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `profileIcon` varchar(255) DEFAULT NULL COMMENT '头像',
  `userName` varchar(255) DEFAULT NULL COMMENT '用户名称',
  `userId` bigint(20) NOT NULL COMMENT '用户ID',
  `sexClassify` tinyint(4) DEFAULT NULL COMMENT '性别 0-男 1-女',
  `eduClassify` tinyint(4) DEFAULT NULL COMMENT '学历 0-大专 1-本科 2-研究生 3-其他',
  `introduceRemark` varchar(255) DEFAULT NULL COMMENT '自我介绍',
  `youRemark` varchar(255) DEFAULT NULL COMMENT '对方要求',
  `birthdayDate` datetime DEFAULT NULL COMMENT '出生日期',
  `companyId` int(11) DEFAULT NULL COMMENT '公司ID',
  `companyName` varchar(255) DEFAULT NULL COMMENT '公司名字',
  `wechat` varchar(255) DEFAULT NULL COMMENT '微信号',
  `verifyRemark` varchar(255) DEFAULT NULL COMMENT '认证描述',
  `verifyClassify` tinyint(4) DEFAULT NULL COMMENT '认证状态 0-未通过 1-通过',
  `freeName` varchar(255) DEFAULT NULL COMMENT '自由圈昵称',
  `height` bigint(20) NOT NULL COMMENT '身高',
  PRIMARY KEY (`id`),
  KEY `IDX_e339fcba6d5209ee70b59766e4` (`createTime`),
  KEY `IDX_3262fa3b628233ef31d3c04d61` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_free
-- ----------------------------
BEGIN;
INSERT INTO `t_free` VALUES (6, '2022-03-17 00:14:42.879000', '2022-05-07 16:40:20.815590', 'https://www.orgloom.cc/uploads/20220318/71973720-a651-11ec-bf6c-5fadf1c454c5.png', 'yyyy', 40, 1, 1, '喜欢画画、跳舞、唱歌', '正直上进有责任心', '1995-06-13 16:00:00', 100011, '河南中钢网电子商务有限公司', '1890', '客服部 001', 1, 'nilll', 165);
INSERT INTO `t_free` VALUES (7, '2022-03-23 00:39:06.193000', '2022-05-07 16:40:20.815590', '', 'yyyy', 40, 1, 1, '郑州大学毕业，护士', '上进  有责任心', '1994-09-19 16:00:00', 100019, '郑州大学一附院', '1390000', '科室外科', 1, 'vick', 168);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
