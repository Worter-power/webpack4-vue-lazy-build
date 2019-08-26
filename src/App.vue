<template>
    <div class="sy-home-body" id="container">
        <h1>{{title}}</h1>
        <router-view></router-view>
    </div>  
</template>

<script>
export default {
    data() {
        return {
            'title': 'Hello World!'
        }
    },
    created(){
        BUS.$on('title-click', (title)=>{
            this.$notify({
                title: '信息',
                message: '标题点击事件触发',
                type: "info"
            });
        })
    }
}
</script>
