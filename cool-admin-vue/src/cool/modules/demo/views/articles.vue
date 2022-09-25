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
	name: "test-articles",

	setup() {
		const { refs, setRefs, service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "作者ID",
					prop: "user_id",
					required: true,
					component: { name: "el-input" }
				},
				{ label: "分类ID", prop: "category_id", component: { name: "el-input" } },
				{ label: "标题", prop: "tiele", required: true, component: { name: "el-input" } },
				{
					label: "文章内容",
					prop: "content",
					component: { name: "cl-editor-quill", props: { height: 400 } },
					required: true
				},
				{ label: "文章摘录", prop: "excerpt", component: { name: "el-input" } },
				{
					label: "文章状态：0 草稿箱 1 已发布",
					prop: "article_status",
					component: { name: "el-switch" },
					required: true
				},
				{
					label: "阅读数量",
					prop: "view_count",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "喜欢数、点赞数",
					prop: "like_count",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "是否置顶",
					prop: "is_sticky",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "阅读加精",
					prop: "is_essence",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "评论状态",
					prop: "comment_status",
					component: { name: "el-switch" },
					required: true
				},
				{
					label: "评论数量",
					prop: "comment_count",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "最后回复用户 id",
					prop: "last_comment_user_id",
					component: { name: "el-input" }
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{ label: "作者ID", prop: "user_id" },
				{ label: "分类ID", prop: "category_id" },
				{ label: "标题", prop: "tiele" },
				{ label: "文章摘录", prop: "excerpt" },
				{
					label: "文章状态",
					prop: "article_status",
					component: { name: "cl-switch" }
				},
				{ label: "阅读数量", prop: "view_count" },
				{ label: "喜欢数", prop: "like_count" },
				{ label: "是否置顶", prop: "is_sticky" },
				{ label: "阅读加精", prop: "is_essence" },
				{
					label: "评论状态",
					prop: "comment_status",
					component: { name: "cl-switch" }
				},
				{ label: "评论数量", prop: "comment_count" },
				{ label: "最后回复用户 id", prop: "last_comment_user_id" },
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["edit", "delete"] }
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.news.articles).done();
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
