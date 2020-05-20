<!-- 题库管理员创建 -->
<template>
    <div class="createAdmin">
        <el-dialog
            title="创建题库管理员" 
            :visible.sync="isCreate"
            @closed="resetForm">
            <el-form
                class="createAdminForm"
                :model="adminInfo"
                label-width="80px"
                status-icon
                :rules="rules"
                ref="createAdminForm">
                <el-form-item label="账号" prop="account">
                    <el-input
                        v-model="adminInfo.account"
                        placeholder="账号应由5~20位的数字或字母"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input
                        v-model="adminInfo.username"
                        placeholder="用户名应由20位以内的数字或字母"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password1">
                    <el-input 
                        v-model="adminInfo.password1"
                        show-password
                        placeholder="请输入密码">
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input
                        v-model="adminInfo.password2"
                        show-password
                        placeholder="请确认密码">
                    </el-input>
                </el-form-item>
                <el-form-item label-width="0" style="margin-bottom:0;">
                    <el-button
                        type="primary"
                        style="float:right;"
                        @click="submitForm('createAdminForm')">
                        创建
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {createAdminAccount} from '@/api/adminManage';

export default {
    name: 'createAdmin',
    data() {
        // 账号检验规则
        let checkAccount = (rule, account, callback) => {
            if(!account) {
                callback(new Error("账号不能为空"));
            }
            else if(!(/^[0-9a-zA-Z]{3,20}$/).test(account)) {
                callback(new Error("账号不合法"));
            }
            else {
                callback();
            }
        };
        // 用户名检验规则
        let checkUsername = (rule, username, callback) => {
            if(!username) {
                callback(new Error("用户名不能为空"));
            }
            else if(!(/^[0-9a-zA-Z]{1,20}$/).test(username)) {
                callback(new Error("用户名不合法"));
            }
            else {
                callback();
            }
        };
        let checkPass = (rule, password, callback) => {
            if(!password) {
                callback(new Error("密码不能为空"));
            }
            else if(!(/^[0-9a-zA-Z]{5,20}$/).test(password)) {
                callback(new Error("密码应为5~20位数字或字母"));
            }
            else {
                callback();
            }
        };
        let checkPass1 = (rule, password1, callback) => {
            if(!password1) {
                callback(new Error("密码不能为空"));
            }
            else if(password1 != this.adminInfo.password1) {
                callback(new Error("两次密码不一致"));
            }
            else {
                callback();
            }
        };
        return {
            isCreate: false,
            adminInfo: {
                account: "",
                username: "",
                password1: "",
                password2: ""
            },
            rules: {
                account: [
                    {validator: checkAccount, trigger: 'blur'},
                ],
                username: [
                    {validator: checkUsername, trigger: 'blur'},
                ],
                password1: [
                    {validator: checkPass, trigger: 'blur'},
                ],
                password2: [
                    {validator: checkPass1, trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        /**
         * 控制题库管理员创建页面是否显示
         */
        isCreateAdmin() {
            this.isCreate = !this.isCreate;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    // this.$emit("isSuccess", "success");
                    createAdminAccount(this.adminInfo).then(res => {
                        console.log(res);
                        this.$message.success("创建成功");
                        this.$emit("isSuccess", "success");
                    }).catch(error => {
                        if(error.response.status == 400) {
                            this.$message.error("创建失败，账号已存在");
                        }
                        else {
                            this.$message.error("创建失败");
                        }
                        console.log(error);
                    });
                }
            });
        },
        resetForm() {
            this.adminInfo = {};
        }

    }
}
</script>

<style scoped>
.createAdmin .createAdminForm {
    margin: 0 20px;
}
</style>