<!-- 个人中心 -->
<template>
    <div class="personalCenter">
        <el-card class="personalInfoCard">
            <div slot="header">
                <span>个人信息</span>
                <!-- <el-button 
                style="float: right; padding: 3px 0" 
                type="text"
                @click="changePwd">修改密码</el-button> -->
            </div>
            <el-form 
                class="userInfo" 
                :model="userInfo" 
                label-width="80px"
                >
                <!-- <el-form-item 
                    label-width="0" 
                    style="display:flex;justify-content:center">
                    <el-avatar 
                        :src="require('../../assets/avatar.jpg')"
                         :fit="none "
                        :size="150"></el-avatar>
                </el-form-item> -->
                 <el-form-item>
                    <div class="img-container">
                        <img :src="require('../../assets/avatar.jpg')" alt="" srcset="" class="img-avatar">
                    </div>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input disabled v-model="userInfo.account"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="userInfo.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <!-- <el-collapse-transition>
                    <div>
                        <el-form-item
                        v-show="showChangePwd"
                        label="新密码">
                        <el-input></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-transition> -->
                <el-form-item label-width="0">
                    <el-button type="primary" class="saveChangeBtn" @click="modify">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>    
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import {removeToken} from "@/utils/auth";

import { modifyInfo } from "@/api/user";

export default {
    name: "personalCenter",
    components: {
        Breadcrumb,
    },
    inject:['reload'],
    data() {
        return {
            userInfo: {
                account: '',
                avatar: '',
                sex: '',
                username: '',
                email: '',
            },
            showChangePwd: false,
        }
    },
    methods: {
        /**
         * 获取用户信息
         */
        getUserInfo() {
            this.$store.dispatch('user/getInfo').then(res => {
                console.log(res);
                this.userInfo = res;
            }).catch(error => {
                console.log(error);
                this.$message.error("获取用户信息失败");
            });
        },
        changePwd() {
            this.showChangePwd = !this.showChangePwd;
        },
        modify(){
            
            const data = {
                id:this.userInfo.id,
                sex:this.userInfo.sex,
                email:this.userInfo.email
            }

            console.log(data);

            modifyInfo(data).then(res=>{
                this.$message.success('保存成功');
                this.reload();
            }).catch(err=>{
                this.$message.error(err.message);
            })

        }
    },
    mounted() {
        this.getUserInfo();
    }
}
</script>

<style scoped>
.personalCenter .header {
    width: 100%;
    height: 50px;
    box-shadow: 0 1px 4px rgba(0,21,41,0.08);
}
.personalCenter .backBtn {
    border: none;
}
.personalCenter .personalInfoCard {
    width: 40%;
    margin: 50px auto;
}
.personalCenter .userInfo .el-input{
    width: 90%;
    
}
.personalCenter .saveChangeBtn {
    width: 50%;
    margin-top: 20px;
    position: relative;
    left: 25%;
}
.personalCenter .personalInfoCard .el-card__header {
    text-align: center;
}

.img-container{
    width: 100px;
    margin: 0 auto;
    overflow: hidden;
    transform: translateX(-50%);
}
.img-avatar{
    width: 100%;
    border-radius: 30%;
}

</style>