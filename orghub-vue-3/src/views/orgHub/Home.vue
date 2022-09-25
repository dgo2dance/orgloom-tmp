<template>
  <div class="home">
    <Chart :dataSource="dataSource">
      <!--
      <template v-slot="{ node, data }">
        <div>{{ data.id }}</div>
        <div>{{ node.level }}</div>
      </template>
      -->
    </Chart>
  </div>
</template>

<script>
import Chart from '@/components/vue-d3-org-chart-no/index'
import Vue from 'vue'
import * as d3 from 'd3'
// import type { DSVRowArray } from 'd3'
import data from '../../org.json'


export default {
  name: 'Home',
   components: {
    Chart
  },
  data () {
    return {
      dataSource:null
    };
  },
  created () {
    d3.csv('org.csv').then((d) => {
     // console.log(d)
      console.log("--data--");
      console.log(data);
      this.dataSource = data
    })
  }
}
</script>
