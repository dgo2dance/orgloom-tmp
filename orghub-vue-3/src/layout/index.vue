<template>
    <div class="app-layout">
        <vindex />
        <app-main />
         <back-top></back-top>   

    </div>
    
</template>

<script>
import NavBar from './components/NavBar';
import AppMain from './components/AppMain';
import vindex from './components/vindex';
  import backTop from './components/BackTop';


export default {
    name: 'AppLayout',
    components: {
        NavBar,
        AppMain,
        vindex,
        backTop
    }
};
</script>

<style lang="less" scoped>
.app-layout {
    min-width: 1280px;
}
</style>