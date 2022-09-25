<template>
  <div class="vindex">
    <vheader></vheader>

  </div>
</template>

<script>
  import vheader from '../components/vheader'
  export default {
    name: 'vindex',
    components: {
      vheader
    }
  }
</script>

<style scoped>
  .vindex{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    z-index: 999;
    background: #fff;
    padding: 10px 10px 0 10px ;
    border-bottom: 1px solid #f0ebeb!important;
  }
  h3{
    color: #607d8b;
    font-family: 宋体;
    font-size: 24px;
    font-weight: 900;
  }
  .nav{
    margin-top: 50px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    overflow: hidden;
    position: relative;
  }
  .nav-wrapper span{
    height: 30px;
    padding-bottom: 5px;
    font-size: 15px;
    color: #737373;
    margin-right: 30px;
    display: inline-block;
  }
  .nav-wrapper {
    padding: 0 18px;
    height: 68px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  span.router-link-exact-active{
    color: #246394
  }
</style>
