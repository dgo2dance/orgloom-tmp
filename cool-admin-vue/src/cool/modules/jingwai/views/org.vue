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
	name: "jingwai-org",

	setup() {
		const { refs, setRefs, service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{ label: "父组织ID", prop: "parentId", component: { name: "el-input" } },
				{ label: "当前组织名称", prop: "name", component: { name: "el-input" } },
				{ label: "头像", prop: "profileIcon", component: { name: "cl-upload" } },
				{ label: "标签描述", prop: "tags", component: { name: "el-input" } },
				{ label: "职位描述", prop: "positionName", component: { name: "el-input" } },
				{ label: "部门", prop: "office", component: { name: "el-input" } },
				{ label: "图片", prop: "imageIcon", component: { name: "cl-upload" } },
				{ label: "区域", prop: "area", component: { name: "el-input" } },
				{ label: "公司ID", prop: "companyId", component: { name: "el-input" } },
				{ label: "公司名字", prop: "companyName", component: { name: "el-input" } },
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
				}  
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{ label: "父组织ID", prop: "parentId" },
				{ label: "组织名称", prop: "name" },
				{
					label: "头像",
					prop: "profileIcon",
					component: { name: "cl-image", props: { size: 60 } }
				},
				{ label: "标签描述", prop: "tags" },
				{ label: "职位描述", prop: "positionName" },
				{ label: "部门", prop: "office" },
				{
					label: "图片",
					prop: "imageIcon",
					component: { name: "cl-image", props: { size: 60 } }
				},
				{ label: "认证描述", prop: "verifyRemark", showOverflowTooltip: true },
				{
					label: "认证状态",
					prop: "verifyClassify",
					dict: [
						{ label: "未通过", value: 0 },
						{ label: "通过", value: 1, color: "#67C23A" }
					]
				},
				{ label: "区域", prop: "area" },
				{ label: "公司ID", prop: "companyId" },
				{ label: "公司名字", prop: "companyName" },
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["edit", "delete"] }
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.t.org).done();
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
