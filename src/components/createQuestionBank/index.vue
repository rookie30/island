<!-- 创建题库表单 -->
<template>
    <el-dialog title="创建题库">
        <el-form :model="questionBankForm">
            <el-form-item label="名称">
                <el-input placeholder="请输入题库名称" v-model="questionBankForm.name"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-input placeholder="请输入题库类型" v-model="questionBankForm.type"></el-input>
            </el-form-item>
            <el-form-item label="管理员">
                <el-select v-model="questionBankForm.admin"></el-select>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    name: "createQuestionBankForm",
    data() {
        return {
            questionBankForm: {
                name: "",
                type: "",
                admin: ""
            }
        }
    }
}
</script>

<style scoped>

</style>