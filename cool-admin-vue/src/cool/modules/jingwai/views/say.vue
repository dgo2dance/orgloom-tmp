<template>
	<cl-crud :ref="setRefs('crud')" @load="onLoad">
		<el-row type="flex" align="middle">
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table :ref="setRefs('table')" v-bind="table" />
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<!-- 新增、编辑 -->
		<cl-upsert :ref="setRefs('upsert')" v-bind="upsert" />
	</cl-crud>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { CrudLoad, Table, Upsert } from "@cool-vue/crud/types";
import { useCool } from "/@/cool";

export default defineComponent({
	name: "jingwai-say",

	setup() {
		const { refs, setRefs, service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{ label: "目标对象ID", prop: "targetId", component: { name: "el-input" } },
				{ label: "目标用户ID", prop: "targetUserId", component: { name: "el-input" } },
				{ label: "目标用户名字", prop: "targetUserName", component: { name: "el-input" } },
				{
					label: "实体类型",
					prop: "typeClassify",
					component: {
						name: "el-select",
						options: [
							{ label: "话题", value: 0 },
							{ value: 0, color: "#67C23A" },
							{ label: "话题回复", value: 1, color: "#E6A23C" },
							{ value: 0, color: "#F56C6C" },
							{ label: "新闻爬取", value: 2, color: "#909399" }
						]
					},
					value: 0
				},
				{ label: "内容", prop: "contents", component: { name: "el-input" } },
				{ label: "标题", prop: "title", component: { name: "el-input" } },
				{ label: "链接地址", prop: "link", component: { name: "el-input" } },
				{ label: "图片", prop: "imageIcon", component: { name: "cl-upload" } },
				{ label: "公司ID", prop: "companyId", component: { name: "el-input" } },
				{ label: "公司名字", prop: "companyName", component: { name: "el-input" } },
				{ label: "创建用户ID", prop: "userId", component: { name: "el-input" } },
				{ label: "创建用户名称", prop: "userName", component: { name: "el-input" } },
				{
					label: "认证描述",
					prop: "verifyRemark",
					component: { name: "el-input", props: { type: "textarea", rows: 4 } }
				},
				{
					label: "认证状态",
					prop: "verifyClassify",
					component: {
						name: "el-radio-group",
						options: [
							{ label: "未通过", value: 0 },
							{ label: "通过", value: 1, color: "#67C23A" }
						]
					},
					value: 0
				},
				{ label: "备用1", prop: "back1", component: { name: "el-input" } },
				{ label: "备用2", prop: "back2", component: { name: "el-input" } }
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{ label: "目标对象ID", prop: "targetId" },
				{ label: "目标用户ID", prop: "targetUserId" },
				{ label: "目标用户名字", prop: "targetUserName" },
				{
					label: "实体类型",
					prop: "typeClassify",
					dict: [
						{ label: "话题", value: 0 },
						{ value: 0, color: "#67C23A" },
						{ label: "话题回复", value: 1, color: "#E6A23C" },
						{ value: 0, color: "#F56C6C" },
						{ label: "新闻爬取", value: 2, color: "#909399" }
					]
				},
				{ label: "内容", prop: "contents" },
				{ label: "标题", prop: "title" },
				{ label: "链接地址", prop: "link" },
				{
					label: "图片",
					prop: "imageIcon",
					component: { name: "cl-image", props: { size: 60 } }
				},
				{ label: "公司ID", prop: "companyId" },
				{ label: "公司名字", prop: "companyName" },
				{ label: "创建用户ID", prop: "userId" },
				{ label: "创建用户名称", prop: "userName" },
				{ label: "认证描述", prop: "verifyRemark", showOverflowTooltip: true },
				{
					label: "认证状态",
					prop: "verifyClassify",
					dict: [
						{ label: "未通过", value: 0 },
						{ label: "通过", value: 1, color: "#67C23A" }
					]
				},
				{ label: "备用1", prop: "back1" },
				{ label: "备用2", prop: "back2" },
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["edit", "delete"] }
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.t.say).done();
			app.refresh();
		}

		return {
			refs,
			setRefs,
			upsert,
			table,
			onLoad
		};
	}
});
</script>
