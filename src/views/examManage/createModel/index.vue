<!-- 创建考试页 -->
<template>
    <div class="createModel">
        <el-card class="modelCard" v-loading="isLoading">
            <div slot="header">创建考试</div>
            <el-form 
                :model="modelInfo" 
                ref="modelInfoForm" 
                label-width="80px"
                :rules="rules">
                <el-form-item label="试卷名称" prop="name">
                    <el-input v-model="modelInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="试卷类型" prop="type">
                    <el-select v-model="modelInfo.type">
                        <el-option 
                            :value=0
                            label="模拟卷">
                        </el-option>
                        <el-option
                            :value=1
                            label="正式卷">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-bottom:0;">
                    <el-button 
                        type="primary"
                        style="float:right;"
                        @click="submitForm('modelInfoForm')">
                        创建
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {createModel} from '@/api/examManage';

export default {
    name: 'createModel',
    data() {
        let checkName = (rule, name, callback) => {
            if(!name) {
                return callback(new Error("试卷名称不能为空"));
            }
            callback();
        };
        return {
            modelInfo: {
                name: '',
                type: 1,
                library_id: '',
            },
            isLoading: false,
            rules: {
                name: [
                    {validator: checkName, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // createModel(this.modelInfo)
                } 
                else {
                    this.$message.error("创建失败");
                    return false;
                }
            });
        },
        getLibraryID() {
            this.library_id = sessionStorage.getItem("")
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
.createModel {
    display: flex;
    justify-content: center;
    align-items: center;
}
.createModel .modelCard {
    width: 80%;
    height: 280px;
    position: absolute;
    top: 15%;
}
</style>