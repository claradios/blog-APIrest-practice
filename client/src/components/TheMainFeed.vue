<template>
  <main>
    <div v-if="errorMsg.length > 0" class="error-box">
      <p>{{errorMsg}}</p>
    </div>
    <div v-else class="feed">
      <card-post
      v-for="post in posts" :post="post" :key="posts.indexOf(post)"
      @delete-this-post="HandleDeleteThisPost"></card-post>
    </div>
  </main>
</template>

<script>
import CardPost from './CardPost'
import deletePostById from '@/service/deletePostById'
import userInfo from '@/store/'
export default {
  name: 'TheMainFeed',
  props: {
    posts: Array,
    errorMsg: String
  },
  methods: {
    async HandleDeleteThisPost (ev) {
      try {
        const _id = ev.currentTarget.id
        const { token } = userInfo.state

        await deletePostById(token, _id)

        const hasThisId = element => element._id === _id
        const index = this.posts.findIndex(hasThisId)
        this.posts.splice(index, 1)
      } catch (error) {
        console.log(error)
      }
    }
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
