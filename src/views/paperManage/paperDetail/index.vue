<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>试卷基本信息</span>
          </div>
          <el-form ref="form" label-width="80px" :model="paper_info">
            <el-form-item label="试卷名称">
              <el-input v-model="paper_info.name"></el-input>
            </el-form-item>
            <el-form-item label="试卷总分">
              <el-input v-model="paper_info.score"></el-input>
            </el-form-item>
            <el-form-item label="试卷状态">
              <el-radio-group v-model="paper_info.status">
                <el-radio :label="1">启动</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="试卷类型">
              <el-radio-group v-model="paper_info.type">
                <el-radio :label="1">正式</el-radio>
                <el-radio :label="2">模拟</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" style="float:right">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>已选题目列表</span>
          </div>
          <el-table :data="problems" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left">
                  <el-form-item label="题目内容">
                    <span>{{ props.row.content }}</span>
                  </el-form-item>
                  <el-form-item label="题目答案">
                    <span>{{ props.row.answer }}</span>
                  </el-form-item>
                  <el-form-item label="题目分析">
                    <span>{{ props.row.analysis }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="章节" prop="chapter" align="center" width="60"></el-table-column>
            <el-table-column label="难度" prop="level" align="center" width="60"></el-table-column>
            <el-table-column label="状态" prop="status" align="center" width="60"></el-table-column>
            <el-table-column label="类型" prop="type" align="center" width="60"></el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.created_at | parseTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.updated_at | parseTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="danger" @click="removeProblem(scope.row)" size="mini">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>可选题目列表</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index";
import * as api from "@/api/paper";

export default {
  data() {
    return {
      paper_id: "",
      problems: [],
      paper_info: {}
    };
  },
  filters: {
    parseTime
  },
  methods: {
    onSubmit() {
      this.$confirm("此操作将创建该试卷, 请确认题目已添加完成!!!", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    getProblems() {},
    getDetail() {
      api
        .getPaperDetail(this.paper_id)
        .then(response => {
          console.log(response);
          this.paper_info = response.data.info;
          this.problems = response.data.exercises;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  },
  mounted() {
    if (!this.$route.query.add) {
      this.paper_id = this.$route.query.paper_id;
      this.getDetail();
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.box-card {
  margin: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
</style>