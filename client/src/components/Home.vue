<template>
    <the-main-feed :posts="posts" :errorMsg="errorMsg"/>
</template>

<script>

import TheMainFeed from '@/components/TheMainFeed.vue'
import loadPosts from '@/service/loadPosts.js'

export default {
  name: 'home',
  data () {
    return {
      posts: [],
      errorMsg: ''
    }
  },
  async mounted () {
    try {
      const data = await loadPosts()
      this.posts = data
    } catch (error) {
      console.log(error)
      this.errorMsg = error.message
    }
  },

  components: {
    TheMainFeed
  }
}
</script>
