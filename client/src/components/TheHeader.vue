<template>
  <header>
     <router-link :to="'/'"> <i class="fab fa-vuejs"></i> Home</router-link>
     <router-link :to="'/login'"> <i class="fas fa-user"></i> Login</router-link>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  props: {
    step: {
      type: Number,
      default: 1
    }
  }

}
</script>

<style scoped lang="scss">
header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #041e30;
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
