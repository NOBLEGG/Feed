import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import Feeds from './components/Feeds.vue'
import Detail from './components/Detail.vue'
import axios from 'axios'
import { store } from './store.js'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

Vue.prototype.$http = axios

const routes = [
  { path: '/', name: "Feeds", component: Feeds },
  { path: '/:id', name: "Detail", component: Detail }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')