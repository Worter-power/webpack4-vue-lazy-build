/**
 * harry 2019-08-25
 */
import App from './App';
import router from './router';

InitBaseData().then(res=>{
    console.log('页头页脚初始化完成')
    // THEME 同步主题 参数 true/false  是否跳过公共校验，用于不用登陆的项目，该函数只会返回resove
    THEME(true).then(res=>{
        /** js引入方式 页头传参
         * params : {
         *      icons: function,
         *      center: function,
         *      title: string,
         *      logo: url,
         *      userName: string,
         *      showUserName: Boolean,
         *      lang: string, // default 'zh-CN'
         *      langList: Array
         * }
         * 自定义标题点击事件
         *  BUS.$on('title-click', (title)=>{
                this.$notify({
                    title: '信息',
                    message: '标题点击事件触发',
                    type: "info"
                });
            })
         * 组件用法见 /element 文档，和之前版本一直
         */
        BUS.$emit('set-header-options', {
            title: '基础模块',
            userName: 'Harry',
            logo: '/common/images/shiyuelogo.png',
            langList: [{id: 'zh-CN', name: '中文'},{id: 'en', name: 'English'}]
        })

        new Vue({
            el: '#app-container',
            router,
            render: (c) => {return c(App)}
        });
    })
})
