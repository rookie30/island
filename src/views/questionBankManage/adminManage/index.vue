<template>
  <div class="adminManage">
    <div style="margin-top: 25px;">
      <el-input 
        placeholder="请输入搜索内容" 
        v-model="searchCont.input" 
        suffix-icon="el-icon-search" 
        class="searchInput">
      </el-input>
      <el-select v-model="listQuery.status" class="userStatusChoose">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
      <el-button 
        type="primary"
        class="searchBtn"
        icon="el-icon-search"
        @click="searchInfo">搜索</el-button>
      <el-button 
        icon="el-icon-plus"
        style="float:right;"
        @click="createAdmin">
      </el-button>
      <CreateAdminForm
        ref="CreateAdminForm"
        @isSuccess="getCreateSituation($event)">
      </CreateAdminForm>
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
          <el-button icon="el-icon-lock" type="warning" circle class="lockAccountBtn operationBtn" @click="openLockTip(row)" v-if="row.status == 1"></el-button>
          <el-button icon="el-icon-unlock" type="success" circle class="lockAccountBtn operationBtn" @click="openUnLockTip(row)" v-else></el-button>
          <el-button icon="el-icon-delete" type="danger" circle class="delAccountBtn operationBtn" @click="openDelTip"></el-button>
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
import CreateAdminForm from '@/components/createAdmin/index';

export default {
  name: 'adminManage',
  components: {
    Pagination,
    CreateAdminForm
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
  inject: [
    'reload'
  ],
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      searchCont: {
        inputCont: "",
        status: "1"
      },
      listQuery: {
        currectPage: 1,
        limit: 20,
        type: "16",
        status: "1"
      },
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      api.getAdminList(this.listQuery).then(res => {
        console.log(res);
        this.list = res.data.rows;
        this.total = res.data.count;
        this.listLoading = false;
      }).catch(error => {
        this.listLoading = false;
        this.$message.error("获取题库信息失败");
        console.log(error);
      });
    },
    /**
     * 解锁账号提示
     */
    openUnLockTip(userInfo) {
       this.$confirm("此操作将会解锁该账号,是否继续?","提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.activateAccount(userInfo.id);
      }).catch(error => {
        this.$message.error("操作失败");
        console.log(error);
      });
    },
    /**
     * 删除账号提示
     */
    openDelTip() {
      this.$confirm("此操作将会删除该账号信息,是否继续?","警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        this.$message.success("操作成功");
      });
    },
    /**
     * 禁用账号提示
     */
    openLockTip(userInfo) {
      this.$confirm("此操作将会使该账号冻结,是否继续?","提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.disableAccount(userInfo.id);
      }).catch(error => {
        this.$message.error("操作失败");
        console.log(error);
      });
    },
    disableAccount(userID) {
      api.disableAccount(userID).then(res => {
        this.$message.success("操作成功");
        this.reloadPage();
      });
    },
    activateAccount(userID) {
      api.activateAccount(userID).then(res => {
        this.$message.success("操作成功");
        this.reloadPage();
      });
    },
    reloadPage() {
      this.listLoading = true;
      setTimeout(() => {
        this.listLoading = false;
        this.reload();
      }, 200);
    },
    createAdmin() {
      this.$refs.CreateAdminForm.isCreateAdmin();
    },
    searchInfo() {
      this.getList();
    },
    getCreateSituation(data) {
      if(data == "success") {
        this.reloadPage();
      }
    }
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
.adminManage .userStatusChoose {
  width: 100px;
}
</style>

