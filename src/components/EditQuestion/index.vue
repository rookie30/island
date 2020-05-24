<template>
    <div class="editQuestion">
        <el-dialog
            title="题目信息编辑"
            :visible.sync="isEdit">
            <el-form
                ref="questionInfoForm"
                :model="questionInfo"
                :rules="rule"
                status-icon
                label-position="right"
                label-width="80px">
                <el-form-item label="题目内容" >
                    <el-input v-model="questionInfo.content" class="infoInput"></el-input>
                </el-form-item>
                <el-form-item label="答案">
                    <el-input v-model="questionInfo.answer" class="infoInput"></el-input>
                </el-form-item>
                <el-form-item label="分析">
                    <el-input v-model="questionInfo.analysis" class="infoInput"></el-input>
                </el-form-item>
                <el-form-item label="难度">
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
                <el-form-item label="状态">
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
                    <el-button type="primary" class="confirmBtn">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'editQuestion',
    data() {
        return {
            isEdit: false,
            questionInfo: {},
            rule: {

            }
        }
    },
    methods: {
        editQuestionInfo(info) {
            this.isEdit = !this.isEdit;
            this.questionInfo = info;
        }
    }
}
</script>

<style scoped>
.editQuestion .confirmBtn {
    float:right;
}
</style>