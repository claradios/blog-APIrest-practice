<template>
  <div>
    <the-header
    />
    <read-post
      :singlepost="singlepost"
      :filters="filters"
      :image="image"
      @filter-selected="handleFilterSelected"
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

// @ is an alias to /src

export default {
  name: 'read',
  data () {
    return {
      singlepost,
      filters,
      caption: '',
      image: ''
    }
  },
  components: {
    TheHeader,
    ReadPost,
    TheFooter
  }
}
</script>
