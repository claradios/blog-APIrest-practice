<template>
  <div>
    <the-header />
    <the-main-feed :posts="posts" :errorMsg="errorMsg"/>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheMainFeed from '@/components/TheMainFeed.vue'
import TheFooter from '@/components/TheFooter.vue'
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
    TheHeader,
    TheMainFeed,
    TheFooter
  }
}
</script>
