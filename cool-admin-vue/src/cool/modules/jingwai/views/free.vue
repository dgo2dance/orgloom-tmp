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
				<template #slot-check="{ scope }">
					<el-button
						type="text"
						size="mini"
						@click="check(scope.row)"
						>审核状态</el-button
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
import { ElMessage, ElMessageBox } from "element-plus";
import { useCool } from "/@/cool";

export default defineComponent({
	name: "jingwai-free",

	setup() {
		const { refs, setRefs, service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{ label: "头像", prop: "profileIcon", component: { name: "cl-upload" } },
				{
					label: "用户ID",
					prop: "userId",
					required: true,
					component: { name: "el-input" }
				},
				{ label: "用户名称", prop: "userName", component: { name: "el-input" } },
				{ label: "自由圈昵称", prop: "freeName", component: { name: "el-input" } },
				{
					label: "性别",
					prop: "sexClassify",
					component: {
						name: "el-radio-group",
						options: [
							{ label: "男", value: 0 },
							{ label: "女", value: 1, color: "#67C23A" }
						]
					},
					value: 0
				},
				{
					label: "学历",
					prop: "eduClassify",
					component: {
						name: "el-radio-group",
						options: [
							{ label: "大专", value: 0 },
							{ label: "本科", value: 1, color: "#67C23A" },
							{ label: "研究生", value: 2, color: "#E6A23C" },
							{ label: "其他", value: 3, color: "#F56C6C" }
						]
					},
					value: 0
				},
				{
					label: "自我介绍",
					prop: "introduceRemark",
					component: { name: "el-input", props: { type: "textarea", rows: 4 } }
				},
				{ label: "微信号", prop: "wechat", component: { name: "el-input" } },
				{
					label: "对方要求",
					prop: "youRemark",
					component: { name: "el-input", props: { type: "textarea", rows: 4 } }
				},
				{
					label: "出生日期",
					prop: "birthdayDate",
					component: {
						name: "el-date-picker",
						props: { type: "date", valueFormat: "YYYY-MM-DD" }
					}
				},
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
				},
				{
					label: "兴趣",
					prop: "interestClassifys",
					hook: {
						bind: ['split'],  // 绑定通道流程，分割 -> 转成number -> 绑定值
						submit: ['join'],	// 提交通道流程，逗号拼接 -> 提交
					},
					component: {
						name: "el-select",
						options: [
							{ label: "跑步", value: "跑步" },
							{ label: "户外", value: "户外", color: "#67C23A" },
							{ label: "摄影", value: "摄影", color: "#E6A23C" },
							{ label: "绘画", value: "绘画", color: "#F56C6C" },
							{ label: "其他", value: "其他", color: "#909399" }
						],
						props: { multiple: true, filterable: true }
					},
					value: [0,1]
				},
				{
					label: "目的",
					prop: "goalsClassifys",
					hook: {
							bind: ['split'],  // 绑定通道流程，分割 -> 转成number -> 绑定值
							submit: ['join'],	// 提交通道流程，逗号拼接 -> 提交
						},
					component: {
						name: "el-select",
						options: [
							{ label: "内推", value: "内推" },
							{ label: "技能交流", value: "技能交流", color: "#67C23A" },
							{ label: "兴趣交流", value: "兴趣交流", color: "#E6A23C" },
							{ label: "单身交友", value: "单身交友", color: "#F56C6C" },
							{ label: "其他", value: "其他", color: "#909399" }
						],
						props: { multiple: true, filterable: true }
					},
					value: []
				},
				{ label: "身高", prop: "height", required: true, component: { name: "el-input" } }
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{
					label: "头像",
					prop: "profileIcon",
					component: { name: "cl-image", props: { size: 60 } }
				},
				{ label: "用户ID", prop: "userId" },
				{ label: "用户名称", prop: "userName" },
				{ label: "自由圈昵称", prop: "freeName" },
				{
					label: "性别",
					prop: "sexClassify",
					dict: [
						{ label: "男", value: 0 },
						{ label: "女", value: 1, color: "#67C23A" }
					]
				},
				{
					label: "学历",
					prop: "eduClassify",
					dict: [
						{ label: "大专", value: 0 },
						{ label: "本科", value: 1, color: "#67C23A" },
						{ label: "研究生", value: 2, color: "#E6A23C" },
						{ label: "其他", value: 3, color: "#F56C6C" }
					]
				},
				{ label: "自我介绍", prop: "introduceRemark", showOverflowTooltip: true },
				{ label: "微信号", prop: "wechat" },
				{ label: "对方要求", prop: "youRemark", showOverflowTooltip: true },
				{
					label: "出生日期",
					prop: "birthdayDate",
					component: { name: "cl-date", props: { format: "YYYY-MM-DD" } }
				},
				{ label: "公司ID", prop: "companyId" },
				{ label: "公司名字", prop: "companyName" },
				{ label: "认证描述", prop: "verifyRemark", showOverflowTooltip: true },
				{
					label: "认证状态",
					prop: "verifyClassify",
					dict: [
						{ label: "未通过", value: 0 },
						{ label: "通过", value: 1, color: "#67C23A" }
					]
				},
				{
					label: "兴趣",
					prop: "interestClassifys",
					dict: [
						{ label: "跑步", value: 0 },
						{ label: "户外", value: 1, color: "#67C23A" },
						{ label: "摄影", value: 2, color: "#E6A23C" },
						{ label: "绘画", value: 3, color: "#F56C6C" },
						{ label: "其他", value: 4, color: "#909399" }
					]
				},
				{
					label: "目的",
					prop: "goalsClassifys",
					dict: [
						{ label: "内推", value: 0 },
						{ label: "技能交流", value: 1, color: "#67C23A" },
						{ label: "兴趣交流", value: 2, color: "#E6A23C" },
						{ label: "单身交友", value: 3, color: "#F56C6C" },
						{ label: "其他", value: 4, color: "#909399" }
					],
				},
				{ label: "身高", prop: "height" },
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["edit", "delete","slot-check"] }
			]
		});



		// 行点击展开
		function check(row: any) {
			
			console.log('---service---',service)
			console.log('----check----',row);
			console.log('----check--id--',row.id);
			// params:{record:record}
			service.jingwai.free.check(row)
						.then(() => {
							ElMessage.success("调整成功");
							refs.value.crud.refresh();
						})
	

		}

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.t.free).done();
			app.refresh();
		}

		return {
			refs,
			setRefs,
			upsert,
			table,
			onLoad,
			check
		};
	}
});
</script>
