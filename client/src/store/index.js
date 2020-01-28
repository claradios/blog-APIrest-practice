import login from '../service/loginUser.js'

export default {
  state: {
    token: false,
    userData: false
  },

  async logUser (username, password) {
    const result = await login(username, password)

    if (result) {
      this.state.token = result.token
      this.state.userData = result.userData

      localStorage.setItem('token', this.state.token)
      localStorage.setItem('userData', JSON.stringify(this.state.userData))
    }

    return result
  },
  getFromLocalStorage () {
    this.state.token = localStorage.getItem('token')
    this.state.userData = JSON.parse(localStorage.getItem('userData'))
  }
}
// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },https://github.com/claradios/vuex.git
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
