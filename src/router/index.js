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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/userManage',
    roles: ['16'],
    children: [{
      path: 'userManage',
      name: 'UserManage',
      component: () => import('@/views/userManage/index'),
      meta: { title: '用户管理', icon: 'dashboard' },
    }]
  },

  // {
  //   path: '/questionBankManagement',
  //   component: Layout,
  //   redirect: '/questionBankManagement/questionBankInfo',
  //   name: 'questionBankManagement',
  //   meta: { title: '题库管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'questionBankInfo',
  //       name: 'questionBankInfo',
  //       component: () => import('@/views/questionBankManage/questionBankInfo/index'),
  //       meta: { title: '题库信息', icon: 'questionBank' }
  //     },
  //     {
  //       path: 'administratorManagement',
  //       name: 'administratorManagement',
  //       component: () => import('@/views/questionBankManage/adminManage/index'),
  //       meta: { title: '管理员管理', icon: 'personManage' }
  //     },
  //   ]
  // },

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

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const asyncRoutes = [
  {
    path: '/questionBankManagement',
    component: Layout,
    redirect: '/questionBankManagement/questionBankInfo',
    name: 'questionBankManagement',
    meta: { title: '题库管理', icon: 'example', role: ['32']},
    children: [
      {
        path: 'questionBankInfo',
        name: 'questionBankInfo',
        component: () => import('@/views/questionBankManage/questionBankInfo/index'),
        meta: { title: '题库信息', icon: 'questionBank', role: ['32']}
      },
      {
        path: 'administratorManagement',
        name: 'administratorManagement',
        component: () => import('@/views/questionBankManage/adminManage/index'),
        meta: { title: '管理员管理', icon: 'personManage', role: ['32'] }
      },
    ]
  },
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
