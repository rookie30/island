<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>试卷基本信息</span>
          </div>
          <el-form
            ref="form"
            :rules="rules"
            label-width="80px"
            :model="paper_info"
          >
            <el-form-item label="试卷名称" prop="name">
              <el-input v-model="paper_info.name"></el-input>
            </el-form-item>
            <el-form-item label="试卷总分" prop="score">
              <el-input v-model="paper_info.score"></el-input>
              <div class="tip">
                <span>单选题2分/题，多选题4分/题，判断题1分/题</span>
              </div>
            </el-form-item>
            <el-form-item label="试卷状态" prop="status">
              <el-radio-group v-model="paper_info.status">
                <el-radio :label="1">启动</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="试卷类型" prop="type">
              <el-radio-group v-model="paper_info.type">
                <el-radio :label="1">正式</el-radio>
                <el-radio :label="2">模拟</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit('form')"
                style="float:right"
                >保存</el-button
              >
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
            <el-table-column label="类型" align="center" width="70">
              <template slot-scope="scope">
                <span>{{ scope.row.type | questionTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="难度" align="center" width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.level | levelFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              align="center"
              width="60"
            ></el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.created_at | parseTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.updated_at | parseTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  @click="removeProblem(scope.row)"
                  size="mini"
                  >移除</el-button
                >
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
          <div>
            <div class="toolBar">
              <el-select v-model="selectChapter" @change="changeChapter">
                <el-option
                  v-for="item in questionList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                >
                </el-option>
              </el-select>
            </div>
            <el-table
              :data="chapertQuestion"
              style="width: 100%"
              v-loading="listLoading"
            >
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
              <el-table-column label="类型" align="center" width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.type | questionTypeFilter }}</span>
                </template>
              </el-table-column>
              <el-table-column label="难度" align="center" width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.level | levelFilter }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                prop="status"
                align="center"
                width="60"
              ></el-table-column>
              <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.created_at | parseTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="更新时间" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.updated_at | parseTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="addQuestion(scope.row)"
                    >添加</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
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
    let checkName = (rule, name, callback) => {
      if (!name) {
        return callback(new Error("请输入试卷名称"));
      }
      callback();
    };
    let checkScore = (rule, score, callback) => {
      if (!score) {
        callback(new Error("请输入试卷总分"));
      }
      else if(score <10 || score > 150) {
        callback(new Error("试卷总分应在10-150分之内"));
      } 
      else {
        callback();
      }
    };
    let checkStatus = (rule, status, callback) => {
      console.log(status);
      if(status == null) {
        return callback(new Error("情选择考试状态"));
      }
      callback();
    };
    let checkType = (rule, type, callback) => {
      if(!type) {
        return callback(new Error("请选择试卷类型"));
      }
      callback();
    };
    return {
      paper_id: "",
      problems: [],
      paper_info: {},
      questionInfo: {
        id: "",
        type: "",
        level: ""
      },
      questionList: [],
      selectChapter: "", // 当前选择的章节id
      listLoading: false,
      chapertQuestion: [], // 当前选择的章节中的题目
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        score: [{ validator: checkScore, trigger: "blur" }],
        status: [{ validator: checkStatus, trigger: 'blur' }],
        type: [{ validator: checkType, trigger: 'blur' }],
      }
    };
  },
  filters: {
    parseTime,
    levelFilter(level) {
      const levelMap = {
        1: "简单",
        2: "中等",
        3: "困难"
      };
      return levelMap[level];
    },
    questionTypeFilter(type) {
      const typeMap = {
        1: "单选题",
        2: "多选题",
        3: "判断题"
      };
      return typeMap[type];
    }
  },
  inject: [
    "reload"
  ],
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("此操作将创建该试卷, 请确认题目已添加完成!!!", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              if (!this.calculateScore()) {
                this.$message.error("分数计算错误");
              } else {
                // 编辑题目列表
                let questionNumList = "";
                for(let i=0;i<this.problems.length;i++) {
                  if(i!=this.problems.length - 1) {
                    questionNumList += this.problems[i].id;
                    questionNumList += ","
                  }
                  else {
                    questionNumList += this.problems[i].id;
                  }
                }
                this.paper_info.problem_list = questionNumList;
                
                this.paper_info.status += ""; // 将status字段转为string
                this.paper_info.score = parseInt(this.paper_info.score); // 将score字段转为int
                // console.log(this.paper_info);
                
                api.addPaper(this.paper_info).then(res => {
                  // console.log(res);
                  this.reload();
                  this.$message.success("修改成功");
                }).catch(err => {
                  console.log(err);
                  this.$message.error("修改失败");
                });
              }
            });
        }
        else {
          return false;
        }
      });
    },
    /**
     * 获取可选题目
     */
    getQuestionList() {
      this.listLoading = true;
      api
        .getQuestionInfo(this.questionInfo)
        .then(res => {
          // console.log(res);
          this.listLoading = false;
          // this.questionList = res.data;
          this.questionList = this.objToArray(res.data);
          this.selectChapter = this.questionList[0].id;
          this.chapertQuestion = this.questionList[0].child;
          // console.log(this.questionList);
        })
        .catch(err => {
          console.log(err);
          this.listLoading = false;
        });
    },
    /**
     * 获取试卷信息
     */
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
    },
    objToArray(obj) {
      let result = [];
      Object.keys(obj).forEach(key => {
        result.push(obj[key]);
      });
      return result;
    },
    changeChapter() {
      this.questionList.forEach(item => {
        if (item.id == this.selectChapter) {
          this.chapertQuestion = item.child;
        }
      });
    },
    /**
     * 添加题目
     */
    addQuestion(info) {
      let currentQuestion = {};
      // 获取当前章节的所有题目
      this.questionList.forEach(item => {
        if (item.id == this.selectChapter) {
          currentQuestion = item.child;
        }
      });

      // 删除可选题目中的数据,并添加到已选题目中
      currentQuestion.forEach((item, index) => {
        if (item.id == info.id) {
          currentQuestion.splice(index, 1);
          this.problems.push(item);
        }
      });
    },
    /**
     * 移除题目
     */
    removeProblem(info) {
      this.problems.forEach((item, index) => {
        if (item.id == info.id) {
          this.problems.splice(index, 1);
          this.chapertQuestion.push(item);
        }
      });
    },
    /**
     * 计算分数是否合法
     */
    calculateScore() {
      let totalScore = 0;
      this.problems.forEach(item => {
        switch (item.type) {
          case 1:
            totalScore += 2 
            break;
          case 2:
            totalScore += 4
            break;
          default:
            totalScore += 1;
        }
      });
      if (totalScore != this.paper_info.score) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.questionInfo.id = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).library_id;
    if (!this.$route.query.add) {
      this.paper_id = this.$route.query.paper_id;
      this.getDetail();
      this.getQuestionList();
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
.tip {
  font-size: 12px;
  color: gray;
  height: 20px;
}
</style>
