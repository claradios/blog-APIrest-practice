<template>
  <div>
    <the-header />
    <the-main-admin-panel :offensiveWords="offensiveWords" />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheMainAdminPanel from '@/components/TheMainAdminPanel.vue'
import TheFooter from '@/components/TheFooter.vue'

import addOffensiveWord from '@/service/addOffensiveWord.js'
import deleteOffensiveWord from '@/service/deleteOffensiveWord.js'
import loadOffensiveWord from '@/service/loadOffensiveWords.js'
import editOffensiveWord from '@/service/editOffensiveWord.js'

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
      const data = await loadOffensiveWord(token)
      this.offensiveWords = data
    } catch (error) {
      console.log(error)
      this.errorMsg = error.message
    }
  },

  methods: {
    async deleteWord (ev) {
      try {
        const id = 'aqui traer id'
        const { token } = userInfo.state
        await deleteOffensiveWord(token, id)
      } catch (error) {
        this.errorMsg = error.message
      }
    },
    async addWord (word) {
      try {
        const { token } = userInfo.state
        await addOffensiveWord(token, word)
      } catch (error) {
        this.errorMsg = error.message
      }
    },
    async editWord (ev, word) {
      try {
        const id = 'aqui traer id'
        const { token } = userInfo.state
        await editOffensiveWord(token, id, word)
      } catch (error) {
        this.errorMsg = error.message
      }
    }
  },

  components: {
    TheHeader,
    TheMainAdminPanel,
    TheFooter
  }
}
</script>
