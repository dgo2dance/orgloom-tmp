<template>
  <div class="card">
    <div style="min-width:80px">
      <div><img class="cardImage" :src="datas.imageUrl" /></div> 
      <div>
        <!--
        <img
          height="50"
          :src="data.data.imageUrl"
        >
        -->
      </div>
    </div>

    <div>
      <div style="margin-left:12px;margin-top:5px;font-size:16px;font-weight:bold;">

        {{datas.name}}

      </div>

      <div style="margin-left:12px;margin-top:3px;font-size:12px;">

        {{datas.positionName+' '+datas.tags}}


      </div>

      <!--
      <div style="margin-left:10px;margin-top:3px;font-size:10px;">
        Business first
      </div>

      <div style="margin-left:10px;margin-top:15px;font-size:10px;position:absolute;bottom:5px;">
          <div>
          CTO office
          </div>
          <div style="margin-top:5px;">
          Corporate
          </div>
      </div>

      -->

      </div>

   
    <div class="edit">
          <!--
           <el-input
            size="mini"
            v-model="name"
            class="test"
          >sss</el-input>
          -->

      <!--
          <el-input
            size="mini"
            v-model="name"
          ></el-input>
          <el-rate
            size="mini"
            v-model="value1"
          ></el-rate>
          <el-checkbox v-model="checked" size="mini">复选</el-checkbox>
          -->

          
          <el-popover
            width="80"
            trigger="hover"
            content="Hello world from d3.js with vue + element ui popover"
            class="nodePop"
            placement="right"
            :offset="20"
          >
         
          <ul>
            <li @click="suggest" style="margin-top:5px;"><a>反馈建议</a></li>

          </ul>
            <template #reference>
              <el-button
                size="mini"
                class="nodeButton"

              >...</el-button>
            </template>

          </el-popover>
          

          <!--
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">...</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
           
          </el-submenu>
          </el-menu>
          -->

    </div>

      <!-- <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          >
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog> -->

    <!-- <el-upload
      size="mini"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload> -->
  </div>
</template>



<script>
import { ElInput,ElButton,ElPopover,ElMenu,ElSubmenu,ElMenuItem,ElCard,ElDialog } from 'element-plus'
import {mapMutations,mapActions,mapGetters,vuex} from 'vuex'
import { useStore } from "vuex";
// import { ElMenu, ElMenuItem, ElSlider, ElSubmenu, ElButton, ElMessageBox,ElInput } from 'element-plus'

export default {
  name: 'Test',
   components: {
        ElInput,
        ElButton,
        ElPopover,
        ElMenu,
        ElSubmenu,
        ElMenuItem,
        ElCard,
        ElDialog
        
    },
  props: {
    data: {},
    index: {
      type: [Number]
    }
  },
  emits: ['fatherSuggest'],
  data () {
  //  console.log("----data--ssss-",this.data);
    return {
      datas: 'llllll',
      imgSrc:this.data.imageUrl,
      value1: this.index % 5,
      checked: (this.index % 2 === 0),
       dialogVisible: true
    }
    

  },
  computed: {
        ...mapGetters([
            'username',
            'detailId' ,
            'userInfo',
            'nodeData',
        ])
    },
   
  mounted() {
        

      // console.log('---ref---ref---',this.$refs.cusdis);
      // console.log(this.$refs.cusdis.innerText);

      // console.log('-----orgId--mounted-newnew-',JSON.parse(this.data).name);
      // console.log('dsssssss')
      this.datas=JSON.parse(this.data);
      	const store = useStore();
        console.log("--store--",store);

  },

  methods: {
        ...mapMutations(["param/setNodeData"]),
      suggest(){
        const that=this;

      //  console.log("---vuex----",window.EventBus);
        
      //  this['param/setNodeData'](JSON.parse(this.data));

    //  console.log("---node---detail-",that.detailId);

      //     window.EventBus.$emit('click');
      //   this.$bus.$emit('click')


        console.log("--------this.node.datas--------",JSON.parse(this.data));
        this.$emit('fatherSuggest',JSON.parse(this.data));

        // this.$emit('fatherSuggest');
        //  this.$parent.fatherSuggest();
      }

   }
}
</script>

<style lang="scss">
.card {
  box-sizing: border-box;
  border: 1px solid rgb(204, 203, 203);
  border-radius: 18px;
  width: 260px;
  height: 115px;
  display: flex;
  //flex-direction: column;
  //justify-content: space-between;
  padding: 15px 30px  4px  30px;
}
.cardImage{
  height: 70px;
}
.test{
//  font-size: 30px;
}
.nodePop{
  bottom:1px;
  right:1px;
}
.edit{
  bottom:5px;
  right:25px;
  position: absolute;
}
.nodeButton{
  border: 0;
}
</style>
