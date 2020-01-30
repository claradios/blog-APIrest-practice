<template>
    <the-main-admin-panel :offensiveWords="offensiveWords" />
</template>

<script>
import TheMainAdminPanel from '@/components/TheMainAdminPanel.vue'
import loadOffensiveWords from '@/service/loadOffensiveWords.js'
import userInfo from '@/store/'

export default {
  name: 'offensivewords',
  data () {
    return {
      offensiveWords: [],
      errorMsg: ''
    }
  },
  async mounted () {
    try {
      const { token } = userInfo.state
      const data = await loadOffensiveWords(token)
      this.offensiveWords = data
    } catch (error) {
      console.log(error)
      this.errorMsg = error.message
    }
  },
  components: {
    TheMainAdminPanel
  }
}
</script>
