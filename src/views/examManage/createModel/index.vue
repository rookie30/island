<!-- 创建考试模板页 -->
<template>
    <div class="createModel">
        <el-form
            :model="modelInfo"
            label-width="80px"
            v-loading="isLoading">
            <el-form-item
                label="试卷名称">
                <el-input-form></el-input-form>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'createModel',
    data() {
        return {
            modelInfo: {},
            isLoading: false,
        }
    }
}
</script>

<style scoped>

</style>