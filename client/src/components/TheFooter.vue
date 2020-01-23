<template>
  <footer>
    <div class="footer-upload">
      <button>
        <router-link :to="'/new-post'" class="routes"> <i class="fas fa-plus-square"></i>new</router-link>
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped lang="scss">
.routes{
  color:#ffffff;
  text-decoration:none;
}
footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  background-color: #041e30;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  z-index: 10;

  .footer-upload {
    p {
      font-size: 0.63rem;
      position: absolute;
      left: -25px;
      top: 5px;
    }
  }

  input[name="file"] {
    visibility: hidden;
  }

  label {
    cursor: pointer;
    z-index: 99;
  }

  button {
    background-color:#041e30;
    color: #ffffff;
  }
}
</style>
