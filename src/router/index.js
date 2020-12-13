import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import treeTableRouter from './modules/tree-table'
import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/mine',
    component: Layout,
    redirect: '/mine/index',
    meta: {
      roles: ['ROLE_SYSADMIN', 'ROLE_STUDENT'] // you can set roles in root nav
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/mine/page'),
        name: 'mine',
        meta: { title: 'mine', icon: 'user', noCache: true, roles: ['ROLE_SYSADMIN', 'ROLE_STUDENT'] }
      }
    ]
  },
  {
    path: '/myteam',
    component: Layout,
    redirect: '/myteam/index',
    meta: {
      roles: ['ROLE_SYSADMIN', 'ROLE_STUDENT'] // you can set roles in root nav
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/myteam/page'),
        name: 'myteam',
        meta: { title: 'myteam', icon: 'peoples', noCache: true, roles: ['ROLE_SYSADMIN', 'ROLE_STUDENT'] }
      }
    ]
  },
  {
    path: '/works',
    component: Layout,
    redirect: '/works/index',
    meta: {
      roles: ['ROLE_SYSADMIN', 'ROLE_STUDENT'] // you can set roles in root nav
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/works/page'),
        name: 'works',
        meta: { title: 'works', icon: 'form', noCache: true, roles: ['ROLE_SYSADMIN', 'ROLE_STUDENT'] }
      }
    ]
  },
  {
    path: '/review',
    component: Layout,
    redirect: '/review/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'review',
      icon: 'lock',
      roles: ['ROLE_SYSADMIN'] // you can set roles in root nav
    },
    children: [
      {
        path: 'reviewinfo',
        component: () => import('@/views/review/reviewinfo'),
        name: 'reviewinfo',
        meta: {
          title: 'reviewinfo',
          roles: ['ROLE_SYSADMIN'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'createrater',
        component: () => import('@/views/review/createrater'),
        name: 'CreateRater',
        meta: {
          title: 'CreateRater',
          roles: ['ROLE_SYSADMIN']
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/mytask',
    component: Layout,
    redirect: '/mytask/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'mytask',
      icon: 'lock',
      roles: ['ROLE_REVIEWRATER'] // you can set roles in root nav
    },
    children: [
      {
        path: 'completed',
        component: () => import('@/views/mytask/completed'),
        name: 'completed',
        meta: {
          title: 'completed',
          roles: ['ROLE_REVIEWRATER'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'uncompleted',
        component: () => import('@/views/mytask/uncompleted'),
        name: 'uncompleted',
        meta: {
          title: 'uncompleted',
          roles: ['ROLE_REVIEWRATER']
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/final',
    component: Layout,
    redirect: '/final/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'final',
      icon: 'lock',
      roles: ['ROLE_FINALRATER','ROLE_SYSADMIN'] // you can set roles in root nav
    },
    children: [
      {
        path: 'rate',
        component: () => import('@/views/final/page'),
        name: 'final',
        meta: { title: 'on_siteReview', icon: 'form', noCache: true, roles: ['ROLE_FINALRATER'] }
      },
      {
        path: 'completed',
        component: () => import('@/views/final/completed'),
        name: 'completed',
        meta: { title: 'completed', icon: 'form', noCache: true, roles: ['ROLE_FINALRATER'] }
      },
      {
        path: 'finalinfo',
        component: () => import('@/views/final/finalinfo'),
        name: 'finalinfo',
        meta: { title: 'finalinfo', icon: 'form', noCache: true, roles: ['ROLE_SYSADMIN'] }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    meta:{roles: ['ROLE_SYSADMIN']},
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true ,roles: ['ROLE_SYSADMIN']}
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    meta:{roles: ['ROLE_SYSADMIN']},
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true,roles: ['ROLE_SYSADMIN'] }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['ROLE_SYSADMIN'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['ROLE_SYSADMIN'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission',
          roles: ['ROLE_SYSADMIN']
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    meta:{roles: ['ROLE_SYSADMIN']},
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true,roles: ['ROLE_SYSADMIN'] }
      }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  treeTableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example',
      roles: ['ROLE_SYSADMIN']
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit',roles: ['ROLE_SYSADMIN'] }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true ,roles: ['ROLE_SYSADMIN']},
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list',roles: ['ROLE_SYSADMIN'] }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    meta:{roles: ['ROLE_SYSADMIN']},
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab', roles: ['ROLE_SYSADMIN']}
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404',
      roles: ['ROLE_SYSADMIN']
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true ,roles: ['ROLE_SYSADMIN']}
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true,roles: ['ROLE_SYSADMIN'] }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    meta:{roles: ['ROLE_SYSADMIN']},
    children: [
      {
        path: 'log',
        component: () => import('@/views/errorLog/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' ,roles: ['ROLE_SYSADMIN']}
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel',
      roles: ['ROLE_SYSADMIN']
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' ,roles: ['ROLE_SYSADMIN']}
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' ,roles: ['ROLE_SYSADMIN']}
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel',roles: ['ROLE_SYSADMIN'] }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip',roles: ['ROLE_SYSADMIN'] },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip',roles: ['ROLE_SYSADMIN'] }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    meta:{roles: ['ROLE_SYSADMIN']},
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' ,roles: ['ROLE_SYSADMIN']}
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true,
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    meta:{roles: ['ROLE_SYSADMIN']},
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme', roles: ['ROLE_SYSADMIN']}
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    meta:{roles: ['ROLE_SYSADMIN']},
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' ,roles: ['ROLE_SYSADMIN']}
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    meta:{roles: ['ROLE_SYSADMIN']},
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international',roles: ['ROLE_SYSADMIN'] }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    meta:{roles: ['ROLE_SYSADMIN']},
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
