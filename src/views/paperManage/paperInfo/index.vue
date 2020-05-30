<template>
  <div class="paper-container">
    <el-table v-loading="listLoading" :data="list" style="width: 100%">
      <el-table-column align="center" label="id" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属题库" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.library_id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="试卷名" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总分" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.status===1?'正常':'已禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.type===1?'已发布':'草稿' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/paperManage/paperDetail?paper_id='+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">详情</el-button>
          </router-link>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
          <el-button
            :type="scope.row.status===1?'danger':'primary'"
            size="small"
            :icon="scope.row.status===1?'el-icon-lock':'el-icon-unlock'"
            @click="handleLock(scope.row.id)"
          >{{scope.row.status===1?'禁用':'启动'}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import * as api from "@/api/paper";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  inject: ["reload"],
  data() {
    return {
      listQuery: {
        currentPage: 1,
        type: 1,
        library_id: 1,
        status: 1,
        limit: 10
      },
      list: [],
      total: 0,
      listLoading: false
    };
  },
  methods: {
    handleLock(paper_id) {
      this.$confirm("此操作将禁用该试卷, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // api 请求
        api.banPaper(paper_id).then(response=>{
          console.log(response);
          this.$message.success('禁用成功');
          this.reload();
        }).catch(err=>{
          this.$message.error(err.message);
        })

      }).catch(() => {
          this.$message.info("已取消操作");
      });
    },
    handleAdd() {
      this.$message.success("添加");
    },
    handleDelete(paper_id) {
      this.$confirm("此操作将永久删除该试卷, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        
        // api 请求
        api.deletePaper(paper_id).then(response=>{
          console.log(response);
          this.$message.success('删除成功');
          this.reload();
        }).catch(err=>{
          this.$message.error(err.message);
        })

      }).catch(() => {
        this.$message.info("已取消操作");
      });
    },
    getList() {
      this.listLoading = true;
      api
        .getPapers(this.listQuery)
        .then(response => {
          this.list = response.data.rows;
          this.total = response.data.count;
          this.listLoading = false;
          console.log(response);
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.paper-container {
  padding: 40px;
}
</style>