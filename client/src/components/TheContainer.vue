<template>
  <main>
    <div v-if="errorMsg.length > 0" class="error-box"><p>{{errorMsg}}</p></div>
    <div v-else class="feed">
      <card-post v-for="post in posts" :post="post" :key="posts.indexOf(post)" ></card-post>
    </div>
  </main>
</template>

<script>
import CardPost from './CardPost'
export default {
  name: 'TheContainer',
  props: {
    posts: Array,
    errorMsg: String
  },

  components: {
    CardPost
  }
}
</script>

<style lang="scss">
main {
  overflow: auto;
  height: calc(100vh);
  width: 100vw;
}
.main::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}

.feed {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 50px 0 90px 0;
}

.feed::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}
.error-box {
  height: 100vh;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
