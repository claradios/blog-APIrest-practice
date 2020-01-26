<template>
  <div>
    <the-header />
    <the-main-read :singlepost="singlepost" :filters="filters" />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheMainRead from '@/components/TheMainRead.vue'
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
    TheMainRead,
    TheFooter
  }
}
</script>
