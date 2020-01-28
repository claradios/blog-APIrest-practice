<template>
  <main class="main-settings">
    <h2>This list of words are not allowed</h2>
    <ul>
      <li v-for="badWord in offensiveWords" :key="badWord._id">
        <card-offensive-words
          :badWord="badWord"
          @delete-this-word="handleDeleteThisWord"
          @edit-this-word="handleEditThisWord"
        />
      </li>
    </ul>
    <div>
      <div>
        <label for="new-word">Añadir palabra:</label>
        <input type="text" name="new-word" v-model="newOffensiveW.word" placeholder="cabronazo" />
      </div>
      <div>
        <label for="new-level">Nivel de Ofensividad (1-5):</label>
        <input type="text" name="new-level" v-model="newOffensiveW.level" placeholder="3" />
      </div>
      <button @click="addThisWord">add +</button>
    </div>
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
  data () {
    return {
      errorMsg: '',
      newOffensiveW: {}
    }
  },
  props: {
    offensiveWords: Array
  },
  methods: {
    async handleDeleteThisWord (ev, id) {
      try {
        const { token } = userInfo.state
        await deleteOffensiveWord(token, id)
      } catch (error) {
        this.errorMsg = error.message
      }
    },
    async addThisWord () {
      try {
        const { token } = userInfo.state
        await addOffensiveWord(token, this.newOffensiveW)
      } catch (error) {
        this.errorMsg = error.message
      }
    },
    async handleEditThisWord (ev, body) {
      try {
        const { _id } = body
        const { token } = userInfo.state
        await editOffensiveWord(token, _id, body)
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
