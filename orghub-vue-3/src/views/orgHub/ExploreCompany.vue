<template>

    <div class="main">
    <div class="container">

        
    <ul class="ul_main"  v-for="(item,index) in list" :key="index">
     <li>
      <div class="content">
             <div class="top_title">
              <a  @click="handleClick(item)" class="top_title_href" target="" aria-disabled="false"><span class="logo">
                <div >
                <img class="sc-1xxzpea-1 bISeuN" :src="item.logoIcon"/>  
                </div>
                </span>
              <div class="title_name">
                     {{item.name}}
              </div>
             </a>

              <button class="top_button" @click="handleFollow(item)" style="min-width: 127px;" v-if="!username">关注</button>

              <button @click="handleFollow(item)" v-bind:class="[item.followed?'top-button-b':'top_button']" v-else>{{item.followed? "取消关注": "关注" }}</button>


            </div>
      </div>


   <div class="detail">
    <p>{{item.visionRemark}}</p>
    
    <ul class="detail_ul">
      <!--
     <li><a href="/org/google/org-chart" title="View the full google org chart" target="" aria-disabled="false">
       <div class="_3tWtQ lr6J8" style="flex-shrink: 0; overflow: hidden;">
        <div class="sc-1xxzpea-0 kHRyQe">
         <img class="sc-1xxzpea-1 bISeuN" src="https://cdn.theorg.com/633719b5-32a2-4f4a-bd4f-c46ee21aab06_small.png" alt="Profile photo" />
        </div>
       </div></a></li>
     <li><a href="/org/google/org-chart" title="View the full google org chart" target="" aria-disabled="false">
       <div class="_3tWtQ lr6J8" style="flex-shrink: 0; overflow: hidden;">
        <div class="sc-1xxzpea-0 kHRyQe">
         <img class="sc-1xxzpea-1 bISeuN" src="https://cdn.theorg.com/9fa661b6-65e2-4751-b0d5-0fdfd6034497_small.png" alt="Profile photo" />
        </div>
       </div></a></li>
     <li><a href="/org/google/org-chart" title="View the full google org chart" target="" aria-disabled="false">
       <div class="_3tWtQ lr6J8" style="flex-shrink: 0; overflow: hidden;">
        <div class="sc-1xxzpea-0 kHRyQe">
         <img class="sc-1xxzpea-1 bISeuN" src="https://cdn.theorg.com/19d413f4-b8fd-4cb6-bccd-58991f656735_small.png" alt="Profile photo" />
        </div>
       </div></a></li>
       -->
       <!--
     <li class="detail_ul_li_a"><a href="/org/google/org-chart" title="View the full google org chart" target="" aria-disabled="false">查看详情
       <svg width="9" height="15" viewbox="0 0 9 15" fill="none">
        <path d="M1 1C5.375 6.41667 8 7.5 8 7.5C8 7.5 5.375 8.8 1 14" stroke="#1e2ff1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
       </svg></a></li>
       -->
    </ul>
    
         </div>
     </li>

    </ul>

    <div class="footer" v-show="!flag">
      <loading />
    </div>
  </div>
  </div>
</template>

<script>
import timeago from 'timeago.js'
import Loading from './components/Loading'
import {getCompanyList,getCompanyListPageIs,addFollow} from '@/api/orgHub'
import {getCarModelList, getNewCarList} from '@/api/car';
import {mapMutations,mapActions,mapGetters} from 'vuex'
import {ElMessage} from 'element-plus';


export default {
  name: 'HotTopic',
  data () {
    return {
      selectIndex: -1,
      show: false,
      list: [],
      pagination:'',
      lastCursor: '',
      flag: true
    }
  },
  computed: {
      ...mapGetters([
          'username'
      ])
    },

  components: {
    Loading
  },
  created () {
    this.getCompanys()
    window.addEventListener('scroll', this.getScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.getScroll)
  },
  methods: {

    ...mapMutations(["param/setDetailId"]),

    /**
     * 获取公司列表
     */
    getCompanys () {
        
        const param = {
                page: 1,
                size: 20,
            };

                  if(this.username!=undefined){
                    
                     getCompanyListPageIs(param).then(res=> {
                      console.log("---getCompanyListPageIs---");
                      console.log(res);
                    if (res.code === 1000) {
                    this.list = res.data.list;
                    this.pagination=res.data.pagination;
                    console.log(res.data);
               //     this.lastCursor = res.data.data[19].order
                  }
                    }).finally(()=> {
                    //    this.SeriesLoading = false;
                    });


                  }else {
                    getCompanyList(param).then(res=> {
                      console.log("---getCompanyList---");
                      console.log(res);
                    if (res.code === 1000) {
                    this.list = res.data.list
                    this.pagination=res.data.pagination;

                    console.log(res.data)
                  //  this.lastCursor = res.data.data[19].order
                  }
                  /*
                        if (res.code === CODE_OK) {
                            this.seriesList = this.formatSeriesList(res.data.list);
                        }
                        */
                    }).finally(()=> {
                    //    this.SeriesLoading = false;
                    });
                  }

    },


    handleFollow(item){

          console.log('---follow---handle---');

             const param = {
                companyId: item.id,
                followed:!item.followed
            };
          console.log('---followAdd---',param);
          addFollow(param).then(res=> {
                console.log("---follow---add---");
                console.log(res);
                    if (res.code === 1000) {
                  //  this.detail = res.data
                    console.log(res.data);
                      ElMessage.success({
                      message: '处理成功',
                      duration:'500',
                      type: 'success'
                      });
                    this.getCompanys();

                //   this.lastCursor = res.data.data[19].order
                  } else {
                      ElMessage.success({
                      message: res.message,
                      duration:'500',
                      type: 'success'
                      });
                  }
        
            }).finally(()=> {
            //    this.SeriesLoading = false;
            });
    },


    handleClick(item) {
      console.log(JSON.stringify(item));
      			//	this.$store.commit("detailId", item.id);
        this['param/setDetailId'](item.id);
// this.$store.commit('param/setDetailId',item.id)
        this.$router.push({
                name: 'orgchart',
                params: {
                    id: item.id
                }
            });
            // let url =  this.$router.resolve({
            //     name: 'orgChart',
            //     params: {
            //         id: item.id
            //     }
            // });
            //  window.open(url.href);
        },

    getScroll () {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight) {
      // 写后台加载数据的函数
        this.getMore()
        this.flag = false
      }
    },

      pageTotal(rowCount, pageSize) {  
            if (rowCount == null || rowCount == "") {
            return 0;
            } else {
                    if (pageSize != 0 && rowCount % pageSize == 0) {
                    return parseInt(rowCount / pageSize);          
                    }  

                    if (pageSize != 0 && rowCount % pageSize != 0) {
                    return parseInt(rowCount / pageSize) + 1;
                    }
            }
},

    getMore () {

      let totalPage=this.pageTotal ( this.pagination.total ,  this.pagination.size);
      console.log("---pages----",totalPage);
      if(this.pagination.page==totalPage){
        this.flag=true;
        return;
      }
      if (this.flag) {
        // this.$http.get(`/topic?lastCursor=${this.lastCursor}&pageSize=20`)
        //   .then(res => {
        //     if (res.status === 200) {
        //       console.log(res.data)
        //       this.list = [...this.list, ...res.data.data]
        //       this.lastCursor = res.data.data[19].order
        //       this.flag = true
        //     }
        //   }).catch((error) => {
        //     console.log(error)
        //     this.flag = true
        //   })

         const param = {
                page: this.pagination.page+1,
                size: 20,
            };

                  if(this.username!=undefined){
                    
                     getCompanyListPageIs(param).then(res=> {
                      console.log("---getCompanyListPageIs---");
                      console.log(res);
                    if (res.code === 1000) {
                    this.list = [...this.list, ...res.data.list];
                    this.pagination=res.data.pagination;
                    console.log(res.data);
                    this.flag = true
               //     this.lastCursor = res.data.data[19].order
                  }
                    }).finally(()=> {
                    //    this.SeriesLoading = false;
                    });


                  }else {
                    getCompanyList(param).then(res=> {
                      console.log("---getCompanyList---");
                      console.log(res);
                    if (res.code === 1000) {
                    this.list = [...this.list, ...res.data.list];
                    this.pagination=res.data.pagination;
                    this.flag = true
                    console.log(res.data)
                  }
                  /*
                        if (res.code === CODE_OK) {
                            this.seriesList = this.formatSeriesList(res.data.list);
                        }
                        */
                    }).finally(()=> {
                    //    this.SeriesLoading = false;
                    });
                  }




      }
    },
    toggle (index) {
      this.selectIndex === index ? this.selectIndex = -1 : this.selectIndex = index
    },
    getTime (date) {
      let d = new Date(date)
      let time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      let timeagoInstance = timeago()
      let difftime = timeagoInstance.format(time, 'zh_CN')
      return difftime
    },
    throttle (func, wait) {
      var timeout
      return function () {
        var context = this
        var args = arguments
        if (!timeout) {
          timeout = setTimeout(function () {
            timeout = null
            func.apply(context, args)
          }, wait)
        }
      }
    },
    debounce (func, wait) {
      var timeout
      return function () {
        var context = this
        var args = arguments
        if (timeout) clearTimeout(timeout)
        var callNow = !timeout
        timeout = setTimeout(function () {
          timeout = null
        }, wait)
        if (callNow) func.apply(context, args)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main{
    margin: 0px auto 0;
}

@media screen and (min-width: 1201px){
    .main{
        width: 1200px;
    }
  }
@media screen and (min-width: 991){
    .main{
        width: 860px;
    }
  }
@media screen and (min-width: 769){
    .main{
        width: 718px;
    }
  }


.container {
  margin-top: 5px;
}
ul.ul_main, ul.ul_main>li {
    margin: 0;
    padding: 0;
}

ul.ul_main {
    list-style: none;
}

.content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding: 24px 0 0;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}


.top-button-b {
    color: #0a0a0b;
    border: 1px solid #eaeaeb;
    background-color: #eeeeee;
    cursor: pointer;
}
.top-button-b {
    min-width: 0;
    border-radius: 40px;
}
.top-button-b {
    height: 40px;
    font-size: 18px;
    padding-left: 16px;
    padding-bottom: 2px;
    padding-right: 16px;
}
.top-button-b{
    color: #0a0a0b;
    border: 1px solid #eaeaeb;
}

.top-button-b {
    min-width: 0;
    border-radius: 40px;
}


.top_title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.top_title_href {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    color: #0a0a0b;
}

 .logo {
    min-width: 48px;
    min-height: 48px;
}
.logo span {
    font-size: 16px!important;
}
.logo {
    position: relative;
    overflow: visible!important;
}
 .logo img {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    border: 1px solid #eaeaeb;
}
 .logo img{
    width: 48px;
    height: 48px;
    border-radius: 10px;
}

 img {
    background-color: #fff;
}

.article {
  border-bottom: 1px solid #dddddd;
  font-size: 16px;
  line-height: 1.7em;
  color: #323232;
  padding: 27px 18px;
  padding-bottom: 27px;
}

.title {
  position: relative;
  font-size: 18px;
  line-height: 1.7em;
  color: #000;
  margin-bottom: 8px;
  cursor: pointer;
}

.top_title a{
  text-decoration: none;
}

.top_title>div {
    margin-left: 16px;
}
.title_name {
    min-width: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-top: 0;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-left: 12px;
}

.title_name  {
    font-size: 18px;
    line-height: 1.7em;
    color: #000;
    margin-bottom: 8px;
    cursor: pointer;

}

.time {
  margin-left: 10px;
  font-size: 10px;
  color: #aaacb4;
}

.info {
  color: #737373;
  font-size: 16px;
  line-height: 1.85em;
  margin-bottom: 24px;
}
.arr-item {
  text-decoration: none;
  color: #000;
  display: block;
  position: relative;
}
.arr-item-title {
  font-size: 16px;
  color: #333;
  margin-right: 15px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.arr-item-wrapper {
  padding: 12px 18px 12px 30px;
}
.arr-item-title::before {
  content: " ";
    position: absolute;
    left: 16px;
    margin-top: 8px;
    width: 4px;
    height: 4px;
    border: 2px solid #acb9c6;
    border-radius: 50%;
    z-index: 10;
}
.arr-item-author {
  font-size: 14px;
  color: #b2b2b2;
}
.item-selected {
    position: relative;
    z-index: 10;
    background: #fff;
    box-shadow: 0 5px 21px 1px rgba(0,0,0,.15);
}
.item-footer {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid #ebebeb
}
.toDetail {
  color: #999;
  font-size: 15px;
  cursor: pointer;
}
.toDetail span {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 8px;
  border-color: transparent transparent transparent #b2b2b2;
  display: inline-block;
  margin-left: 6px;
}

.top_button {
    margin: 0!important;
    min-width: 111px!important;
    border-radius: 40px!important;
    height: 38px!important;
}
.top_button {
    color: #0a0a0b;
    border: 1px solid #eaeaeb;
    background-color: #fff;
}
.top_button{
    min-width: 0;
    border-radius: 10px;
}

.top_button {
    height: 40px;
    font-size: 18px;
    padding-left: 16px;
    padding-bottom: 2px;
    padding-right: 16px;
}
.top_button {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    min-width: 180px;
    height: 50px;
    padding: 0 25px;
    font-size: 18px;
    border-radius: 10px;
    color: #0a0a0b;
    -webkit-transition: all .1s ease;
    -o-transition: all .1s ease;
    transition: all .1s ease;
    background-color: transparent;
    outline: none;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.detail {
  /*  width: 100%;  */
    padding: 16px 0 24px;
    margin-left: 64px;
    border-bottom: 1px solid #eaeaeb;
}

@media (min-width: 768px){
  .detail p {
      margin: 0 120px 0 0;
  }
  }
.detail p {
 /*   font-weight: 400; */
    font-size: 15px;
    line-height: 1.5;
    margin: 0;
    color: #737373;
}

.detail ul.detail_ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    list-style: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 20px;
    margin-left: 16px;
    padding: 0;
}

.detail ul.detail_ul li {
    margin: 0 0 0 -16px;
}

.detail .detail_ul a {
    font-size: 15px;
    line-height: 26px;
    color: #1e2ff1!important;
    text-decoration: none;
}
</style>
