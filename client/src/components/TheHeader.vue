<template>
  <header :key="componentKey">
    <router-link :to="'/'" class="routes">
      <i class="fab fa-vuejs"></i> Home
    </router-link>
    <div v-if="logValidation">
      <i class="fas fa-user"></i> {{userData.username}}
      <button @click="logOut"><i class="fas fa-sign-out-alt"></i></button>
    </div>
    <div v-else>
      <router-link :to="'/login'" class="routes">
        <i class="fas fa-user"></i> Log In
      </router-link>
    </div>
  </header>
</template>

<script>
// import Vue from 'vue'
// Vue.forceUpdate()
export default {
  name: 'TheHeader',
  data () {
    return {
      componentKey: 0
    }
  },
  props: {
    userData: Object
  },
  computed: {
    logValidation () {
      return this.userData.isLogged
    }
  },
  methods: {
    logOut () {
      localStorage.clear()
      this.$router.go()
    }
    // forceRerender() {
    //   this.componentKey += 1;
    // }
  }
}
</script>

<style scoped lang="scss">
.routes {
  color: #ffffff;
  text-decoration: none;
}

header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #041e30;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 10;

  button {
    color: #ffffff;
    font-weight: bold;
    background-color: transparent;
    border: 0px solid;
    font-size: 14px;
    -webkit-appearance: none;
  }
}
</style>
