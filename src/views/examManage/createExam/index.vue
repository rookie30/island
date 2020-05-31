<!-- 创建考试 -->
<template>
    <div class="createExam">
        <el-card class="examCard" v-loading="isLoading">
            <div slot="header">创建考试</div>
            <el-form 
                :model="examInfo" 
                ref="examInfoForm" 
                label-width="80px"
                :rules="rules">
                <el-form-item label="考试名称" prop="name">
                    <el-input v-model="examInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="试卷选择" prop="paper_id">
                    <el-select v-model="examInfo.paper_id" placeholder="情选择试卷">
                        <el-option
                            v-for="item in paperList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考试时间" prop="start">
                    <el-date-picker
                        v-model="examTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        :clearable="false"
                        @change="selectTime"
                        @blur="checkTime">
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="margin-bottom:0;">
                    <el-button 
                        type="primary"
                        style="float:right;"
                        @click="submitForm('examInfoForm')">
                        创建
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {parseTime} from '@/utils/index';
import * as api from '@/api/examManage';

export default {
    name: 'createExam',
    data() {
        let checkName = (rule, name, callback) => {
            if(!name) {
                return callback(new Error("试卷名称不能为空"));
            }
            callback();
        };
        let checkTime = (rule, examTime, callback) => {
            if(!examTime) {
                return callback(new Error("情选择考试时间"));
            }
            callback();
        };
        let checkPaper = (rule, paper, callback) => {
            if(!paper) {
                return callback(new Error("情选择试卷"));
            }
            callback();
        };
        return {
            examInfo: {
                name: '',
                paper_id: '',
                start: '',
                end: ''
            },
            paperList: {},
            examTime: '',
            isLoading: false,
            libraryInfo: {
                library_id: '',
                type: 2
            },
            rules: {
                name: [
                    {validator: checkName, trigger: 'blur'}
                ],
                start: [
                    {validator: checkTime, trigger: 'blur'}
                ],
                paper_id: [
                    {validator: checkPaper, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.createExam(this.examInfo).then(res => {
                        if(res.code == 200) {
                            this.$message.success("创建成功");
                            setTimeout(() => {
                                this.$router.push("/examManage/examInfo");
                            }, 300);
                        }
                        else {
                            this.$message.error("创建失败");
                        }
                    }).catch(err => {
                        console.log(err);
                        this.$message.error("创建失败");
                    });
                } 
                else {
                    return false;
                }
            });
        },
        selectTime() {
            if(this.examTime){
                this.examInfo.start = parseTime(this.examTime[0]);
                this.examInfo.end = parseTime(this.examTime[1]);
            }
            else {
                this.examInfo.start = '';
                this.examInfo.end = '';
            }
        },
        checkTime() {
            if(!this.examTime) {
                this.examInfo.start = '';
                this.examInfo.end = '';
            }
        }
    },
    mounted() {
        this.libraryInfo.library_id = JSON.parse(sessionStorage.getItem('userInfo')).library_id;
        api.getPaperInfo(this.libraryInfo).then(res => {
            this.paperList = res.data;
            // console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }
}
</script>

<style scoped>
.createExam {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
}
.createExam .examCard {
    width: 80%;
}
</style>