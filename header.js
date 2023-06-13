//定义组件注册的模板template
var tabs = `<div class="header">
    <div class="header_left">
      <img src="./img/mine1.png" alt="">
    </div>
    <div class="header_right">
      <span @click="goIndex('#')" class="header_right_index">首页</span>
      <a @click="goIndex('#introduce')" href="#introduce" class="header_right_indexs">胤舜介绍</a>
      <a @click="goIndex('#technology')" href="#technology" class="header_right_indexs">技术能力</a>
      <a @click="goIndex('#range')" href="#range" class="header_right_indexs">产品范围</a>
      <a @click="goIndex('#programme')" href="#programme" class="header_right_indexs">解决方案</a>
      <a @click="goIndex('#tool')" href="#tool" class="header_right_indexs">辅助工具</a>
      <a @click="goIndex('#supplier')" href="#supplier" class="header_right_indexs">友情链接</a>
      <a @click="loginClick" class="header_right_indexs">{{ user && user.id ? '用户中心' : '登录' }}</a>
      <a v-if="!(user && user.id)" @click="zhuClick" class="header_right_indexs">注册</a>
    </div>
  </div> `;
//Vue定义组件
var template_tabs = Vue.extend({
    template: tabs,
    //这里的data与vue对象的data类似，只不过组件中的data必须是函数的形式
    data() {
        return {
            user: {},
        }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('YinShunUser'));
    },
    //这里的methods与vue对象的methods一样，可以在这里定义组件的函数 没用到也可以不写
    methods: {
        goIndex(url){
            window.location.href = './index.html' + url;
        },
        loginClick() {
            if (this.user && this.user.id) {
                window.location.href = './mine.html';
            } else {
                window.location.href = './login.html';
            }
        },
        zhuClick() {
            window.location.href = './register.html';
        },
    },

    //props用来接收外部参数的
    props: ['index', 'list'],
});

//Vue注册全局组件
Vue.component('top-header', template_tabs);
