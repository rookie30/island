<!-- 批卷页 -->
<template>
    <div class="checkGrade">
        <el-table :data="gradeInfo" highlight-current-row v-loading="isLoading" class="gradeInfoTable">
            <el-table-column align="center" label="ID" width="80">
                <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="姓名">
                <template slot-scope="scope">
                    {{ scope.row.username }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="成绩">
                <template slot-scope="scope">
                    {{ scope.row.grade }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {getGradeInfo} from '@/api/examManage';

export default {
    name: 'checkGrade',
    data() {
        return {
            examId: '',
            gradeInfo: [],
            isLoading: false,
        }
    },
    methods: {
        getGrade() {
            this.isLoading = true;
            getGradeInfo(this.examId).then(res => {
                console.log(res);
                this.isLoading = false;
                this.gradeInfo = res.data.rows;
            }).catch(err => {
                console.log(err);
                this.isLoading = false;
            });
        }
    },
    mounted() {
        this.examId = this.$route.query.examId;
        this.getGrade();
    }  
}
</script>

<style scoped>
.gradeInfoTable {
    margin-top: 20px;
}
</style>