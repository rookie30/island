<!-- 题目信息编辑页 -->
<template>
    <div class="editQuestion">
        <el-dialog
            title="题目信息编辑"
            :visible.sync="isEdit"
            v-loading="isLoading">
            <el-form
                ref="questionInfoForm"
                :model="questionInfo"
                :rules="rules"
                status-icon
                label-position="right"
                label-width="80px">
                <el-form-item label="题目内容" prop="content">
                    <el-input v-model="questionInfo.content" class="infoInput"></el-input>
                </el-form-item>
                <el-form-item label="答案" prop="answer">
                    <el-input v-model="questionInfo.answer" class="infoInput"></el-input>
                </el-form-item>
                <el-form-item label="分析" prop="analysis">
                    <el-input v-model="questionInfo.analysis" class="infoInput"></el-input>
                </el-form-item>
                <el-form-item label="难度" prop="level">
                    <el-select v-model="questionInfo.level">
                        <el-option
                            :value="1"
                            label="简单">
                        </el-option>
                        <el-option
                            :value="2"
                            label="中等">
                        </el-option>
                        <el-option
                            :value="3"
                            label="困难">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="questionInfo.status">
                        <el-option
                            :value="1"
                            label="发布">
                        </el-option>
                        <el-option
                            :value="0"
                            label="草稿">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-bottom:0;">
                    <el-button 
                        type="primary" 
                        class="confirmBtn"
                        @click="submitForm('questionInfoForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import * as api from '@/api/questionManage'; 

export default {
    name: 'editQuestion',
    data() {
        let checkNull = (rule, content, callback) => {
            if(!content) {
                return callback(new Error("题目内容不能为空"));
            }
            callback();
        };
        return {
            isEdit: false,
            questionInfo: {},
            isLoading: false,
            rules: {
                content: [
                    {validator: checkNull, trigger: 'blur'}
                ],
                answer: [
                    {validator: checkNull, trigger: 'blur'}
                ],
                anaysis: [
                    {validator: checkNull, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        editQuestionInfo(info) {
            this.isEdit = !this.isEdit;
            this.questionInfo = info;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    this.isLoading = true;
                    api.editQuestionInfo(this.questionInfo).then(res => {
                        // console.log(res);
                        if(res.code == 200) {
                            this.$message.success("修改成功");
                            this.$emit("isSuccess", "success");
                        }
                        else {
                            this.$message.error("修改失败");
                        }
                        this.isLoading = false;
                        
                    }).catch(error => {
                        console.log(error);
                        this.$message.error("修改失败");
                        this.isLoading = false;
                    })
                }
                else {
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>
.editQuestion .confirmBtn {
    float:right;
}
</style>