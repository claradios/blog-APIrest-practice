<template>
  <div>
    <the-header :userData="userData" />
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
    userData: Object
  },
  components: {
    TheHeader,
    TheContainer,
    TheFooter
  }
}
</script>
