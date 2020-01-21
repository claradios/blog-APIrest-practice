<template>
  <div>
    <the-header @go-to-home="handleGoToHome"/>
    <the-container :posts="posts" />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import TheFooter from '@/components/TheFooter.vue'
import posts from '@/data/posts'

// @ is an alias to /src

export default {
  name: 'home',
  data () {
    return {
      posts
    }
  },
  components: {
    TheHeader,
    TheContainer,
    TheFooter
  }
}
</script>
