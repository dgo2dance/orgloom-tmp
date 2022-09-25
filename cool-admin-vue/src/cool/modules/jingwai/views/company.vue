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
			<cl-table :ref="setRefs('table')" v-bind="table" >

				<!-- 组织编辑 -->
				<template #slot-org-edit="{ scope }">
					<el-button
						type="text"
						size="mini"
						@click="orgEdit(scope.row)"
						>组织编辑</el-button
					>
				</template>

			</cl-table>
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
	name: "jingwai-company",

	setup() {
		const { refs, setRefs, service,store } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{ label: "名称", prop: "name", required: true, component: { name: "el-input" } },
				{
					label: "愿景",
					prop: "visionRemark",
					component: { name: "el-input", props: { type: "textarea", rows: 4 } }
				},
				{
					label: "描述",
					prop: "desc",
					component: { name: "cl-editor-quill", props: { height: 400 } }
				},
				{ label: "Logo", prop: "logoIcon", component: { name: "cl-upload" } },
				{ label: "网站", prop: "website", component: { name: "el-input" } },
				{
					label: "行业",
					prop: "industryClassify",
					component: {
						name: "el-select",
						options: [
							{ label: "互联网", value: 0 },
							{ label: "金融", value: 1, color: "#67C23A" },
							{ label: "制造", value: 2, color: "#E6A23C" },
							{ label: "医疗", value: 3, color: "#F56C6C" },
							{ label: "地产", value: 4, color: "#909399" },
							{ label: "其他", value: 5, color: "#B0CFEB" }
						]
					},
					value: 0
				},
				{
					label: "员工数目",
					prop: "employeesClassify",
					component: {
						name: "el-select",
						options: [
							{ label: "1~50", value: 0 },
							{ label: "50~200", value: 1, color: "#67C23A" },
							{ label: "200~1000", value: 2, color: "#E6A23C" },
							{ label: "1000~10000", value: 3, color: "#F56C6C" },
							{ label: "10000+", value: 4, color: "#909399" }
						]
					},
					value: 0
				},
					{
					label: "首页展示",
					prop: "wxIndexSignClassify",
					component: {
						name: "el-select",
						options: [
								{ label: "不展示", value: 0 },
						        { label: "展示", value: 1, color: "#67C23A" }
						
						]
					},
					value: 0
					
				},

				{ label: "位置", prop: "address", component: { name: "el-input" } },
				{ label: "关注数", prop: "followCount", component: { name: "el-input" } },

				{
					label: "成立时间",
					prop: "begindate",
					component: {
						name: "el-date-picker",
						props: { type: "date", valueFormat: "YYYY-MM-DD" }
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{ label: "名称", prop: "name" },
				{ label: "愿景", prop: "visionRemark", showOverflowTooltip: true },
				{
					label: "Logo",
					prop: "logoIcon",
					component: { name: "cl-image", props: { size: 60 } }
				},
				{ label: "网站", prop: "website" },
				{
					label: "行业",
					prop: "industryClassify",
					dict: [
						{ label: "互联网", value: 0 },
						{ label: "金融", value: 1, color: "#67C23A" },
						{ label: "制造", value: 2, color: "#E6A23C" },
						{ label: "医疗", value: 3, color: "#F56C6C" },
						{ label: "地产", value: 4, color: "#909399" },
						{ label: "其他", value: 5, color: "#B0CFEB" }
					]
				},
				{
					label: "员工数目",
					prop: "employeesClassify",
					dict: [
						{ label: "1~50", value: 0 },
						{ label: "50~200", value: 1, color: "#67C23A" },
						{ label: "200~1000", value: 2, color: "#E6A23C" },
						{ label: "1000~10000", value: 3, color: "#F56C6C" },
						{ label: "10000+", value: 4, color: "#909399" }
					]
				},
				{
					label: "首页展示",
					prop: "wxIndexSignClassify",
					dict: [
						{ label: "不展示", value: 0 },
						{ label: "展示", value: 1, color: "#67C23A" }
						
					]
				},

				
				{ label: "位置", prop: "address" },
				{ label: "关注数", prop: "followCount" },

				{
					label: "成立时间",
					prop: "begindate",
					component: { name: "cl-date", props: { format: "YYYY-MM-DD" } }
				},
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["edit", "delete","slot-org-edit"] }
			]
		});


		// 行点击展开
		function orgEdit(row: any) {
			
			console.log('----row----',row);
			console.log('----row--id--',row.id);
			// params:{record:record}
			// setOrgId
			
		this.$store.commit('SET_ORG_ID', {
										orgId: row.id,
										orgName:row.name
									});

			 this.$router.push({
                name: '组织编辑',
             });

		}

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.t.company).done();
			app.refresh();
		}

		return {
			refs,
			setRefs,
			upsert,
			table,
			onLoad,
			orgEdit,
		};
	}
});
</script>
