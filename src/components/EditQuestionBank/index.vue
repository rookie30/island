<!-- 题库编辑页 -->
<template>
    <div class="editQB">
        <el-dialog
            title="题库编辑"
            :visible.sync="isEdit">
            <el-form
                :model="questionBankForm"
                label-width="80px"
                status-icon
                v-loading="pageIsLoading"
                ref="questionBankForm"
                :rules="rules"
                class="editQBForm">
                <el-form-item label="名称" prop="name">
                    <el-input 
                        placeholder="题库名称应由20个字符以内的汉字数字或字母组成"
                        v-model="questionBankForm.name"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="类型" prop="tag_id">
                    <el-select 
                        v-model="questionBankForm.tag_id"
                        :loading="tagChooseLoading"
                        @focus="getTagInformation"
                        class="tagChoose choosePart">
                        <el-option 
                            v-for="item in tagList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否收费" prop="isfree">
                    <el-select 
                        v-model="questionBankForm.isfree"
                        class="choosePart">
                        <el-option
                            label="免费"
                            value="1">
                        </el-option>
                        <el-option
                            label="收费"
                            value="0">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理员" prop="admin_id">
                    <el-select
                        v-model="questionBankForm.admin_id"
                        :loading="adminChooseLoading"
                        class="choosePart">
                        <el-option
                            v-for="item in adminList"
                            :key="item.id"
                            :label="item.username"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="题库状态" prop="status">
                    <el-select 
                        v-model="questionBankForm.status"
                        class="choosePart">
                        <el-option
                            label="启用"
                            value="1">
                        </el-option>
                        <el-option
                            label="禁用"
                            value="0">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label-width="0"
                    style="margin:20px;">
                    <el-input
                        type="textarea"
                        placeholder="请输入题库备注信息"
                        v-model="questionBankForm.remark"
                        maxlength="200"
                        :rows="5"
                        show-word-limit
                        resize="none">
                    </el-input>
                </el-form-item>
                <el-form-item
                    style="margin-bottom:0;">
                    <el-button
                        type="primary"
                        style="float:right;margin-right:20px;"
                        @click="submitForm">
                        保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {getFreeAdmin} from '@/api/adminManage';
import {getTagInfo} from '@/api/questionBank';

export default {
    name: 'editQuestionBank',
    data() {
        let checkName = (rule, name, callback) => {
            if(!name) {
                callback(new Error("题库名称不能为空"));
            }
            else if(!(/^[0-9a-zA-Z\u4e00-\u9fa5#]{1,20}$/).test(name)) {
                callback(new Error("题库名称不合法"));
            }
            else {
                callback();
            }
        };
        return {
            questionBankForm: {admin_id: 3},
            isEdit: false,
            beforeEditInfo: {},
            pageIsLoading: false,
            adminChooseLoading: false,
            tagChooseLoading: false,
            adminList: [],
            tagList: [],
            rules: {
                name: [
                    {validator: checkName, trigger: 'blur'}
                ],
            }
        }
    },
    methods: {
        editQB(info) {
            this.isEdit = !this.isEdit;
            console.log(info);
            this.questionBankForm = info;
            this.questionBankForm.isfree += "";
            this.questionBankForm.status += "";
            this.adminList.push({id: info.admin_id, username: info.username});
            this.tagList.push({id: info.tag_id, name: info.tagName});
        },
        /**
         * 获取未分配管理员信息
         */
        getAdminInfo() {
            this.adminChooseLoading = true;
            getFreeAdmin().then(res => {
                this.adminList = this.adminList.concat(res.data);
                this.adminChooseLoading = false;
            }).catch(error => {
                console.log(error);
                this.adminChooseLoading = false;
                this.$message.error("获取管理员信息失败");
            });
        },
        getTagInformation() {
            this.tagChooseLoading = true;
            getTagInfo().then(res => {
                this.tagList = this.tagList.concat(res.data);
                this.tagChooseLoading = false;
            }).catch(error => {
                console.log(error);
                this.$message.error("获取题库标签信息失败");
                this.tagChooseLoading = false;
            });
        },
        submitForm() {
            console.log(this.questionBankForm);
        },
    },
    mounted() {
        this.getAdminInfo();
    }
    
}
</script>

<style scoped>
.editQB .choosePart {
    float: left;
}
</style>