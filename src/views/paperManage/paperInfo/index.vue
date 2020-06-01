<template>
  <div class="paper-container">
    <div class="toolbar">
      <el-button icon="el-icon-plus" style="float:right;margin-right:10px;" @click="handleAdd"></el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" style="width: 100%">
      <el-table-column align="center" label="试卷ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属题库">
        <template slot-scope="scope">
          <span>{{ scope.row.library_id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="试卷名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总分">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status===1?'正常':'已禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type===1?'已发布':'草稿' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
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
            @click="handleLock(scope.row)"
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
        library_id: '',
        limit: 10
      },
      list: [],
      total: 0,
      listLoading: false
    };
  },
  methods: {
    handleLock(paper_info) {
      console.log(paper_info);
      // 禁用
      if(paper_info.status) {
        this.$confirm("此操作将禁用该试卷, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // api 请求
            api
              .banPaper(paper_info.id)
              .then(response => {
                console.log(response);
                this.$message.success("禁用成功");
                this.reload();
              })
              .catch(err => {
                this.$message.error(err.message);
              });
          })
          .catch(() => {
            this.$message.info("已取消操作");
          });
      }
      else {
        this.$confirm("此操作将启用该试卷, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // api 请求
            api
              .activatePaper(paper_info.id)
              .then(response => {
                console.log(response);
                this.$message.success("启用成功");
                this.reload();
              })
              .catch(err => {
                this.$message.error(err.message);
              });
          })
          .catch(() => {
            this.$message.info("已取消操作");
          });
      }
      
    },
    handleAdd() {
      this.$router.push({path: "/paperManage/paperModel"});
    },
    handleDelete(paper_id) {
      this.$confirm("此操作将永久删除该试卷, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // api 请求
          api
            .deletePaper(paper_id)
            .then(response => {
              // console.log(response);
              this.$message.success("删除成功");
              this.reload();
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    getList() {
      this.listLoading = true;
      api
        .getPapers(this.listQuery)
        .then(response => {
          console.log(response);
          this.list = response.data.rows;
          this.total = response.data.count;
          this.listLoading = false;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  },
  mounted() {
    this.listQuery.library_id = JSON.parse(sessionStorage.getItem("userInfo")).library_id;
    this.getList();
  }
};
</script>

<style scoped>
.paper-container .toolbar{
  margin: 15px 10px;
}
</style>