<!-- 首页 -->
<template>
    <div class="home">
        <span class="title">欢迎使用“旧岛”管理系统</span>
    </div>
</template>

<script>

export default {
    name: 'home',
    data() {
        return {
        }
    },
    methods: {
    },
}
</script>

<style scoped>
.home {
    /* background-color: #BEBEBE; */
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.home .title {
    font-size: 25px;
    font-weight: 400;
    color: #7B7B7B;
    opacity: .5;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>