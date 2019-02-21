//引入vue  vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import actions from './actions'
import mutations from './mutations'
import state from './state'

export default new Vuex.Store({
  actions,
  mutations,
  state
})
