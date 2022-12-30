//定义组件注册的模板template
var tabs = `<div>
        <div class="headerS">
            <div class="headerS_left">
                <img src="./img/header1.png" alt="">
            </div>
            <div class="headerS_right">
                <img @click="tan = true" src="./img/header2.png" alt="">
            </div>
        </div>
        <div :style="tan ? 'display: flex' : 'display: none'" class="tan">
            <div @click="tan = false" class="tan_divss"></div>
            <div @click="tan = false" class="tan_div">
                <a href="./indexs.html#introduce">胤舜介绍</a>
                <a href="./indexs.html#technology">技术能力</a>
                <a href="./indexs.html#range">产品范围</a>
                <a href="./indexs.html#programme">解决方案</a>
                <a href="./indexs.html#tool">辅助工具</a>
                <a href="./indexs.html#supplier">友情链接</a>
                <a @click="loginClick">{{ user && user.id ? '用户中心' : '登录' }}</a>
                <a v-if="!(user && user.id)" @click="zhuClick">注册</a>
                <a v-if="user && user.id" @click="loginOut">退出登录</a>
            </div>
        </div>
</div>`;
//Vue定义组件
var template_tabs = Vue.extend({
    template: tabs,
    //这里的data与vue对象的data类似，只不过组件中的data必须是函数的形式
    data() {
        return {
            user: {},
            tan:false,
        }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('YinShunUser'));
    },
    //这里的methods与vue对象的methods一样，可以在这里定义组件的函数 没用到也可以不写
    methods: {
        loginOut() {
            let user = JSON.parse(localStorage.getItem('YinShunUser'));
            let formData = new FormData();
            formData.append('phone', user.phone);
            fetchFun('http://webapi.issealing.com/api/login/loginOut', "POST", formData)
                .then(res => {
                    console.log(111, res)
                    if (res.code === 200) {
                        window.location.href = `./login.html`
                        localStorage.removeItem('YinShunUser');
                    }
                })
        },
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
Vue.component('top-header-s', template_tabs);