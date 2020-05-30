<!-- 创建考试 -->
<template>
    <div class="createExam">
        <el-card class="examCard" v-loading="isLoading">
            <div slot="header">创建考试</div>
            <el-form 
                :model="examInfo" 
                ref="examInfoForm" 
                label-width="80px">
                <el-form-item label="考试名称" prop="name">
                    <el-input v-model="examInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="试卷选择" prop="paper">
                    <el-select v-model="examInfo.paper">
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="考试时间">
                    <el-date-picker
                        v-model="examTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        @change="selectTime">
                    </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="开始时间" prop="start">

                </el-form-item>
                <el-form-item label="结束时间" prop="end">
                    
                </el-form-item> -->
                <el-form-item style="margin-bottom:0;">
                    <el-button 
                        type="primary"
                        style="float:right;"
                        @click="submitForm">
                        创建
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {parseTime} from '@/utils/index';

export default {
    name: 'createExam',
    data() {
        return {
            examInfo: {
                name: '',
                paper: '',
                start: '',
                end: ''
            },
            examTime: '',
            isLoading: false,
            libraryInfo: {
                library_id: '',
                type: 2
            }
        }
    },
    methods: {
        submitForm() {
            console.log(this.examInfo);
        },
        selectTime() {
            this.examInfo.start = parseTime(this.examTime[0]);
            this.examInfo.end = parseTime(this.examTime[1]);
        }
    }
}
</script>

<style scoped>
.createExam {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
}
.createExam .examCard {
    width: 80%;
}
</style>