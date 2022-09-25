<template>
  <div class="vheader">
    <img src="@/assets/jingwai_logo_sun.png" alt="Readhub" class="logo">
        <div class="nav">
          <div class="nav-wrapper">
          <!--    <a href="/" >热门话题</a>  -->
                   <router-link to="/index" exact tag="span">首页</router-link>
            <router-link to="/home/index" exact tag="span">发现组织</router-link>

   <!-- 
               <router-link to="/jobs" tag="span">订阅快讯</router-link>
                     
            <router-link to="/news" tag="span">公司资讯</router-link>
       
         
            <router-link to="/test" tag="span">测试</router-link>

           
            <router-link to="/blockchain" tag="span">区块链快讯</router-link>
      <router-link to="/jobs" tag="span">招聘行情</router-link> -->
          </div>
        </div>
      <div class="last-label">
      <!--  <router-link to="/login" tag="span" class="joinUs">登录</router-link> -->

        <el-menu :default-active="activeIndex" class="el-menu-navbar" mode="horizontal" @select="handleSelect" router>
            
            <div class="right-menu">
                <el-dropdown trigger="click" v-if="username">
                    <span class="el-dropdown-link">
                        <div class="avatar-wrapper">
                            <el-avatar size="medium" icon="el-icon-s-custom"></el-avatar>
                            <i class="el-icon-caret-bottom" />
                        </div>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                        <el-dropdown-item disabled class="username">{{username}}</el-dropdown-item>
                        <el-dropdown-item divided @click="logout">退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <div class="last-label-login"  v-else>
                  <router-link :to="'/login?redirect=' + $route.path" tag="span" class="joinUs">登录</router-link> 
                  <!--
                    <router-link :to="'/login?redirect=' + $route.path">
                        <el-link>登陆</el-link>
                    </router-link>
                    <el-divider direction="vertical"></el-divider>
                    <router-link :to="'/login?register=true&redirect=' + $route.path">
                        <el-link>注册</el-link>
                    </router-link>
                  -->
                </div>
            </div>
        </el-menu>

  <!--  <a class="joinUs" href="https://mp.weixin.qq.com/s/kREAGXnuZVNw_DspMeDEwA">登录</a>  -->
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {ElMessage} from 'element-plus';

  export default {
    name: 'vheader',
    data () {
      return {
        msg: 'Readhub'
      }
    },
     computed: {
        ...mapGetters([
            'username'
        ])
    },

       methods: {
      
        logout() {
            this.$store.dispatch('user/logout');
            ElMessage.success({
                message: '退出成功',
                type: 'success'
            });
            window.location.replace('/');
        }
    }
  }
</script>

<style scoped>
  .vheader{
   /* margin: 10px 10px 10px 10px; */
    z-index: 999;
    background: #fff !important;
    height: 60px;
    margin: 0 auto;
  }
  @media screen and (min-width: 1201px){
    .vheader{
        width: 1200px;
    }
  }
    @media screen and (min-width: 991){
    .vheader{
        width: 860px;
    }
  }
    @media screen and (min-width: 769){
    .vheader{
        width: 718px;
    }
  }
  h3{
    margin: 0;
  }

   /* span   */

  .router-link-exact-active{
    color: #246394!important;
    font-weight: 700;
  }


  .logo{
    float: left;
    width: 130px;
  /*  height: 50px; */
    margin-bottom: 10px;
  }
  .joinUs{
    float: right;
    font-size: 16px;
    color: #999;
    text-decoration: none;
    margin-left: 23px;
    text-decoration: none;
    font-family: PingFangSC-Light,Microsoft YaHei UI Light,Noto Sans CJK SC Light,sans-serif;

  }

  .nav{
    float: left;
    margin-bottom: 10px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    overflow: hidden;
    position: relative;
  }
  .nav-wrapper span{
    height: 30px;
    padding-bottom: 5px;
    font-size: 16px;
    color: #737373;
    margin-right: 30px;
    display: inline-block;
    cursor:pointer;
  }

  .el-menu--horizontal {
    border-bottom: none!important; 
}
    .nav-wrapper a{
    height: 30px;
    padding-bottom: 5px;
    font-size: 16px;
    color: #737373;
    margin-right: 30px;
    display: inline-block;
    text-decoration: none;
  }
  a:hover {
    font-weight: 700;
    color: #246394;
}
  .nav-wrapper {
    padding: 0 50px;
    height: 68px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  
  .last-label{
    float: right;
    line-height: 50px; 
    position: relative;
    margin-left: 25px;
    padding-right: 10px;
}

  .last-label-login{
    float: right;
    line-height: 60px; 
    position: relative;
    margin-left: 25px;
    padding-right: 10px;
}
</style>

