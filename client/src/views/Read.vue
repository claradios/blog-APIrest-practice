<template>
  <div>
    <the-header />
    <read-post :singlepost="singlepost" :filters="filters" />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import ReadPost from '@/components/ReadPost.vue'
import TheFooter from '@/components/TheFooter.vue'
import filters from '@/data/filters'
import readPostById from '@/service/readPostById.js'

export default {
  name: 'read',
  data () {
    return {
      singlepost: {},
      filters
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const data = await readPostById(id)
    this.singlepost = data
  },
  components: {
    TheHeader,
    ReadPost,
    TheFooter
  }
}
</script>
