<template>
  <div>
    <the-header />
    <the-container :posts="posts" :errorMsg="errorMsg"/>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import TheFooter from '@/components/TheFooter.vue'
import loadPosts from '@/service/loadPosts.js'

// @ is an alias to /src

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
    TheContainer,
    TheFooter
  }
}
</script>
