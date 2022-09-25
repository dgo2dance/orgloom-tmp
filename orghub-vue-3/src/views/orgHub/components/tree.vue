<template>
  <el-select
    ref="mySelect"
    v-bind="$attrs"
    v-model="optionValue"
    :multiple="false"
    :disabled="disabled"
    placeholder="请选择"
    style="width: 100%;"
  >
    <el-option :value="optionValue" :label="optionValue" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        default-expand-all
        :data="options"
        @node-click="handleNodeClick"
      />
    </el-option>
  </el-select>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from "vue";

export default defineComponent({
  name: "mySelect",
  props: {
    modelValue: { type: String, default: "" },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [
        {
          label: "选项1",
          value: "1",
          children: [{ label: "选项1-1", value: "1-1" }],
        },
        { label: "选项2", value: "2" },
      ],
    },
  },
  emits: ["nodeClick", "update:modelValue"],
  setup(props, context) {
    function getLable(arr, value) {
      let res = "";
      function find(arr, value) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].value === value) {
            res = arr[i].label;
          }
          if (arr[i].children && arr[i].children.length) {
            find(arr[i].children, value);
          }
        }
      }
      find(arr, value);
      return res;
    }
    watch(
      () => {
        return props.modelValue;
      },
      () => {
        optionValue.value = getLable(props.options, props.modelValue);
      }
    );
    onMounted(() => {
      optionValue.value = getLable(props.options, props.modelValue);
    });
    const mySelect = ref();

    const optionValue = ref("");
    function handleNodeClick(node) {
      optionValue.value = node.label;
      mySelect.value.blur();
      console.log("---handleNodeClick---",node);
      context.emit("nodeClick", node);
      context.emit("update:modelValue", node.value);
    }
    return {
      mySelect,
      handleNodeClick,
      optionValue,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
</style>

