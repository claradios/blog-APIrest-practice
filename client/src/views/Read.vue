<template>
  <div>
    <the-header
      :step="step"
      @go-to-home="handleGoToHome"
      @next-step="step++"
      @share-post="handleSharePost"
    />
    <read-post
      :singlepost="singlepost"
      :filters="filters"
      :image="image"
      @filter-selected="handleFilterSelected"
    />
    <the-footer :step="step" @go-to-home="handleGoToHome" @upload-image="handleUploadImage" @go-to-newpost="handleGoToNewPost"/>
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
  },
  methods: {
    handleGoToHome () {
      this.caption = ''
      this.image = ''
      this.step = 1
    }
  }
}
</script>
