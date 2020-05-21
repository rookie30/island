<!-- 题库信息管理 -->
<template>
  <div class="questionBankInfo">
    <div style="margin: 25px 0;">
      <el-input placeholder="请输入查找的题库名称" v-model="listQuery.name" suffix-icon="el-icon-search" class="searchInput"></el-input>
      <el-select
        v-model="listQuery.tag_id"
        class="questionBankTypeChoose"
        placeholder="请选择题库类别">
        <el-option
          v-for="tagItem in tagList"
          :key="tagItem.id"
          :value="tagItem.id"
          :label="tagItem.name">
        </el-option>
      </el-select>
      <el-button 
        type="primary" 
        class="searchBtn" 
        icon="el-icon-search"
        @click="getList">
        搜索
      </el-button>
      <el-button 
        class="addBtn"
        icon="el-icon-plus"
        @click="createQuestionBank"
        >
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      size="mini"
      class="questionBankTable"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ listQuery.limit * (listQuery.currectPage - 1) + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="题库名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="题库类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tagName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理员" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.username == null ? "未分配" : scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="是否免费" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.isfree == 1 ? "免费" : "收费" }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_at | parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.updated_at | parseTime }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="题库状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status == 1 ? "启用" : "禁用" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button 
            icon="el-icon-edit-outline"
            circle 
            class="operationBtn"
            @click="editQuestionBank(scope.row)">
          </el-button>
          <el-button icon="el-icon-delete" circle type="danger" class="operationBtn" @click="openDelTip"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currectPage" :limit.sync="listQuery.limit" @pagination="getList" />
    <CreateQuestionBankForm
        ref="CreateQuestionBankForm"
        @isSuccess="getCreateInfo($event)">
    </CreateQuestionBankForm>
    <EditQuestionBankForm 
      ref="EditQuestionBankForm"
      @isSuccessEdit="getEditInfo($event)"></EditQuestionBankForm>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import * as api from '@/api/questionBank'
import CreateQuestionBankForm from "@/components/createQuestionBank/index"
import request from '@/utils/request'
import {parseTime} from '@/utils/index'
import EditQuestionBankForm from '@/components/EditQuestionBank/index'

export default {
  components: {
    CreateQuestionBankForm,
    Pagination,
    EditQuestionBankForm
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    },
    parseTime
  },
  inject: [
    'reload'
  ],
  data() {
    return {
      list: null,
      listLoading: false,
      total: 100,
      listQuery: {
        currentPage: 1,
        limit: 20,
        tag_id: "",
        name: ""
      },
      isCreate: false,
      editRow: null,
      tagList: {},
    }
  },
  methods: {
    /**
     * 删除题库提示
     */
    openDelTip() {
      this.$confirm("此操作将会删除该题库,是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        this.$message.success("删除成功");
      });
    },
    getList() {
      this.isLoading = true;
      api.getList(this.listQuery).then(res => {
        // console.log(res);
        this.list = res.data.rows;
        let questionInfo = res.data.rows;
        this.total = res.data.count;
        this.isLoading = false;
      }).catch(error => {
        this.isLoading = false;
        this.$message.error("获取题库信息失败");
        console.log(error);
      });
    },
    createQuestionBank() {
      this.$refs.CreateQuestionBankForm.createQB();
    },
    editQuestionBank(info) {
      let i = JSON.parse(JSON.stringify(info));
      this.$refs.EditQuestionBankForm.editQB(i);
    },
    getCreateInfo(createSituation) {
      if(createSituation == "success") {
        this.reloadPage();
      }
    },
    getEditInfo(editSituation) {
      if(editSituation == "success") {
        this.reloadPage();
      }
    },
    reloadPage() {
      this.listLoading = true;
      setTimeout(() => {
        this.listLoading = false;
        this.reload();
      }, 100);
    },
    /**
     * 获取题库标签
     */
    getTagInfomation() {
      api.getTagInfo().then(res => {
        // console.log(res);
        this.tagList = res.data;
      }).catch(error => {
        this.$message.error("获取题库标签失败");
        console.log(error);
      });
    }
  },
  mounted() {
    this.getList();
    this.getTagInfomation();
  }
}
</script>

<style scoped>
.questionBankInfo {
  width: 95%;
  margin: 0 auto;
}
.questionBankInfo .addBtn {
  float: right;
}
.questionBankInfo .searchInput {
  width: 280px;
}
.questionBankInfo .questionBankTypeChoose {
  width: 150px;
  margin: 0 10px;
}
.questionBankInfo .questionBankTable {
  margin-bottom: 20px;
}
.questionBankInfo .operationBtn {
  margin: 0 15px;
}
</style>