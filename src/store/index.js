import Vue from 'vue'
import Vuex from 'vuex'
import Rezepte from './Rezepte'
import Statistik from './Statistiken'
import Details from './Details'
import Filter from './Filter'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Rezepte,
    Statistik,
    Details,
    Filter
  }
})

export default store
