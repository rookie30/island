<!-- 考试信息管理页 -->
<template>
  <div class="examInfo">
    <div class="header">
      <el-select v-model="examStatus.status" @change="getExamInformation">
        <el-option value="" label="所有"> </el-option>
        <el-option :value="0" label="报名中"> </el-option>
        <el-option :value="1" label="进行中"> </el-option>
        <el-option :value="2" label="待批阅"> </el-option>
        <el-option :value="3" label="已结束"> </el-option>
      </el-select>
	  <router-link to="/examManage/createExam">
		<el-button
			icon="el-icon-plus" 
			style="float:right;margin-right:10px;">
		</el-button>
	  </router-link>
    </div>
    <el-table :data="examInfo" highlight-current-row v-loading="isLoading" fit>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="考试名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始时间">
        <template slot-scope="scope">
          {{ scope.row.start | parseTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="结束时间">
        <template slot-scope="scope">
          {{ scope.row.end | parseTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" v-if="examStatus.status==2">
        <template slot-scope="scope">
          <el-button type="primary" @click="openTip(scope.row.id)">批卷</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="考试状态"
        v-if="examStatus.status === ''"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTypeFilter" v-if="scope.row.status==2" @click="openTip(scope.row.id)" class="statusTag">
            {{ scope.row.status | statusFilter }}
          </el-tag>
          <el-tag :type="scope.row.status | statusTypeFilter" v-else>
              {{ scope.row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as api from "@/api/examManage";
import { getChapterInfo } from "@/api/chapterManage";
import { parseTime } from "@/utils/index";

export default {
  name: "examInfo",
  filters: {
    parseTime,
    statusFilter(status) {
      const statusMap = {
        0: "报名中",
        1: "进行中",
        2: "待批阅",
        3: "已结束"
      };
      return statusMap[status];
    },
    statusTypeFilter(status) {
      const statusMap = {
        1: "success",
        2: "warning",
        3: "info"
      };
      return statusMap[status];
    }
  },
  inject: [
    "reload",
  ],
  data() {
    return {
      examStatus: {
        library_id: "",
        status: ""
      },
      examInfo: [],
      isLoading: false
    };
  },
  methods: {
    getExamInformation() {
      this.isLoading = true;
      const c = JSON.parse(JSON.stringify(this.examStatus));
      api
        .getExamInfo(c)
        .then(res => {
          this.isLoading = false;
          this.examInfo = res.data;
          console.log(res);
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          // this.$message.error("获取考试信息失败");
        });
    },
    openTip(examId) {
      this.$alert("此操作将提交考试并自动批卷，是否继续", "提示", {
        confirmButtonText: "确定",
        type: 'warning'
      }).then(() => {
        api.checkPaper(examId).then(res => {
          this.$message.success("提交成功");
          setTimeout(() => {
            this.reload();
          }, 300);
        }).catch(err => {
          console.log(err);
          this.$message.error("提交失败");
        });
      }).catch(() => {

      });
    }
  },
  mounted() {
    this.examStatus.library_id = JSON.parse(sessionStorage.getItem("userInfo")).library_id;
    this.getExamInformation();
  }
};
</script>

<style scoped>
.examInfo .header {
  margin: 15px 10px;
}
.statusTag:hover {
  cursor: pointer;
}
</style>
