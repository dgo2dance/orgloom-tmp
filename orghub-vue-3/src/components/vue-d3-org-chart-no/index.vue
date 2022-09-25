<template>
<div>
  <div  
  id="orgChart"
  ref="svgElementContainer">

  </div>

        <!-- <div>
        <ul>
                  <li @click="suggest" style="margin-top:5px;"><a>反馈建议</a></li>

                </ul>
        </div> -->
</div>
</template>
<script>

import { OrgChart } from './lib/d3-org-chart'
// import type { OrgChart as IOrgChart } from 'd3-org-chart'
import './index.scss'
import NodeVue from './Node.vue'
// interface IDataType { }

// import type {  } from 'd3-org-chart'
export default {
  name: 'Chart',
  props: ['dataSource'],
   data() {
    return {
      chartReference: null
    };
  },
  
  // render(h) {
  //   return <div onClick={this.tokenDetail} ref="svgElementContainer"></div>
  // },

  watch:{ dataSource(value) {
      this.renderChart(value)
    }
  },
   
  // computed: {
  //   tree() {
  //     return this.chartReference
  //   }
  // },
  created() { },
  mounted() {
  //  console.log(this.$scopedSlots)
  },
  methods: {
    // tokenDetail(e: PointerEvent) {
    //   // console.log(e.target,this)
    //   // @ts-ignore
    //   // console.log(e.target?.getAttribute('data-func-key'))
    // },

    fatherSuggest(){
      console.log("---father------");
    },

    renderChart(data) {
      if (!this.chartReference) {
        // @ts-ignore
        this.chartReference = new OrgChart()
      }
      // console.log(this.chartReference.getChartState())
      // this.chartReference.container(
      //   this.$refs.svgElementContainer as unknown as string
      // ) // node or css selector

      //  console.log("-----renderChart----");
      //  console.log("-----this.debug-----",this.$refs);
      //  console.log("-----this.debug--1111555---",this.$refs.svgElementContainer);
       this.chartReference
         .container(this.$refs.svgElementContainer) 
         // .container(document.querySelector('#orgChart'))
        .data(data)
        .nodeHeight((d) => 110)
        .nodeWidth((d) => 280)
        .onNodeClick((d) => {
          console.log(d+"----node Click-----");
        //  this.$bus.$emit('click');
        }
        
        )
        .onCommit((d) => {
          console.log(d+"----commit Click-----");
          this.$bus.$emit('click',d);
        }
        )
        // @ts-ignore
        // .nodeContent(() => {
        //   return NodeVue // this.$scopedSlots
        
        // })
        .nodeContent((d, i, arr, state) => {
          // console.log('99999999',d.data);
          //     for (let key of Object.keys(d.data)) {
          //     console.log(key);
          //     console.log(d.data[key]);
          //     }
          return NodeVue
        })
        .render()
    }
  }
}
</script>
