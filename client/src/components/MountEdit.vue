<template>
    <the-container-create
      :filters="filters"
    />
</template>

<script>
import TheContainerCreate from '@/components/TheContainerCreate.vue'
import filters from '@/data/filters.js'

export default {
  name: 'MountEdit',
  data () {
    return {
      filters
    }
  },
  components: {
    TheContainerCreate
  }
}
</script>
