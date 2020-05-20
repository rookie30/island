<!-- 创建题库表单 -->
<template>
    <div class="QBform">
        <el-dialog
            title="创建题库" 
            :visible.sync="isCreate"
            @closed="resetForm">
            <el-form
                :model="questionBankForm"
                label-width="80px"
                status-icon
                :rules="rules"
                v-loading="pageIsLoading"
                ref="questionBankForm">
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
                        :loading="isLoading"
                        class="tagChoose">
                        <el-option 
                            v-for="item in tagList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否收费" prop="isFree">
                    <el-select v-model="questionBankForm.isFree">
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
                        v-model="questionBankForm.admin_id">
                        <el-option
                            v-for="item in adminList"
                            :key="item.id"
                            :label="item.username"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label-width="0"
                    style="margin:20px;"
                    prop="remark">
                    <el-input
                        type="textarea"
                        placeholder="请输入题库备注信息"
                        v-model="questionBankForm.remark"
                        maxlength="200"
                        :rows="5"
                        show-word-limit
                        resize="none"></el-input>
                </el-form-item>
                <el-form-item
                    style="margin-bottom:0;">
                    <el-button
                        type="primary"
                        style="float:right;margin-right:20px;"
                        @click="submitForm('questionBankForm')">
                        创建
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import * as api from '@/api/questionBank'; 
import {getFreeAdmin} from '@/api/adminManage';

export default {
    name: "createQuestionBankForm",
    data() {
        let checkName = (rule, name, callback) => {
            if(!name) {
                callback(new Error("题库名称不能为空"));
            }
            else if(!(/^[0-9a-zA-Z\u4e00-\u9fa5#+]{1,20}$/).test(name)) {
                callback(new Error("题库名称不合法"));
            }
            else {
                callback();
            }
        };
        let checkTag = (rule, tag, callback) => {
            if(tag == "") {
                return callback(new Error("情选择题库标签"));
            }
            callback();
        };
        let checkAdmin = (rule, admin, callback) => {
            if(admin == "") {
                return callback(new Error("情选择题库管理员"));
            }
        }
        return {
            questionBankForm: {
                name: "",
                tag_id: "",
                isFree: "1",
                remark: "",
                admin_id: "",
            },
            tagList: null,
            adminList: null,
            isCreate: false,
            isLoading: false,
            pageIsLoading: false,
            rules: {
                name: [
                    {validator: checkName, trigger: 'blur'}
                ],
                tag_id: [
                    {validator: checkTag, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        /**
         * 创建题库表单显示控制
         */
        createQB() {
            this.isCreate = !this.isCreate;
        },
        /**
         * 获取题库标签
         */
        getTag() {
            this.isLoading = true;
            api.getTagInfo().then(res => {
                this.tagList = res.data;
                this.isLoading = false;
            }).catch(error => {
                console.log(error);
                this.isLoading = false;
                this.$message.error("获取标签信息失败");
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    this.pageIsLoading = true;
                    api.createQB(this.questionBankForm).then(res => {
                        this.$message.success("创建成功");
                        this.pageIsLoading = false;
                        this.isCreate = false;
                        this.$emit("isSuccess", "success");
                    }).catch(error => {
                        console.log(error);
                        this.$message.error("创建失败");
                        this.pageIsLoading = false;
                    });
                }
            });
        },
        resetForm() {
            this.questionBankForm = {isFree: "1"};
        },
        getAdminList() {
            getFreeAdmin().then(res => {
                console.log(res);
                this.adminList = res.data;
            }).catch(error => {
                console.log(error);
                this.$message.error("获取未分配管理员信息失败");
            });
        },
    },
    mounted() {
        this.getTag();
        this.getAdminList();
        
    },
}
</script>

<style scoped>
.QBform {

}
</style>