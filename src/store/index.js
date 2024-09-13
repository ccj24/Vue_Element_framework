import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView
  },
  getters,
  plugins: [vuexLocal.plugin]
})

export default store
