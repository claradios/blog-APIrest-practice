<template>
  <main class="main-settings">
    <div v-if="rol!=='admin'" class="no-access-screen"><p>Acceso denegado</p></div>
    <div v-if="rol==='admin'"  class="settings-wrapper"  >
    <h2>Hi admin! This is your offensive list</h2>
    <ul>
      <li v-for="badWord in offensiveWords" :key="badWord._id">
        <card-offensive-words
          :badWord="badWord"
          @delete-this-word="handleDeleteThisWord"
          @edit-this-word="handleEditThisWord"
        />
      </li>
    </ul>
    <div class="add-word-container">
      <div class="field-box">
        <label for="new-word">Añadir palabra:</label>
        <input type="text" name="new-word" v-model="newOffensiveW.word" placeholder="cabronazo" />
      </div>
      <div class="field-box">
        <label for="new-level">Nivel de Ofensividad (1-5):</label>
        <input type="text" name="new-level" v-model="newOffensiveW.level" placeholder="3" />
      </div>
      <button @click="addThisWord" class="btn">add +</button>
      <p v-if="errorMsg.length > 0" class="info-message">{{errorMsg}}</p>
    </div>
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
  computed: {
    rol () {
      return userInfo.state.userData.rol
    }
  },
  methods: {
    async handleDeleteThisWord (ev, id) {
      try {
        const { token } = userInfo.state
        await deleteOffensiveWord(token, id)
        const hasThisId = element => element._id === id
        const index = this.offensiveWords.findIndex(hasThisId)
        this.offensiveWords.splice(index, 1)
      } catch (error) {
        this.errorMsg = error.message
      }
    },
    async addThisWord () {
      try {
        const { token } = userInfo.state
        const result = await addOffensiveWord(token, this.newOffensiveW)
        this.offensiveWords.push(result)
        this.errorMsg = ''
      } catch (error) {
        this.errorMsg = error.message + '. Recuerda, level entre 1 y 5'
      }
    },
    async handleEditThisWord (ev, body) {
      try {
        const { _id } = body
        const { token } = userInfo.state
        console.log(token, _id, body)
        await editOffensiveWord(token, _id, body)

        const hasThisId = element => element._id === _id
        const index = this.offensiveWords.findIndex(hasThisId)
        this.offensiveWords.splice(index, 1, body)
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
  margin-bottom: 70px;
  display:flex;
  justify-content: center;
  align-items: center;
}
.settings-wrapper {
  max-width: 500px;
}
.no-access-screen {
  height:100vh;
  width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}
ul {
  padding: 0;
  list-style:none;
}
</style>
