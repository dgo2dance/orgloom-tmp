import { OrgChart } from './lib/d3-org-chart'
import type { OrgChart as IOrgChart } from 'd3-org-chart'
import './index.scss'
import NodeVue from './Node.vue'
interface IDataType { }

// import type {  } from 'd3-org-chart'
import Vue from 'vue'
export default Vue.extend({
  name: 'Chart',
  props: ['dataSource'],
  data(): {
    chartReference?: IOrgChart<IDataType>
  } {
    return {
      chartReference: undefined
    }
  },
  render(h) {
    return <div onClick={this.tokenDetail} ref="svgElementContainer"></div>
  },

  watch: {
    dataSource(value) {
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
    console.log(this.$scopedSlots)
  },
  methods: {
    // tokenDetail(e: PointerEvent) {
    //   // console.log(e.target,this)
    //   // @ts-ignore
    //   // console.log(e.target?.getAttribute('data-func-key'))
    // },
    renderChart(data: IDataType[] | null) {
      if (!this.chartReference) {
        // @ts-ignore
        this.chartReference = new OrgChart()
      }
      // console.log(this.chartReference.getChartState())
      this.chartReference!.container(
        this.$refs.svgElementContainer as unknown as string
      ) // node or css selector
        .data(data)
        .nodeHeight((d) => 120)
        .nodeWidth((d) => 280)
        .onNodeClick((d) => console.log(d + ' node clicked'))
        // @ts-ignore
        .nodeContent(() => {
          return NodeVue // this.$scopedSlots
          // console.log(d, i)
          // const vueInstance = JSON.stringify(d.data)
          // const script = `` // <script>${'console.log(this)'}</script>
          // return `<div class="org-chart-wrapper" data-func-key="100" onclick="console.log(this)">${vueInstance}</div>${script}`
        })
        .render()
    }
  }
})
