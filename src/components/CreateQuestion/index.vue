<!-- 题目创建页 -->
<template>
    <div class="createQuestion">
        <el-dialog
            title="题目创建"
            :visible.sync="isCreate"
            v-loading="isLoading">
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
                <!-- 判断题答案输入 -->
                <transition name="el-fade-in">
                    <template >
                        <el-form-item label="题目内容" prop="content" v-show="questionInfo.type==3">
                            <el-input 
                                v-model="questionInfo.content" 
                                class="infoInput"
                                placeholder="请输入题目内容">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="答案" prop="answer" v-show="questionInfo.type==3">
                            <el-input v-model="questionInfo.answer"
                                class="infoInput"
                                placeholder="请输入题目答案">
                            </el-input>
                        </el-form-item>
                    </template>
                </transition>
                <!-- end -->
                <el-form-item label="分析" prop="analysis">
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
                        style="float:right;">
                        创建
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'createQuestion',
    data() {
        return {
            questionInfo: {
                content: '',
                answer: '',
                analysis: '',
                level: 1,
                status: 0,
                type: 1
            },
            isCreate: false,
            isLoading: false,
            rules: {

            },

        }
    },
    methods: {
        createQuestion() {
            this.isCreate = !this.isCreate;
        }
    }
}
</script>

<style scoped>

</style>