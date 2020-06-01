<!-- 题目创建页 -->
<template>
    <div class="createQuestion">
        <el-dialog
            title="题目创建"
            :visible.sync="isCreate"
            v-loading="isLoading"
            @closed="resetForm('questionInfoForm')">
            <el-form
                ref="questionInfoForm"
                :model="questionInfo"
                :rules="rules"
                status-icon
                label-position="right"
                label-width="80px">
                <el-form-item label="题目类型" prop="type">
                    <el-select
                        v-model="questionInfo.type">
                        <el-option
                            :value="1"
                            label="单选题">
                        </el-option>
                        <el-option
                            :value="2"
                            label="多选题">
                        </el-option>
                        <el-option
                            :value="3"
                            label="判断题">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="题目内容" prop="content">
                    <!-- <el-input 
                        v-model="questionInfo.content" 
                        class="infoInput"
                        placeholder="请输入题目内容">
                    </el-input> -->
                    <vue-editor v-model="questionInfo.content"></vue-editor>
                </el-form-item>
                <el-form-item label="答案" prop="answer" v-show="questionInfo.type!=3">
                    <el-input v-model="questionInfo.answer"
                        class="infoInput"
                        placeholder="请输入题目答案">
                    </el-input>
                </el-form-item>
                <el-form-item label="答案" prop="answer" v-show="questionInfo.type==3">
                    <el-radio v-model="questionInfo.answer" label="1">正确</el-radio>
                    <el-radio v-model="questionInfo.answer" label="2">错误</el-radio>
                </el-form-item>
                <el-form-item label="解析" prop="analysis">
                    <el-input 
                        v-model="questionInfo.analysis" 
                        class="infoInput"
                        placeholder="请输入题目解析">
                    </el-input>
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
                            value="1"
                            label="发布">
                        </el-option>
                        <el-option
                            value="0"
                            label="草稿">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-bottom:0;">
                    <el-button 
                        type="primary" 
                        class="confirmBtn"
                        style="float:right;"
                        @click="submitForm('questionInfoForm')">
                        创建
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {createQuestionInfo} from '@/api/questionManage';
import {VueEditor} from 'vue2-editor';

export default {
    name: 'createQuestion',
    components: {
        VueEditor,
    },
    data() {
        let checkNull = (rule, content, callback) => {
            if(!content) {
                return callback(new Error("内容不能为空"));
            }
            callback();
        };
        return {
            questionInfo: {
                content: '',
                answer: '',
                analysis: '',
                level: 1,
                status: '0',
                type: 1,
                chapter: ''
            },
            isCreate: false,
            isLoading: false,
            rules: {
                content: [
                    {validator: checkNull, trigger: 'blur'},
                ],
                answer: [
                    {validator: checkNull, trigger: 'blur'},
                ],
                analysis: [
                    {validator: checkNull, trigger: 'blur'},
                ],
            },

        }
    },
    methods: {
        createQuestion(chapterID) {
            this.isCreate = !this.isCreate;
            if(this.isCreate) {
                this.questionInfo.chapter = chapterID;
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    console.log(this.questionInfo);
                    this.isLoading = true;
                    createQuestionInfo(this.questionInfo).then(res => {
                        console.log(res);
                        this.$message.success("创建成功");
                        this.isLoading = false;
                        this.$emit("isCreate", "success")
                    }).catch(error => {
                        console.log(error);
                        this.$message.error("创建失败");
                        this.isLoading = false;
                    });
                }
                else {
                    return false;
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>

</style>