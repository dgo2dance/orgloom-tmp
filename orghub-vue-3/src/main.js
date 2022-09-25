import {createApp} from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import './styles/reset.less';
import './styles/index.less';
import '@/permission'; // permission control

import ElementPlus from 'element-plus';
import 'dayjs/locale/zh-cn';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import { VuePlugin } from 'vuera'
import App from './App.vue';
import router from './router';
import store from './store';
import bus from './bus'
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";

router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
  });
  
const app = createApp(App);

app.config.globalProperties.$bus = bus

app.config.productionTip = false;
app.use(router);
app.use(store);
// app.use(VuePlugin);
app.use(ElementPlus, {locale});
// app.use(ElementUI,{locale});

app.mount('#app');
