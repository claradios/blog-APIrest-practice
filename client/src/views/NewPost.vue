<template>
  <div>
    <the-header
      :step="step"
      @go-to-home="handleGoToHome"
      @next-step="step++"
      @share-post="handleSharePost"
    />
    <the-container-create
      :filters="filters"
      @upload-image="handleUploadImage"
      @filter-selected="handleFilterSelected"
    />
    <card-new-post :post="post" />
    <the-footer
      @go-to-newpost="handleGoToNewPost"
    />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheContainerCreate from '@/components/TheContainerCreate.vue'
import TheFooter from '@/components/TheFooter.vue'
import filters from '@/data/filters.js'

export default {
  name: 'newPost',
  data () {
    return {
      filters
    }
  },
  components: {
    TheHeader,
    TheContainerCreate,
    TheFooter
  },
  methods: {
    handleGoToHome () {
      this.image = ''
      this.step = 1
    }
  }
}
</script>
