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
	name: "demo-user",

	setup() {
		const { refs, setRefs, service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "头像",
					prop: "headImg",
					component: { name: "cl-upload" },
					required: true
				},
				{ label: "姓名", prop: "name", required: true, component: { name: "el-input" } },
				{
					label: "年龄",
					prop: "age",
					component: { name: "el-input-number", props: { min: 0 } },
					required: true
				},
				{
					label: "出生日期",
					prop: "birthDate",
					component: {
						name: "el-date-picker",
						props: { type: "date", valueFormat: "YYYY-MM-DD" }
					},
					required: true
				},
				{
					label: "性别",
					prop: "type",
					component: {
						name: "el-radio-group",
						options: [
							{ label: "未知", value: 0 },
							{ label: "男", value: 1, color: "#67C23A" },
							{ label: "女", value: 2, color: "#E6A23C" }
						]
					},
					value: 0,
					required: true
				},
				{
					label: "介绍",
					prop: "introduce",
					component: { name: "cl-editor-quill", props: { height: 400 } }
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{
					label: "头像",
					prop: "headImg",
					component: { name: "cl-image", props: { size: 60 } }
				},
				{ label: "姓名", prop: "name" },
				{ label: "年龄", prop: "age" },
				{
					label: "出生日期",
					prop: "birthDate",
					component: { name: "cl-date", props: { format: "YYYY-MM-DD" } }
				},
				{
					label: "性别",
					prop: "type",
					dict: [
						{ label: "未知", value: 0 },
						{ label: "男", value: 1, color: "#67C23A" },
						{ label: "女", value: 2, color: "#E6A23C" }
					]
				},
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["edit", "delete"] }
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.demo.user).done();
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
