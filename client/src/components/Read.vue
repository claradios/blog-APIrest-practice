<template>
    <the-main-read :singlepost="singlepost" :filters="filters" :errorMsg="errorMsg"/>
</template>

<script>
import TheMainRead from '@/components/TheMainRead.vue'
import filters from '@/data/filters'
import readPostById from '@/service/readPostById.js'

export default {
  name: 'read',
  data () {
    return {
      singlepost: {},
      filters,
      errorMsg: ''
    }
  },
  async mounted () {
    try {
      const id = this.$route.params.id
      const data = await readPostById(id)
      this.singlepost = data
    } catch (error) {
      console.log(error)
      this.errorMsg = error.message
    }
  },
  components: {
    TheMainRead
  }
}
</script>
