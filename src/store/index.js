import Vue from 'vue'
import Vuex from 'vuex'
import Rezepte from './Rezepte'
import Statistik from './Statistiken'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Rezepte,
    Statistik
  }
})

export default store
