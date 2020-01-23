<template>
  <div>
    <the-header :isLogged="isLogged" :token="token" :username="username" />
    <the-container :posts="posts" />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import TheFooter from '@/components/TheFooter.vue'
import defaultPosts from '@/data/posts'
import loadPosts from '@/service/loadPosts.js'
// @ is an alias to /src

export default {
  name: 'home',
  data () {
    return {
      posts: [],
      defaultPosts
    }
  },
  async mounted () {
    const data = await loadPosts()
    this.posts = data
  },
  props: {
    isLogged: Boolean,
    token: String,
    username: String
  },
  components: {
    TheHeader,
    TheContainer,
    TheFooter
  }
}
</script>
