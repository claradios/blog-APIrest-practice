<template>
  <div>
    <the-header
    />
    <read-post
      :singlepost="singlepost"
      :filters="filters"
    />
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import ReadPost from '@/components/ReadPost.vue'
import TheFooter from '@/components/TheFooter.vue'
import singlepost from '@/data/singlepost'
import filters from '@/data/filters'

export default {
  name: 'read',
  data () {
    return {
      singlepost,
      filters
    }
  },
  components: {
    TheHeader,
    ReadPost,
    TheFooter
  }
}
</script>
