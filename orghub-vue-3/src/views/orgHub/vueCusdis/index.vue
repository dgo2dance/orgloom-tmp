<template>


     <div
        id="cusdis_thread"
        lang="zh-cn"
        :data-host="host"
        :data-page-id="orgId"
        :data-app-id="appId"
        :data-page-title="pageTitle"
        data-page-url=""
        data-theme=""
        :data-user-id="userId"
        :data-user-name="userName"
        ref="cusdis"
      >

     </div>
</template>


<script>

export default {
  name: 'CusdisVue',
  props: {
     orgId: {
            type: String,
            default: ''
        },
      host: {
            type: String,
            default: ''
        },
      pageId: {
            type: String,
            default: ''
        },
        pageTitle: {
            type: String,
            default: ''
        },
      appId: {
            type: String,
            default: ''
        },
      userId: {
          type: String,
          default: ''
      },
          userName: {
          type: String,
          default: ''
      },
},
   data() {
    return {
      chartReference: null
    };
  },
  
  // render(h) {
  //   return <div onClick={this.tokenDetail} ref="svgElementContainer"></div>
  // },

  watch:{ dataSource(value) {
    //  this.renderChart(value)
    }
  },
   
  // computed: {
  //   tree() {
  //     return this.chartReference
  //   }
  // },
  created() {
  
   },

   activated(){

    //  const u = document.createElement('script');
    //   u.type = 'text/javascript';
    // //  u.src = 'http://127.0.0.1:3000/js/widget/lang/zh-cn.js';
    //   u.src =  this.host+'/js/widget/lang/zh-cn.js';

    //  const s = document.createElement('script');
    //   s.type = 'text/javascript';
    //   // s.src = this.host+'http://127.0.0.1:3000/js/cusdis.es.js';
    //   s.src = this.host+'/js/cusdis.es.js';
    //   document.body.appendChild(s);

   
    //   document.body.appendChild(u);
   },
  mounted() {

        document.onreadystatechange = () => {
        if (document.readyState == "complete") {
          console.log('Page completed with image and files!')
          // fetch
  }
}

     this.sleep(3000);
     const u = document.createElement('script');
      u.type = 'text/javascript';
    //  u.src = 'http://127.0.0.1:3000/js/widget/lang/zh-cn.js';
      u.src =  this.host+'/js/widget/lang/zh-cn.js';

     const s = document.createElement('script');
      s.type = 'text/javascript';
      // s.src = this.host+'http://127.0.0.1:3000/js/cusdis.es.js';
      s.src = this.host+'/js/cusdis.es.js';
      document.body.appendChild(s);
      document.body.appendChild(u);

          console.log("---------vuecusdis-------mounted");


      // console.log('---ref---ref---',this.$refs.cusdis);
      // console.log(this.$refs.cusdis.innerText);

      // console.log('-----orgId----',this.orgId);
      // console.log('-----host----',this.host);
      // console.log('-----appId----',this.appId);
      // console.log('-----pageId----',this.pageId);
      // console.log('-----pageId----',this.pageId);

      // console.log('-----userId----',this.userId);
      // console.log('-----userName----',this.userName);






    //  const target = this.$refs.cusdis

    //   const render = window.renderCusdis;

    //    if (render) {
    //   render(this.$refs.cusdis)
    // }

    //  console.log("--render",render);


  },
  methods: {

     sleep(millisecond) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, millisecond)
        })
    }
    // tokenDetail(e: PointerEvent) {
    //   // console.log(e.target,this)
    //   // @ts-ignore
    //   // console.log(e.target?.getAttribute('data-func-key'))
    // },
    // renderChart(data) {
    //   if (!this.chartReference) {
    //     // @ts-ignore
    //     this.chartReference = new OrgChart()
    //   }
    //   // console.log(this.chartReference.getChartState())
    //    this.chartReference
    //     .container(this.$refs.cusdis) // node or css selector
    //   // this.chartReference.container(
    //   //   this.$refs.svgElementContainer as unknown as string
    //   // ) // node or css selector
    //     .data(data)
    //     .nodeHeight((d) => 120)
    //     .nodeWidth((d) => 280)
    //     .onNodeClick((d) => console.log(d + ' node clicked'))
    //     // @ts-ignore
    //     .nodeContent(() => {
    //       return NodeVue // this.$scopedSlots
        
    //     })
    //     .render()
    // }
  }
}
</script>

<style scoped>

  #cusdis_thread{
    height: 800px;
  }
    .count{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }
    .count span{
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
        cursor: pointer;
    }
    .count span.box{
        border-color: #ccc;
        border-radius: 3px;
    }
</style>

