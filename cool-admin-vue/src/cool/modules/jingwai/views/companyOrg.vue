<template>
	<cl-crud :ref="setRefs('crud')" :on-refresh="onRefresh" @load="onLoad">
		<el-row type="flex">
			<cl-refresh-btn />
			
			<cl-add-btn @click="addRow()"/>
				
				<cl-filter label="公司:">

				<el-input
					v-model="orgName"
					controls-position="right"
					size="mini"
					autosize
					disabled
					:max="50000"
					:min="1"
				
				/>
							</cl-filter>
	<!--		<cl-menu-quick @success="refresh()" v-if="isDev" />  -->
		</el-row>

		<el-row>
			<cl-table :ref="setRefs('table')" v-bind="table" @row-click="onRowClick" default-expand-all>
				<!-- 名称 -->
				<template #column-name="{ scope }">
					<span>{{ scope.row.name }}</span>
					<!--
					<el-tag
						v-if="!scope.row.isShow"
						size="mini"
						effect="dark"
						type="danger"
						style="margin-left: 10px"
						>隐藏</el-tag
					>
					-->
				</template>


				<!-- 图标 -->
				<template #column-icon="{ scope }">
					<icon-svg :name="scope.row.icon" size="16px" style="margin-top: 5px" />
				</template>

				<!-- 权限 -->
				<template #column-perms="{ scope }">
					<el-tag
						v-for="(item, index) in scope.row.permList"
						:key="index"
						size="mini"
						effect="dark"
						style="margin: 2px; letter-spacing: 0.5px"
						>{{ item }}</el-tag
					>
				</template>

				<!-- 路由 -->
				<template #column-router="{ scope }">
					<el-link v-if="scope.row.type == 1" type="primary" :href="scope.row.router">{{
						scope.row.router
					}}</el-link>
					<span v-else>{{ scope.row.router }}</span>
				</template>

				<!-- 路由缓存 -->
				<template #column-keepAlive="{ scope }">
					<template v-if="scope.row.type == 1">
						<i v-if="scope.row.keepAlive" class="el-icon-check"></i>
						<i v-else class="el-icon-close"></i>
					</template>
				</template>

				<!-- 行新增 -->
				<template #slot-add="{ scope }">
					<el-button
						v-if="scope.row.type != 2"
						type="text"
						size="mini"
						@click="upsertAppend(scope.row)"
						>新增</el-button
					>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<cl-pagination :props="{ layout: 'total' }" />
		</el-row>

		<!-- 编辑 -->
		<cl-upsert v-bind="upsert" />
	</cl-crud>
</template>

<script lang="ts">
import { useCool } from "/@/cool";
import { deepTree } from "/@/cool/utils";
import { defineComponent, reactive,computed } from "vue";
import { CrudLoad, Table, Upsert, RefreshOp } from "@cool-vue/crud/types";
import { isDev } from "/@/config/env";
import { mapGetters } from "vuex";
import store from "/@/store";

export default defineComponent({
	name: "sys-menu",

	props: {
      msg: {
        type: String,
        default: ''
      }
    },

	setup() {
		const { refs, setRefs, service, router } = useCool();
		const { orgId,orgName } = store.getters;

	
		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			console.log('-----org---on--load');
			ctx.service(service.t.org).set('dict', {
						// 字典
						dict: {
							// 请求
							api: {
								list: 'list',   		// 全部数据
								add: 'add', 			// 新增
								update: 'update',   	// 修改
								delete: 'delete',   	// 删除
								info: 'info',   		// 详情
								page: 'page',   		// 分页
							},
							params:{
								orgId:40
							}
						}
			}).done();
			app.refresh();
		}

		//  const orgId = computed(() => store.getters.orgId);

		//  console.log()

	


		// 刷新监听
		function onRefresh(_: any, { render }: RefreshOp) {
			

			console.log('-----org---on--onRefresh');

			console.log('------orgId-----',orgId);
			console.log('------orgName-----',orgName);



			service.jingwai.org.list({
										orgId:orgId
									}).then((list: any[]) => {
				list.map((e) => {
					e.permList = e.perms ? e.perms.split(",") : [];
				});

				render(deepTree(list), {
					total: list.length
				});
			});
		}

		// 行点击展开
		function onRowClick(row: any, column: any) {
			if (column.property && row.children) {
				refs.value.table.toggleRowExpansion(row);
			}
		}


		// 子集新增
		function addRow() {
			console.log("----add-button--");
			refs.value.crud.rowAppend({
				companyId:orgId,
				companyName:orgName,
			});
		}
		// 子集新增
		function upsertAppend({ type, id }: any) {
			refs.value.crud.rowAppend({
				parentId: id,
				companyId:orgId,
				companyName:orgName,
				type: type + 1
			});
		}

		// 设置权限
		function setPermission({ id }: any) {
			refs.value.crud.rowAppend({
				parentId: id,
				type: 2
			});
		}

		// 跳转
		function toUrl(url: string) {
			router.push(url);
		}

		// 刷新
		function refresh() {
			console.log('-----org---on--refresh');

			refs.value.crud.refresh();
		}

		// 表格配置
		const table = reactive<Table>({
			props: {
				"row-key": "id"
			},
			"context-menu": [
				(row: any) => {
					return {
						label: "新增",
						hidden: row.type == 2,
						callback: (_: any, done: Function) => {
							upsertAppend(row);
							done();
						}
					};
				},
				"update",
				"delete",
				(row: any) => {
					return {
						label: "权限",
						hidden: row.type != 1,
						callback: (_: any, done: Function) => {
							setPermission(row);
							done();
						}
					};
				}
			],
			columns: [
				{
					prop: "name",
					label: "名称",
					align: "left",
					width: 200
				},
				{
					label: "头像",
					prop: "profileIcon",
					component: { name: "cl-image", props: { size: 60 } }
				},
				{ label: "标签", prop: "tags" },
				{ label: "位置名称", prop: "positionName" },
				{ label: "部门", prop: "office" },
				{ label: "区域", prop: "area" },
				{ label: "公司", prop: "companyName" },
				{ label: "认证描述", prop: "verifyRemark", showOverflowTooltip: true },
				{
					label: "认证状态",
					prop: "verifyClassify",
					dict: [
						{ label: "未通过", value: 0 },
						{ label: "通过", value: 1, color: "#67C23A" }
					]
				},

/*
				{
					prop: "icon",
					label: "图标",
					width: 80
				},
				{
					prop: "type",
					label: "类型",
					width: 100,
					dict: [
						{
							label: "目录",
							value: 0
						},
						{
							label: "菜单",
							value: 1
						},
						{
							label: "权限",
							value: 2
						}
					]
				},
				{
					prop: "router",
					label: "节点路由",
					minWidth: 160
				},
				{
					prop: "keepAlive",
					label: "路由缓存",
					width: 100
				},
				{
					prop: "viewPath",
					label: "文件路径",
					minWidth: 200,
					showOverflowTooltip: true
				},
				{
					prop: "perms",
					label: "权限",
					headerAlign: "center",
					minWidth: 300
				},
				{
					prop: "orderNum",
					label: "排序号",
					width: 90
				},
				*/
				{
					prop: "updateTime",
					label: "更新时间",
					sortable: "custom",
					width: 150
				},
				{
					label: "操作",
					type: "op",
					buttons: ["slot-add", "edit", "delete"]
				}
			]
		});

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			dialog: {
				width: "900px"
			},
			items: [
				/*
				{
					prop: "type",
					value: 0,
					label: "节点类型",
					span: 24,
					component: {
						name: "el-radio-group",
						options: [
							{
								label: "目录",
								value: 0
							},
							{
								label: "菜单",
								value: 1
							},
							{
								label: "权限",
								value: 2
							}
						]
					}
				},
				*/
				{
					prop: "name",
					label: "节点名称",
					span: 24,
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入节点名称"
						}
					},
					required: true
				},
				
				{
					prop: "companyName",
					label: "公司名字",
					span: 24,
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入节点名称", 
						//	value:orgName,
						}
					},
				//	required: true,
				//	hidden:true
				},
				
				
					{
					prop: "companyId",
					label: "公司ID",
					span: 24,
					component: {
						name: "el-input",
						
						props: {
							placeholder: "请输入节点名称", 
						//	value:orgId,
						}
					},
				//	required: true,
				//	hidden:true
				},

		

				{ label: "头像", prop: "profileIcon", component: { name: "cl-upload" } },

				{
					prop: "parentId",
					label: "上级节点",
					span: 24,
					component: {
						name: "cl-org-tree"
					}
				},

				{
					prop: "tags",
					label: "标签",
					span: 24,
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入标签"
						}
					}
				},
				{
					prop: "positionName",
					label: "职位名称",
					span: 24,
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入职位名称"
						}
					}
				},
				{
					prop: "office",
					label: "部门1111",
					span: 24,
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入部门"
						}
					}
				},
				{
					prop: "area",
					label: "区域",
					span: 24,
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入区域"
						}
					}
				},
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
				}  ,
				
				/*
				{
					prop: "keepAlive",
					value: true,
					label: "路由缓存",
					span: 24,
					hidden: ({ scope }: any) => scope.type != 1,
					component: {
						name: "el-radio-group",
						options: [
							{
								label: "开启",
								value: true
							},
							{
								label: "关闭",
								value: false
							}
						]
					}
				},
				{
					prop: "isShow",
					label: "是否显示",
					span: 24,
					value: true,
					hidden: ({ scope }: any) => scope.type == 2,
					flex: false,
					component: {
						name: "el-switch"
					}
				},
				{
					prop: "viewPath",
					label: "文件路径",
					span: 24,
					hidden: ({ scope }: any) => scope.type != 1,
					component: {
						name: "cl-menu-file"
					}
				},
				{
					prop: "icon",
					label: "节点图标",
					span: 24,
					hidden: ({ scope }: any) => scope.type == 2,
					component: {
						name: "cl-menu-icons"
					}
				},
				{
					prop: "orderNum",
					label: "排序号",
					span: 24,
					component: {
						name: "el-input-number",
						props: {
							placeholder: "请填写排序号",
							min: 0,
							max: 99,
							"controls-position": "right"
						}
					}
				},
				{
					prop: "perms",
					label: "权限",
					span: 24,
					hidden: ({ scope }: any) => scope.type != 2,
					component: {
						name: "cl-menu-perms"
					}
				}
				*/
			]
		});

		return {
			refs,
			table,
			upsert,
			orgName,
			setRefs,
			onLoad,
			onRefresh,
			onRowClick,
			upsertAppend,
			addRow,
			setPermission,
			toUrl,
			refresh,
			isDev
		};
	}
});
</script>
