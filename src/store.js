import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './main.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    searched: '',
    showSearch: false,
    showFilter: false,
    page: 1,
    category: [],
    categoryId: '',
    sort: '',
    feeds: [],
    ads: [],
    feedTotal: 0,
    adTotal: 0,
    initialLimit: 20,
    limit: 20,
    detail: [],
    detailFlag: false
  },
  getters: {
    getSearch: state => {
      return state.searched
    },
    getShowSearch: state => {
      return state.showSearch
    },
    getShowFilter: state => {
      return state.showFilter
    },
    getPage: state => {
      return state.page
    },
    getCategory: state => {
      return state.category
    },
    getCategoryId: state => {
      return state.categoryId
    },
    getInitialLimit: state => {
      return state.initialLimit
    },
    getLimit: state => {
      return state.limit
    },
    getList: state => {
      return state.feeds
    },
    getAds: state => {
      return state.ads
    },
    getSort: state => {
      return state.sort
    },
    getFeedTotal: state => {
      return state.feedTotal
    },
    getAdTotal: state => {
      return state.adTotal
    },
    getDetail: state => {
      return state.detail
    },
    getDetailFlag: state => {
      return state.detailFlag
    }
  },
  mutations: {
    expandLimit: function (state) {
      if (state.limit + state.initialLimit > state.feedTotal)
        alert('모든 아이템을 출력하였습니다.')
      else
        state.limit += 20
    },
    requestCategory: function (state, payload) {
      state.category = payload.data.category
    },
    requestFeeds: function (state, payload) {
      state.feeds = payload.data.data
      state.feedTotal = payload.data.total
    },
    requestAds: function (state, payload) {
      state.ads = payload.data.data
      for (let i = 0; i < state.ads.length; i++) {
        state.ads[i].id = state.ads[i].id + 10000 // fixed feedTotal
      }
      state.adTotal = payload.data.total
    },
    initSort: function (state, payload) {
      localStorage.setItem('sort', payload)
      state.sort = payload
    },
    sortToggle: function (state) {
      if (state.sort == 'asc') {
        localStorage.setItem('sort', 'desc')
        state.sort = 'desc'
      }
      else {
        localStorage.setItem('sort', 'asc')
        state.sort = 'asc'
      }
    },
    changeSearch: function (state, payload) {
      state.searched = payload
    },
    showSearch: function (state) {
      if (state.showSearch == false)
        state.showSearch = true
      else
        state.showSearch = false
    },
    showFilter: function (state) {
      if (state.showFilter == false)
        state.showFilter = true
      else
        state.showFilter = false
    },
    changeCategoryId: function(state, payload) {
      localStorage.setItem('category', payload)
      state.categoryId = payload
    },
    requestDetail: function (state, payload) {
      state.detail = payload.data.data
      return state.detail
    },
    detailFlagChange: function (state, payload) {
      state.detailFlag = payload
    }
  },
  actions: {
    requestCategory: function(context) {
      axios.get(`https://problem.comento.kr/api/category`)
      .then((result) => {
        return context.commit('requestCategory', result)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    requestFeeds: function(context) {
      if (this.state.categoryId == '') {
        // localStorage에 category 아이템이 없을 때
        let temp = localStorage.getItem('category')
        if (temp == null)
          context.commit('changeCategoryId', '1,2,3')
        else
          context.commit('changeCategoryId', temp)
        // sort 아이템도 없을 것이므로 확인
        temp = localStorage.getItem('sort')
        if (temp == null)
          context.commit('initSort', 'asc')
        else
          context.commit('initSort', temp)
      } else {
        axios.get(`https://problem.comento.kr/api/list`, {
          params: {
            page: context.getters.getPage,
            ord: context.getters.getSort,
            category: context.getters.getCategoryId.split(','),
            limit: context.getters.getLimit
          }
        })
        .then((result) => {
          return context.commit('requestFeeds', result)
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    requestAds: function(context) {
      axios.get(`https://problem.comento.kr/api/ads`, {
        params: {
          page: context.getters.getPage,
          limit: context.getters.getLimit
        }
      })
      .then((result) => {
        return context.commit('requestAds', result)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    requestDetail: function(context) {
      axios.get(`https://problem.comento.kr/api/view`, {
        params: {
          id: router.currentRoute.params.id
        }
      })
      .then((result) => {
        return context.commit('requestDetail', result)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
});
