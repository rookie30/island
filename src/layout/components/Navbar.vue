<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper">
          <img :src="require('../../assets/avatar.jpg')" class="user-avatar">
          <i class="el- -caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/personalCenter">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <!-- <router-link to="/noticeCenter">
            <el-badge 
              :value="unReadNoticeNum" 
              class="item" 
              :max="99"
              :hidden="unReadNoticeNum > 0 ? false : true">
              <el-dropdown-item>
                通知中心
              </el-dropdown-item>
            </el-badge>
          </router-link> -->
          <el-dropdown-item divided @click.native="openLogOutTip">
            <span style="display:block;color:red;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import auth, { removeToken } from "@/utils/auth"
import { resetRouter } from '@/router'
import {getNoticeInfo} from '@/api/notice';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data() {
    return {
      unReadNoticeNum: 0,
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    /**
     * 显示退出登录提示
     */
    openLogOutTip() {
      this.$confirm("确认退出吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        this.logout();
      });
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // getUnReadNoticeNum() {
    //   const userID = JSON.parse(sessionStorage.getItem("userInfo")).id;
    //   const userInfo = {"from": userID};
    //   getNoticeInfo(userInfo).then(res => {
    //     console.log(res);
    //   }).catch(error => {
    //     console.log(error);
    //     this.$message.error("获取通知信息失败");
    //   });
    // }
  },
  mounted() {
    // this.getUnReadNoticeNum();
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
