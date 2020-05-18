<template>
  <div class="adminManage">
    <div style="margin-top: 25px;">
      <el-input 
        placeholder="请输入搜索内容" 
        v-model="searchCont.input" 
        suffix-icon="el-icon-search" 
        class="searchInput">
      </el-input>
      <el-button type="primary" class="searchBtn" icon="el-icon-search">搜索</el-button>
    </div>

    <el-table 
      v-loading="listLoading" 
      :data="list"
      fit 
      size="mini"
      highlight-current-row 
      class="userList">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ listQuery.limit * (listQuery.page - 1)  + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="账号">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300" label="Email" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="120" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status == 1 ? "启用" : "禁用" }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="操作" align="center">
        <template slot-scope="{row}">
          <!-- <el-button icon="el-icon-lock" type="warning" circle class="lockAccountBtn operationBtn" @click="openLockTip(row)" v-if="row.status == 1"></el-button>
          <el-button icon="el-icon-unlock" type="success" circle class="lockAccountBtn operationBtn" @click="openUnLockTip(row)" v-else></el-button>
          <el-button icon="el-icon-delete" type="danger" circle class="delAccountBtn operationBtn" @click="openDelTip"></el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import request from '@/utils/request';
import * as api from "@/api/adminManage";

export default {
  name: 'adminManage',
  components: {
    Pagination,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    },
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      searchCont: {
        inputCont: "",
        sex: "1",
        status: "1"
      },
      listQuery: {
        currectPage: 1,
        limit: 20,
        type: "16",
      },
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      api.getAdminList(this.listQuery).then(res => {
        console.log(res);
        this.list = res.data.list;
        this.total = res.data.total;
        this.listLoading = false;
      }).catch(error => {
        this.listLoading = false;
        this.$message.error("获取题库信息失败");
        console.log(error);
      });
    },
  },
  mounted() {
    this.getList();
  }
}
</script>

<style scoped>
.adminManage {
  width: 95%;
  margin: 0 auto;
}
.adminManage .searchInput {
  width: 280px;
}
.adminManage .userList {
  width: 100%;
  margin-top: 20px;
}
.adminManage .searchBtn {
  width: 110px;
  margin: 0 10px;
}
</style>

