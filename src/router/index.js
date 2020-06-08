import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'dashboard'},
      },
    ]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/personalCenter',
    component: Layout,
    redirect: '/personalCenter/personalInfo',
    hidden: true,
    children: [{
      path: 'personalInfo',
      name: 'personalInfo',
      component: () => import('@/views/personalCenter/index'),
      meta: { title: '个人中心'}
    }]
  },

  {
    path: '/noticeCenter',
    component: Layout,
    redirect: '/noticeCenter/index',
    hidden: true,
    children: [{
      path: 'index',
      name: 'noticeCenter',
      component: () => import('@/views/noticeCenter/index'),
      meta: {title: '通知中心'}
    }]
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const asyncRoutes = [
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage',
    children: [{
      path: 'userManage',
      name: 'userManage',
      component: () => import('@/views/userManage/index'),
      meta: { title: '用户管理', icon: 'dashboard', roles: ['32']},
    }]
  },

  {
    path: '/questionBankManagement',
    component: Layout,
    redirect: '/questionBankManagement/questionBankInfo',
    name: 'questionBankManagement',
    meta: { title: '题库管理', icon: 'example', roles: ['32']},
    children: [
      {
        path: 'questionBankInfo',
        name: 'questionBankInfo',
        component: () => import('@/views/questionBankManage/questionBankInfo/index'),
        meta: { title: '题库信息', icon: 'questionBank', roles: ['32']}
      },
      {
        path: 'administratorManagement',
        name: 'administratorManagement',
        component: () => import('@/views/questionBankManage/adminManage/index'),
        meta: { title: '管理员管理', icon: 'personManage', roles: ['32'] }
      },
    ]
  },
  
  {
    path: '/chapterManage',
    component: Layout,
    redirect: 'chapterManage/index',
    meta: {roles: ['16']},
    children: [
      {
        path: 'index',
        name: 'chapterManage',
        component: () => import('@/views/chapterManage/index'),
        meta: { title: '章节管理', icon: 'personManage', roles: ['16'] }
      },
    ]
  },

  {
    path: '/questionManage',
    component: Layout,
    redirect: 'questionManage/index',
    meta: {roles: ['16']},
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'questionManage',
        component: () => import('@/views/questionManage/index'),
        meta: { title: '题目管理', icon: 'personManage', roles: ['16'] }
      },
    ]
  },
  
  {
    path: '/examManage',
    component: Layout,
    redirect: 'examManage/examInfo',
    meta: { roles: ['16'] },
    children: [
      {
        path: 'examInfo',
        name: 'examInfo',
        component: () => import('@/views/examManage/examInfo/index'),
        meta: { title: '考试信息', icon: 'examManage', roles: ['16'] },
      },
      {
        path: 'createExam',
        name: 'createExam',
        hidden: true,
        component: () => import('@/views/examManage/createExam/index'),
        meta: { title: '创建考试', icon: 'examManage', roles: ['16'] }
      },
      {
        path: 'checkGrade',
        name: 'checkGrade',
        hidden: true,
        component: () => import('@/views/examManage/checkGrade/index'),
        meta: { title: '查看成绩', roles: ['16'] }
      }
    ]
  },

  {
    path: '/paperManage',
    component: Layout,
    redirect: 'paperManage/paperInfo',
    meta: {roles: ['16']},
    children: [
      {
        path: 'paperInfo',
        name: 'paperInfo',
        component: () => import('@/views/paperManage/paperInfo/index'),
        meta: { title: '试卷管理', icon: 'paper', roles: ['16'] },
      },
      {
        path: 'paperDetail',
        name: 'paperDetail',
        component:()=>import('@/views/paperManage/paperDetail/index'),
        hidden:true,
        meta:{title:'试卷详情',roles:['16']}
      },
      {
        path: 'paperModel',
        name: 'paperModel',
        component:()=> import('@/views/paperManage/paperModel/index'),
        hidden:true,
        meta:{title:'试卷模板',roles:['16']}
      },
    ]
  },


  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
  
]

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
