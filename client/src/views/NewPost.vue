<template>
  <div>
    <the-header />
    <the-container-create
      :filters="filters"
    />
    <the-footer/>
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
  }
}
</script>
