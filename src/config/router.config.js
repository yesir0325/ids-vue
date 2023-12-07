// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          // 外部链接
          // {
          //   path: 'https://www.baidu.com/',
          //   name: 'Monitor',
          //   meta: { title: 'menu.dashboard.monitor', target: '_blank' }
          // },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: RouteView,
        meta: { title: 'menu.form', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/basicForm'),
            meta: { title: 'menu.form.basic-form', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: 'menu.form.step-form', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: 'menu.form.advanced-form', keepAlive: true, permission: ['form'] }
          }
        ]
      },
      // list
      {
        path: '/list',
        name: 'list',
        component: RouteView,
        redirect: '/list/table-list',
        meta: { title: 'menu.list', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: 'menu.list.table-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/BasicList'),
            meta: { title: 'menu.list.basic-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: 'menu.list.card-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: 'menu.list.search-list', keepAlive: true, permission: ['table'] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: 'menu.list.search-list.articles', permission: ['table'] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'menu.list.search-list.projects', permission: ['table'] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: 'menu.list.search-list.applications', permission: ['table'] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: 'menu.profile', icon: 'profile', permission: ['profile'] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic'),
            meta: { title: 'menu.profile.basic', permission: ['profile'] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: 'menu.profile.advanced', permission: ['profile'] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: RouteView,
        redirect: '/result/success',
        meta: { title: 'menu.result', icon: 'check-circle-o', permission: ['result'] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: 'menu.result.success', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: 'menu.result.fail', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: 'menu.exception.not-find', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: 'menu.exception.server-error', permission: ['exception'] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
            ]
          }
        ]
      },
      // 实时监控
      {
        path: '/real-time-monitoring',
        name: 'real-time-monitoring',
        redirect: '/real-time-monitoring/test1',
        component: RouteView,
        meta: { title: '实时监控', keepAlive: true, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/real-time-monitoring/test1',
            name: 'real-time-monitoring1',
            component: () => import('@/views/real-time-monitoring/test1'),
            meta: { title: 'test1', keepAlive: true, permission: ['form'] }
          },
        {
          path: '/real-time-monitoring/test2',
          name: 'real-time-monitoring2',
          component: () => import('@/views/real-time-monitoring/test2'),
          meta: { title: 'test2', keepAlive: true, permission: ['form'] }
        }
      ]
    },
    // 攻击事件
    {
      path: '/attack-events',
      name: 'attack-events',
      redirect: '/attack-events/test1',
      component: RouteView,
      meta: { title: '攻击事件', keepAlive: true, permission: [ 'dashboard' ] },
      children: [
        {
          path: '/attack-events/test1',
          name: 'attack-events1',
          component: () => import('@/views/attack-events/test1'),
          meta: { title: 'test1', keepAlive: true, permission: ['form'] }
        },
      {
        path: '/attack-events/test2',
        name: 'attack-events2',
        component: () => import('@/views/attack-events/test2'),
        meta: { title: 'test2', keepAlive: true, permission: ['form'] }
      }
    ]
  },
  // 警报日志
  {
    path: '/alert-logs',
    name: 'alert-logs',
    redirect: '/alert-logs/test1',
    component: RouteView,
    meta: { title: '警报日志', keepAlive: true, permission: [ 'dashboard' ] },
    children: [
      {
        path: '/alert-logs/test1',
        name: 'alert-logs1',
        component: () => import('@/views/alert-logs/test1'),
        meta: { title: 'test1', keepAlive: true, permission: ['form'] }
      },
    {
      path: '/alert-logs/test2',
      name: 'alert-logs2',
      component: () => import('@/views/alert-logs/test2'),
      meta: { title: 'test2', keepAlive: true, permission: ['form'] }
    }
  ]
},
// 流量分析
{
  path: '/traffic-analysis',
  name: 'traffic-analysis',
  redirect: '/traffic-analysis/test1',
  component: RouteView,
  meta: { title: '流量分析', keepAlive: true, permission: [ 'dashboard' ] },
  children: [
    {
      path: '/traffic-analysis/test1',
      name: 'traffic-analysis1',
      component: () => import('@/views/traffic-analysis/test1'),
      meta: { title: 'test1', keepAlive: true, permission: ['form'] }
    },
  {
    path: '/traffic-analysis/test2',
    name: 'traffic-analysis2',
    component: () => import('@/views/traffic-analysis/test2'),
    meta: { title: 'test2', keepAlive: true, permission: ['form'] }
  }
]
},
// 规则管理
{
  path: '/rule-management',
  name: 'rule-management',
  redirect: '/rule-management/test1',
  component: RouteView,
  meta: { title: '规则管理', keepAlive: true, permission: [ 'dashboard' ] },
  children: [
    {
      path: '/rule-management/test1',
      name: 'rule-management1',
      component: () => import('@/views/rule-management/test1'),
      meta: { title: 'test1', keepAlive: true, permission: ['form'] }
    },
  {
    path: '/rule-management/test2',
    name: 'rule-management2',
    component: () => import('@/views/rule-management/test2'),
    meta: { title: 'test2', keepAlive: true, permission: ['form'] }
  }
]
},
// 用户管理
{
  path: '/user-management',
  name: 'user-management',
  redirect: '/user-management/test1',
  component: RouteView,
  meta: { title: '用户管理', keepAlive: true, permission: [ 'dashboard' ] },
  children: [
    {
      path: '/user-management/test1',
      name: 'management1',
      component: () => import('@/views/user-management/test1'),
      meta: { title: 'test1', keepAlive: true, permission: ['form'] }
    },
  {
    path: '/user-management/test2',
    name: 'management2',
    component: () => import('@/views/user-management/test2'),
    meta: { title: 'test2', keepAlive: true, permission: ['form'] }
  }
]
},
// 报告与分析
{
  path: '/reports-and-analysis',
  name: 'reports-and-analysis',
  redirect: '/reports-and-analysis/test1',
  component: RouteView,
  meta: { title: '报告与分析', keepAlive: true, permission: [ 'dashboard' ] },
  children: [
    {
      path: '/reports-and-analysis/test1',
      name: 'reports-and-analysis1',
      component: () => import('@/views/reports-and-analysis/test1'),
      meta: { title: 'test1', keepAlive: true, permission: ['form'] }
    },
  {
    path: '/reports-and-analysis/test2',
    name: 'reports-and-analysis2',
    component: () => import('@/views/reports-and-analysis/test2'),
    meta: { title: 'test2', keepAlive: true, permission: ['form'] }
  }
]
},
// 安全事件响应
{
  path: '/security-event-response',
  name: 'security-event-response',
  redirect: '/security-event-response/test1',
  component: RouteView,
  meta: { title: '安全事件响应', keepAlive: true, permission: [ 'dashboard' ] },
  children: [
    {
      path: '/security-event-response/test1',
      name: 'security-event-response1',
      component: () => import('@/views/security-event-response/test1'),
      meta: { title: 'test1', keepAlive: true, permission: ['form'] }
    },
  {
    path: '/security-event-response/test2',
    name: 'security-event-response2',
    component: () => import('@/views/security-event-response/test2'),
    meta: { title: 'test2', keepAlive: true, permission: ['form'] }
  }
]
},
// 系统配置
{
  path: '/system-configuration',
  name: 'system-configuration',
  redirect: '/system-configuration/test1',
  component: RouteView,
  meta: { title: '系统配置', keepAlive: true, permission: [ 'dashboard' ] },
  children: [
    {
      path: '/system-configuration/test1',
      name: 'system-configuration1',
      component: () => import('@/views/system-configuration/test1'),
      meta: { title: 'test1', keepAlive: true, permission: ['form'] }
    },
  {
    path: '/system-configuration/test2',
    name: 'system-configuration2',
    component: () => import('@/views/system-configuration/test2'),
    meta: { title: 'test2', keepAlive: true, permission: ['form'] }
  }
]
},
// 通知与警报设置
{
  path: '/notification-and-alert-settings',
  name: 'notification-and-alert-settings',
  redirect: '/notification-and-alert-settings/test1',
  component: RouteView,
  meta: { title: '通知与警报设置', keepAlive: true, permission: [ 'dashboard' ] },
  children: [
    {
      path: '/notification-and-alert-settings/test1',
      name: 'notification-and-alert-settings1',
      component: () => import('@/views/notification-and-alert-settings/test1'),
      meta: { title: 'test1', keepAlive: true, permission: ['form'] }
    },
  {
    path: '/notification-and-alert-settings/test2',
    name: 'notification-and-alert-settings2',
    component: () => import('@/views/notification-and-alert-settings/test2'),
    meta: { title: 'test2', keepAlive: true, permission: ['form'] }
  }
]
},
// 帮助与支持
{
  path: '/help-and-support',
  name: 'help-and-support',
  redirect: '/help-and-support/test1',
  component: RouteView,
  meta: { title: '帮助与支持', keepAlive: true, permission: [ 'dashboard' ] },
  children: [
    {
      path: '/help-and-support/test1',
      name: 'help-and-support1',
      component: () => import('@/views/help-and-support/test1'),
      meta: { title: 'test1', keepAlive: true, permission: ['form'] }
    },
  {
    path: '/help-and-support/test2',
    name: 'help-and-support2',
    component: () => import('@/views/help-and-support/test2'),
    meta: { title: 'test2', keepAlive: true, permission: ['form'] }
  }
]
}
      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
