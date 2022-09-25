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
	name: "jingwai-advise",

	setup() {
		const { refs, setRefs, service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{ label: "组织ID", prop: "orgId", component: { name: "el-input" } },
				{ label: "当前组织名称", prop: "orgName", component: { name: "el-input" } },
				{ label: "公司ID", prop: "companyId", component: { name: "el-input" } },
				{ label: "公司名称", prop: "companyName", component: { name: "el-input" } },
				{
					label: "建议分类",
					prop: "adviseClassify",
					component: {
						name: "el-radio-group",
						options: [
							{ label: "不知道", value: 0 },
							{ label: "此人已不在这个公司", value: 1, color: "#67C23A" },
							{ label: "就是我请求移除", value: 2, color: "#E6A23C" },
							{ label: "其他", value: 3, color: "#F56C6C" }
						]
					},
					value: 0
				},
				{
					label: "处理分类",
					prop: "setClassify",
					component: {
						name: "el-radio-group",
						options: [
							{ label: "未处理", value: 0 },
							{ label: "处理中", value: 1, color: "#67C23A" },
							{ label: "已处理", value: 2, color: "#E6A23C" },
							{ label: "其他", value: 3, color: "#F56C6C" }
						]
					},
					value: 0
				},
				{
					label: "描述",
					prop: "adviseRemark",
					component: { name: "el-input", props: { type: "textarea", rows: 4 } }
				},
				{
					label: "处理描述",
					prop: "setRemark",
					component: { name: "el-input", props: { type: "textarea", rows: 4 } }
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{ label: "组织ID", prop: "orgId" },
				{ label: "当前组织名称", prop: "orgName" },
				{ label: "公司ID", prop: "companyId" },
				{ label: "公司名称", prop: "companyName" },
				{
					label: "建议分类",
					prop: "adviseClassify",
					dict: [
						{ label: "不知道", value: 0 },
						{ label: "此人已不在这个公司", value: 1, color: "#67C23A" },
						{ label: "就是我请求移除", value: 2, color: "#E6A23C" },
						{ label: "其他", value: 3, color: "#F56C6C" }
					]
				},
				{
					label: "处理分类",
					prop: "setClassify",
					dict: [
						{ label: "未处理", value: 0 },
						{ label: "处理中", value: 1, color: "#67C23A" },
						{ label: "已处理", value: 2, color: "#E6A23C" },
						{ label: "其他", value: 3, color: "#F56C6C" }
					]
				},
				{ label: "描述", prop: "adviseRemark", showOverflowTooltip: true },
				{ label: "处理描述", prop: "setRemark", showOverflowTooltip: true },
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["edit", "delete"] }
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.t.advise).done();
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
