<template>
  <main class="main-settings">
    <h2>This list of words are not allowed</h2>
    <ul>
      <li v-for="badWord in offensiveWords" :key="badWord._id">
          <card-offensive-words
          :badWord="badWord"
          @delete-this-word="handleDeleteThisWord"
          @edit-this-word="handleEditThisWord"
          @add-this-word="handleAddThisWord"
          />
      </li>
    </ul>
  </main>
</template>

<script>
import addOffensiveWord from '@/service/addOffensiveWord.js'
import deleteOffensiveWord from '@/service/deleteOffensiveWord.js'
import editOffensiveWord from '@/service/editOffensiveWord.js'
import userInfo from '@/store/'
import CardOffensiveWords from '@/components/CardOffensiveWords.vue'
export default {
  name: 'theMainAdminPanel',
  //   data () {
  //     return {
  //       //isEditing: false,
  //     }
  //   },
  props: {
    offensiveWords: Array
  },
  methods: {
    async handleDeleteThisWord (ev, id) {
      try {
        // const id = 'aqui traer id'
        console.log(id)
        const { token } = userInfo.state
        await deleteOffensiveWord(token, id)
      } catch (error) {
        this.errorMsg = error.message
      }
    },
    async handleAddThisWord (word) {
      try {
        const { token } = userInfo.state
        await addOffensiveWord(token, word)
      } catch (error) {
        this.errorMsg = error.message
      }
    },
    async handleEditThisWord (ev, word) {
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
    CardOffensiveWords
  }
}
</script>

<style lang="scss">
.main-settings {
    margin-top: 50px;
}
ul {
    padding: 0;
}
</style>
