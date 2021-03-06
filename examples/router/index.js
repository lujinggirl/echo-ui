import Vue from 'vue'
import VueRouter from 'vue-router'

import * as routerNames from './routerNames'
import config from '../build-config'

// import Home from '../views/Home.vue'

import Header from '@/views/header/Header'
import Hello from '@/views/hello/Hello'
import Content from '@/views/content/Content'

import Post from '@/components/post/Post'
import componentList from '../views/content/assets/componentList'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: routerNames.HELLO
    }
  },
  {
    path: '/home',
    name: routerNames.HELLO,
    components: {
      header: Header,
      body: Hello
    },
    meta: {
      pageTitle: `router.${routerNames.HELLO}`
    }
  },
  {
    path: '/component',
    name: routerNames.COMPONENT,
    components: {
      header: Header,
      body: Content
    },
    meta: {
      detail: routerNames.COMPONENTDETAIL,
      pageTitle: `router.${routerNames.COMPONENT}`,
      contentData: componentList
    },
    children: [
      {
        path: ':subName',
        name: routerNames.COMPONENTDETAIL,
        component: Post,
        meta: {
          detail: routerNames.COMPONENTDETAIL,
          pageTitle: `router.${routerNames.COMPONENTDETAIL}`,
          contentData: componentList
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
var historyMode = config.historyMode

function getFixedUrl (url) {
  return url.slice(0, url.lastIndexOf('/'))
}

function getRouter (routes, rootUrl) {
  for (var route of routes) {
    if (historyMode) {
      if (route.path.indexOf('/') === 0) {
        route.path = getFixedUrl(rootUrl) + route.path
      }
    }
  }
  return routes
}
const router = new VueRouter({
  
  mode: historyMode ? 'history' : 'hash',
  routes: getRouter(routes, config.rootUrl)
})

export default router
